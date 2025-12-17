"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function GlowingEffectDemo() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-[0.2em]">
            Detalhes que brilham
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Interações que destacam seu portfólio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Um grid de cards com efeito de brilho reativo ao movimento, perfeito para
            destacar cases, serviços ou diferenciais do seu estúdio.
          </p>
        </header>

        <div
          className={cn(
            "relative grid gap-4 md:grid-cols-3 auto-rows-[minmax(180px,1fr)]",
            "[&>*:nth-child(1)]:md:col-span-2 [&>*:nth-child(1)]:md:row-span-2",
            "[&>*:nth-child(4)]:md:col-span-2"
          )}
        >
          <GridItem
            area="impacto"
            icon={<Sparkles className="h-5 w-5 text-primary" />}
            title="Do briefing ao impacto visual"
            description="Cada peça é pensada para brilhar tanto no feed quanto em apresentações para marcas."
          />
          <GridItem
            area="estrategia"
            icon={<Search className="h-5 w-5 text-primary" />}
            title="Estratégia em cada detalhe"
            description="Design alinhado com posicionamento, tom de voz e objetivos de campanha."
          />
          <GridItem
            area="processos"
            icon={<Settings className="h-5 w-5 text-primary" />}
            title="Processos claros, entregas consistentes"
            description="Fluxos otimizados para garantir prazos, revisões e versões finais prontas para uso."
          />
          <GridItem
            area="seguranca"
            icon={<Lock className="h-5 w-5 text-primary" />}
            title="Arquivos sempre organizados"
            description="Entrega de pacotes completos para social, mídia paga e apresentações internas."
          />
          <GridItem
            area="cases"
            icon={<Box className="h-5 w-5 text-primary" />}
            title="Cases que contam histórias"
            description="De Beauty Show a ativações de comunidade, cada projeto vira narrativa visual."
          />
        </div>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <article className="relative group rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm p-5 md:p-6 overflow-hidden hover-scale">
      <GlowingEffect />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-base md:text-lg font-semibold leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};
