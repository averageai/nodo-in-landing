import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

function GreenStars() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = Array.from({ length: 32 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1 + Math.random() * 1.5,
      size: 1 + Math.random() * 1.5,
    }));
    let running = true;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, 2 * Math.PI);
        ctx.fillStyle = '#71F14F';
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
        s.x += s.speed * 0.7;
        s.y += s.speed;
        if (s.y > window.innerHeight || s.x > window.innerWidth) {
          s.x = Math.random() * window.innerWidth * 0.7;
          s.y = -10;
        }
      }
      if (running) requestAnimationFrame(draw);
    }
    draw();
    return () => { running = false; };
  }, []);
  return <canvas ref={canvasRef} width={typeof window !== 'undefined' ? window.innerWidth : 1920} height={typeof window !== 'undefined' ? window.innerHeight : 1080} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ mixBlendMode: 'lighten' }} />;
}

function DiagonalLines() {
  return (
    <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none" width="100%" height="100%" style={{ opacity: 0.12 }}>
      <defs>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#71F14F" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ededed" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {[...Array(8)].map((_, i) => (
        <line key={i} x1={-200 + i * 220} y1={0} x2={200 + i * 220} y2={1000} stroke="url(#line)" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function Nodos() {
  const [hovered, setHovered] = useState(null);
  const [showSigns, setShowSigns] = useState(false);
  const [visibleSigns, setVisibleSigns] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [openAssistant, setOpenAssistant] = useState(null);

  useEffect(() => {
    // CAMBIAR DURACIÓN DE LA PANTALLA DE CARGA (en milisegundos)
    const loadingDuration = 1500;
    
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timeouts = [];
    if (showSigns) {
      for (let i = 0; i < 8; i++) {
        timeouts.push(
          setTimeout(() => setVisibleSigns(v => Math.max(v, i + 1)), i * 200)
        );
      }
    } else {
      setVisibleSigns(0);
    }
    return () => timeouts.forEach(clearTimeout);
  }, [showSigns]);

  const assistants = [
    {
      id: 'belleza',
      title: 'Asistente IA para Belleza',
      emoji: '💇‍♀️',
      description: 'Muchos mensajes que parecen simples —"¿tienes disponibilidad hoy?"— terminan quitándote tiempo valioso. Este asistente atiende por ti: agenda citas, confirma horarios y toma datos del cliente directamente en WhatsApp. Mientras tú haces tu trabajo con calma, el sistema ya está cerrando la siguiente cita.',
      whatsappText: 'Hola%20quiero%20probar%20el%20Asistente%20IA%20para%20belleza'
    },
    {
      id: 'comidas',
      title: 'Asistente IA para Comidas',
      emoji: '🍔',
      description: 'Cuando el ritmo sube, responder bien y rápido cada pedido se vuelve imposible. Este asistente recibe los pedidos por WhatsApp, valida lo disponible, calcula el total y responde al cliente con todo listo. No importa si llegan 2 o 20 al tiempo: responde con orden, sin errores ni repeticiones.',
      whatsappText: 'Hola%20quiero%20probar%20el%20Asistente%20IA%20para%20comidas'
    },
    {
      id: 'personal',
      title: 'Asistente IA Personal',
      emoji: '📅',
      description: 'Responder, agendar, organizar datos... todo eso es parte del trabajo, pero también es lo que más distrae. Este asistente organiza tu agenda desde WhatsApp, confirma horarios con tus clientes y guarda todo sin que tengas que revisar constantemente el celular. Te deja trabajar sin interrupciones.',
      whatsappText: 'Hola%20quiero%20probar%20el%20Asistente%20IA%20Personal'
    },
    {
      id: 'dropshipping',
      title: 'Asistente IA para Dropshipping',
      emoji: '📦',
      description: 'El 80% de las preguntas son las mismas: precio, envío, descripción. Pero si no las contestas rápido, se pierde la venta. Este asistente responde todo eso por ti, guía al cliente y lo acompaña hasta que compra. Funciona aunque estés durmiendo o atendiendo otros chats.',
      whatsappText: 'Hola%20quiero%20probar%20el%20Asistente%20IA%20para%20dropshipping'
    }
  ];

  const toggleAssistant = (assistantId) => {
    setOpenAssistant(openAssistant === assistantId ? null : assistantId);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 relative">
      <DiagonalLines />
      <GreenStars />
      <Head>
        <title>Cómo funciona Nodo IN | average.ai</title>
        <meta name="description" content="Descubre cómo funcionan los Nodos IN y pruébalos por sector." />
      </Head>
      {/* Pantalla de carga */}
      {showLoading && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center loading-screen">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="average.ai logo" width={280} height={80} className="mx-auto w-auto h-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mb-4" priority />
            <div className="cursor-blink"></div>
          </div>
        </div>
      )}

      {/* Botón para volver al index */}
      <div className="mb-8">
        <Link href="/">
          <span className="inline-block bg-neutral-900 border border-gray-600 hover:border-[#71F14F] text-gray-300 hover:text-[#71F14F] px-4 py-2 rounded transition cursor-pointer">
            ← Volver al inicio
          </span>
        </Link>
      </div>

      <section className="max-w-5xl mx-auto mb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl mb-4">¿Qué hace un Asistente IA?</h1>
          <p className="text-gray-400 mb-8">
            Es un sistema conectado a WhatsApp que atiende por ti y cierra ventas sin depender de operadores. Responde, valida, organiza y confirma. Solo necesitas uno.
          </p>
          {/* Aquí va el acordeón de asistentes IA con los botones Probar DEMO y lógica de 'Próximamente' */}
          <div className="flex flex-col gap-4">
            {assistants.map((assistant) => (
              <div key={assistant.id} className="space-y-0">
                {/* Botón del asistente */}
                <button
                  onClick={() => toggleAssistant(assistant.id)}
                  className="w-full bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition text-left flex items-center justify-between group"
                  aria-expanded={openAssistant === assistant.id}
                  aria-controls={`assistant-${assistant.id}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAssistant(assistant.id);
                    }
                  }}
                >
                  <span className="flex items-center">
                    <span className="mr-3">{assistant.emoji}</span>
                    {assistant.title}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openAssistant === assistant.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Cuadro de descripción */}
                <div
                  id={`assistant-${assistant.id}`}
                  className={`bg-[#181818] border border-gray-600 rounded-b-lg overflow-hidden transition-all duration-300 ease-out ${
                    openAssistant === assistant.id 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6">
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {assistant.description}
                    </p>
                    <div className="flex justify-center">
                      <a
                        href={`https://wa.me/447717190625?text=${assistant.whatsappText}`}
                        className="inline-block bg-[#71F14F] text-black px-4 py-2 rounded font-semibold hover:bg-green-400 transition glow-green-soft text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Probar DEMO
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          {/* Aquí va la imagen, por ejemplo: */}
          <Image src="/preview-nodo-final.png" alt="Demo WhatsApp" width={320} height={600} className="rounded-2xl shadow-2xl glow-green" />
        </div>
      </section>
    </div>
  );
}
