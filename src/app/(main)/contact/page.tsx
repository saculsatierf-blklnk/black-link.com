"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore
import { Instagram, Mail, Phone } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Registra o plugin para evitar erros de animação
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Opções do Menu
const SERVICE_OPTIONS = [
  "Branding & Design",
  "Tráfego & Performance",
  "Software & Apps",
  "Ecossistema Completo"
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    details: ""
  });

  // Estado do Dropdown Customizado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  useGSAP(() => {
    return; // EMERGÊNCIA: Bypassing GSAP
    // Animação de Entrada
    gsap.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2 
    });
  }, { scope: containerRef });

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (isDropdownOpen && !(e.target as HTMLElement).closest('.custom-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [isDropdownOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (option: string) => {
    setFormData({ ...formData, service: option });
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Formata mensagem para WhatsApp
    const message = `Olá+Lucas,+meu+nome+é+${encodeURIComponent(formData.name)}.+E-mail:+${encodeURIComponent(formData.email)}.+Tenho+interesse+em:+${encodeURIComponent(formData.service || "Não especificado")}.+Sobre+o+projeto:+${encodeURIComponent(formData.details)}`;

    const whatsappUrl = `https://wa.me/5511978291846?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        router.push('/protocolo/obrigado');
      }, 1000);
    }, 1000);
  };

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-black text-white px-6 md:px-24 py-32 flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* Section Principal com Contenção */}
      <section className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-white/10 pb-8 reveal-text">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4 block">
            03. Contato & Negócios
          </span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">
            Inicie Seu<br/>Projeto.
          </h1>
        </div>
        <div className="mt-8 md:mt-0 max-w-md">
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            Branding, Tráfego ou Software. A infraestrutura de elite para escalar seu faturamento.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-20">
        
        {/* Coluna Esquerda: Informações */}
        <div className="flex flex-col gap-12 reveal-text">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2 block">
              Contato Direto
            </span>
            <a 
              href="https://wa.me/5511978291846" 
              target="_blank"
              className="text-2xl md:text-3xl font-light hover:text-zinc-300 transition-colors border-b border-transparent hover:border-white w-fit"
            >
              +55 11 97829-1846
            </a>
            <div className="mt-4 flex flex-col gap-3 pl-4 border-l border-white/20">
              <a 
                href="mailto:contato@blklnk.com"
                className="flex items-center gap-2 text-lg text-[#E0E0E0] hover:text-white transition-all duration-300 ease-in-out"
              >
                <Mail size={18} />
                contato@blklnk.com
              </a>
              <a 
                href="https://www.instagram.com/blacklink.com.br/" 
                target="_blank"
                className="flex items-center gap-2 text-lg text-[#E0E0E0] hover:text-white transition-all duration-300 ease-in-out"
              >
                <Instagram size={18} />
                @blacklink.com.br
              </a>
              <a 
                href="tel:+5511978291846"
                className="flex items-center gap-2 text-lg text-[#E0E0E0] hover:text-white transition-all duration-300 ease-in-out"
              >
                <Phone size={18} />
                +55 11 97829-1846
              </a>
            </div>
          </div>

          <div>
             <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2 block">
              Base de Operações
            </span>
            <p className="text-xl text-zinc-300 font-extralight">
              São Paulo, SP — Brasil<br/>
              Atuação Global (Remoto)
            </p>
          </div>
        </div>

        {/* Coluna Direita: Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 reveal-text relative z-20">
          
          {/* Nome */}
          <div className="group">
            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-white transition-colors">
              Nome Completo
            </label>
            <input 
              name="name"
              onChange={handleChange}
              type="text" 
              placeholder="Como devemos lhe chamar?"
              className="w-full bg-white/[0.02] border-b border-white/20 py-4 px-4 text-xl text-white placeholder-zinc-700 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all rounded-none"
              required
            />
          </div>

          {/* Email */}
          <div className="group">
            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-white transition-colors">
              Email Corporativo
            </label>
            <input 
              name="email"
              onChange={handleChange}
              type="email" 
              placeholder="seu@email.com"
              className="w-full bg-white/[0.02] border-b border-white/20 py-4 px-4 text-xl text-white placeholder-zinc-700 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all rounded-none autofill:bg-transparent autofill:text-white"
              style={{
                WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                WebkitTextFillColor: 'white'
              }}
              required
            />
          </div>

          {/* DROPDOWN CUSTOMIZADO */}
          <div className="group custom-dropdown relative">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-white transition-colors">
                Serviço de Interesse
              </label>
              
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full text-left bg-white/[0.02] border-b py-4 px-4 text-xl transition-all rounded-none flex justify-between items-center ${isDropdownOpen ? 'border-white/40 bg-white/[0.05] text-white' : 'border-white/20 text-white'}`}
              >
                <span className={formData.service ? "text-white" : "text-zinc-700"}>
                  {formData.service || "Selecione..."}
                </span>
                <span className={`text-xs text-zinc-500 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                  ▼
                </span>
              </button>

              {/* Lista do Dropdown */}
              <div 
                className={`absolute top-full left-0 w-full bg-[#0a0a0a]/95 border border-white/10 shadow-2xl z-[100] overflow-hidden transition-all duration-300 origin-top transform-gpu ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleServiceSelect(option)}
                    className="px-6 py-4 text-lg text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                  >
                    {option}
                  </div>
                ))}
              </div>
          </div>

          {/* Detalhes */}
          <div className="group">
            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-white transition-colors">
              Detalhes do Projeto
            </label>
            <textarea 
              name="details"
              onChange={handleChange}
              rows={4}
              placeholder="Conte brevemente sobre seus objetivos..."
              className="w-full bg-white/[0.02] border-b border-white/20 py-4 px-4 text-xl text-white placeholder-zinc-700 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all resize-none rounded-none"
            />
          </div>

          {/* Botão */}
          <div className="mt-8">
            <button 
                type="submit"
                disabled={status !== "idle"}
                className="group relative px-8 py-5 bg-black text-white font-bold uppercase tracking-widest text-xs border border-white/20 w-full md:w-auto transition-all hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 before:ease-out"
            >
                <span className="relative z-10">
                    {status === "idle" && "ENVIAR VIA WHATSAPP"}
                    {status === "sending" && "Redirecionando..."}
                    {status === "success" && "Aberto no WhatsApp ✓"}
                </span>
            </button>
          </div>

        </form>
      </div>

      {/* Footer Interno */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 mt-auto opacity-40 hover:opacity-100 transition-opacity gap-4">
        <span className="font-mono text-[10px]">© 2026 BLACK LINK</span>
        <div className="flex gap-4">
             <Link href="/" className="font-mono text-[10px] hover:text-white transition-colors">HOME</Link>
             <span className="font-mono text-[10px]">/</span>
             <Link href="/#work" className="font-mono text-[10px] hover:text-white transition-colors">WORK</Link>
        </div>
        <span className="font-mono text-[10px]">ALL RIGHTS RESERVED.</span>
      </div>

        </div>
      </section>

    </main>
  );
}