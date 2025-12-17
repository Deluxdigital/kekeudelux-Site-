import { useEffect, useState } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BadgeCheck, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactLinks {
  behance: string;
  whatsapp: string;
}

const DEFAULT_LINKS: ContactLinks = {
  behance: "https://www.behance.net/kekeudeluux",
  whatsapp: "https://wa.me/message/OPI7P6PY42BVI1",
};

const Contact = () => {
  const [links, setLinks] = useState<ContactLinks>(DEFAULT_LINKS);

  useEffect(() => {
    const loadLinks = async () => {
      const { data, error } = await supabase
        .from("contact_links")
        .select("key, url")
        .in("key", ["behance", "whatsapp"]);

      if (error || !data) return;

      const map: Partial<ContactLinks> = {};
      data.forEach((row) => {
        if (row.key === "behance") map.behance = row.url;
        if (row.key === "whatsapp") map.whatsapp = row.url;
      });

      setLinks((prev) => ({ ...prev, ...map }));
    };

    loadLinks();
  }, []);

  return (
    <section id="contato" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold">
            Vamos criar algo
            <br />
            <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              incrível juntos?
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seja para transformar sua marca, criar conteúdo visual de impacto ou
            dar vida às suas ideias com motion design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <ShimmerButton
              background="hsl(var(--foreground))"
              shimmerColor="#ffffff"
              className="text-background min-w-[230px]"
              onClick={() => window.open(links.whatsapp, "_blank")}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Falar no WhatsApp</span>
            </ShimmerButton>
            <ShimmerButton
              background="hsl(var(--background))"
              shimmerColor="#ffffff"
              className="text-foreground border border-border min-w-[260px]"
              onClick={() => window.open(links.behance, "_blank")}
            >
              <BadgeCheck className="h-4 w-4" />
              <span>Ver Portfólio no Behance</span>
            </ShimmerButton>
          </div>

          <div className="pt-12 text-sm text-muted-foreground">
            <p>Email: agenciadelux20@gmail.com</p>
            <p>CNPJ: 45.735.338/0001-20</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
