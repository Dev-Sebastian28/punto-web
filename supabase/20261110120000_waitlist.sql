-- The waiting list of Punto's web page (puntoappco.com): truck owners with an iPhone who want to be the first to
-- use the app. Nothing here touches the app's tables.
--
-- The page never reads or writes these tables: it calls the two functions below with the publishable key (role
-- `anon`). So anyone can sign up, nobody outside can read the list, and every rule is checked here, not only on the
-- page. Sebastián reads the list in the dashboard (Table Editor), which these rules do not limit.
--
-- Ley 1581 de 2012: a sign-up only exists with the person's authorization (`p_consent`), and the row keeps when it
-- was given and which version of the data policy they accepted (puntoappco.com/privacidad).


-- MARK: - Sign-ups
-- One row per WhatsApp number: signing up again with the same number keeps the first row (and its place in line).

create table public.waitlist_signups (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(name) between 1 and 60),
    whatsapp text not null unique check (whatsapp ~ '^573[0-9]{9}$'),     -- Colombian mobile with country code
    fleet_size text not null check (fleet_size in ('one', 'two_to_five', 'more_than_five')),
    city text check (char_length(city) between 1 and 80),                -- Optional: city or department
    source text check (source ~ '^[a-z0-9_-]{1,30}$'),                   -- The link's ?de= (facebook, youtube, x…)
    policy_version text not null check (policy_version ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    consented_at timestamptz not null default now(),                     -- When they authorized the use of their data
    created_at timestamptz not null default now()
);


-- MARK: - Anonymous counts
-- What the page counts without knowing who: a visit (once per browser session), a "No tengo iPhone" answer and a
-- tap on "Abrir en TestFlight" after signing up.
-- No name, number, address or device is kept, only what happened, the link's ?de= and when.

create table public.waitlist_events (
    id bigint generated always as identity primary key,
    kind text not null check (kind in ('visit', 'no_iphone', 'testflight')),
    source text check (source ~ '^[a-z0-9_-]{1,30}$'),
    created_at timestamptz not null default now()
);


-- MARK: - Row level security and table access
-- No policies on purpose: through the API nobody reads, changes or deletes a row. Only the functions below write.

alter table public.waitlist_signups enable row level security;
alter table public.waitlist_events enable row level security;

revoke all on public.waitlist_signups from anon, authenticated;
revoke all on public.waitlist_events from anon, authenticated;


-- MARK: - Sign up
-- Called by the page's form. Answers nothing, so the page cannot learn whether a number was already on the list.
-- `p_website` is the invisible trap: people never see that field and robots fill it. A robot gets the same silent
-- answer as a person, so it does not learn it was caught, and nothing is saved.

create function public.join_waitlist(
    p_name text,
    p_whatsapp text,
    p_fleet_size text,
    p_city text,
    p_source text,
    p_policy_version text,
    p_consent boolean,
    p_website text default null
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_whatsapp text := regexp_replace(coalesce(p_whatsapp, ''), '[^0-9]', '', 'g');
    v_name text := regexp_replace(btrim(coalesce(p_name, '')), '\s+', ' ', 'g');
    v_city text := nullif(regexp_replace(btrim(coalesce(p_city, '')), '\s+', ' ', 'g'), '');
    v_source text := lower(nullif(btrim(coalesce(p_source, '')), ''));
begin
    if coalesce(p_website, '') <> '' then
        return;
    end if;

    if p_consent is not true then
        raise exception 'consent_required';
    end if;

    -- 3001234567 and +57 300 123 4567 are the same number.
    if char_length(v_whatsapp) = 10 then
        v_whatsapp := '57' || v_whatsapp;
    end if;
    if v_whatsapp !~ '^573[0-9]{9}$' then
        raise exception 'invalid_whatsapp';
    end if;

    if v_source !~ '^[a-z0-9_-]{1,30}$' then
        v_source := 'otro';
    end if;

    insert into public.waitlist_signups (name, whatsapp, fleet_size, city, source, policy_version)
    values (v_name, v_whatsapp, p_fleet_size, left(v_city, 80), v_source, p_policy_version)
    on conflict (whatsapp) do nothing;
end;
$$;


-- MARK: - Count
-- Called by the page once per browser session for each kind: a visit, a "No tengo iPhone" and a TestFlight tap.

create function public.track_waitlist_event(p_kind text, p_source text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_source text := lower(nullif(btrim(coalesce(p_source, '')), ''));
begin
    if v_source !~ '^[a-z0-9_-]{1,30}$' then
        v_source := 'otro';
    end if;

    insert into public.waitlist_events (kind, source) values (p_kind, v_source);
end;
$$;


-- MARK: - Function access
-- Only the page's visitors and signed-in users may call them; by default every role could.

revoke all on function public.join_waitlist(text, text, text, text, text, text, boolean, text) from public;
revoke all on function public.track_waitlist_event(text, text) from public;
grant execute on function public.join_waitlist(text, text, text, text, text, text, boolean, text) to anon, authenticated;
grant execute on function public.track_waitlist_event(text, text) to anon, authenticated;
