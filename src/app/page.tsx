import { BotonFijo, Revelar } from "@/components/Ambiente";
import { Funcionalidades } from "@/components/Funcionalidades";
import { Hero } from "@/components/Hero";
import { LaCuenta } from "@/components/LaCuenta";
import { Lista } from "@/components/Lista";
import { Recorrido } from "@/components/Recorrido";
import { Pie, Preguntas, Serie } from "@/components/Secciones";
import { SmoothScroll } from "@/components/SmoothScroll";
import { UnSoloLugar } from "@/components/UnSoloLugar";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Revelar />
      <Hero />
      <main>
        <LaCuenta />
        <UnSoloLugar />
        <Recorrido />
        <Funcionalidades />
        <Lista />
        <Serie />
        <Preguntas />
      </main>
      <Pie />
      <BotonFijo />
    </>
  );
}
