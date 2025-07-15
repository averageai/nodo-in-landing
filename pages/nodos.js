import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Nodos() {
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
    <main className="min-h-screen bg-black text-white px-6 py-12">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* 📌 Lado izquierdo: Texto + asistentes */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Qué hace un Asistente IA?
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg">
            Es un sistema conectado a WhatsApp que atiende por ti y cierra ventas sin depender de operadores.
            Responde, valida, organiza y confirma. Solo necesitas uno.
          </p>

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

        {/* 📱 Lado derecho: Mockup iPhone con imagen */}
        <div className="flex justify-center relative">
          <div
            className="w-[300px] h-[620px] rounded-[2.5rem] border-[10px] border-black overflow-hidden transform transition duration-700 hover:scale-105 relative animate-vanish-in glow-green"
            onMouseEnter={() => setShowSigns(true)}
            onMouseLeave={() => setShowSigns(false)}
            onTouchStart={() => setShowSigns(true)}
            onTouchEnd={() => setShowSigns(false)}
            onTouchCancel={() => setShowSigns(false)}
          >
            <Image
              src="/preview-nodo-final.png"
              alt="Demo Asistente IA"
              width={300}
              height={620}
              className="object-cover"
            />
            {/* Animación de signos variados solo si showSigns es true */}
            {showSigns && (
              <div className="pointer-events-none absolute inset-0 z-10">
                {[...Array(8)].map((_, i) => {
                  if (i >= visibleSigns) return null;
                  const symbols = [
                    { char: '$', color: '#71F14F' },
                    { char: '?', color: '#3B82F6' },
                    { char: '!', color: '#EF4444' },
                  ];
                  const { char, color } = symbols[Math.floor(Math.random() * symbols.length)];
                  return (
                    <span
                      key={i}
                      className={`peso-sign absolute left-[60%] font-bold select-none`}
                      style={{
                        fontSize: '1.6rem',
                        bottom: `${10 + i * 10}%`,
                        left: `calc(60% + ${Math.sin(i) * 30}px)`,
                        color,
                        opacity: 0.85,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
