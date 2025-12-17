import { DotScreenShader } from "@/components/ui/dot-shader-background";

export default function DotShaderDemo() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <DotScreenShader />
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
          Digital Innovation
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Onde o impacto visual encontra a estratégia.
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Um fundo dinâmico em dots que acompanha o movimento e reforça a atmosfera
          futurista do seu estúdio, sem tirar o foco do conteúdo principal.
        </p>
      </div>
    </div>
  );
}
