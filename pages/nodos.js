import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Nodos() {
  const [showSigns, setShowSigns] = useState(false);
  const [visibleSigns, setVisibleSigns] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // CAMBIAR DURACIÓN DE LA PANTALLA DE CARGA (en milisegundos)
    const loadingDuration = 800;
    
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

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      {/* Pantalla de carga */}
      {showLoading && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center loading-screen">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="average.ai logo" width={56} height={56} className="h-14 mb-4" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* 📌 Lado izquierdo: Texto + botones */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Qué hace un Asistente IA?
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg">
            Es un sistema conectado a WhatsApp que atiende por ti y cierra ventas sin depender de operadores.
            Responde, valida, organiza y confirma. Solo necesitas uno.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20para%20belleza"
              className="bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition slide-in-left-fade"
              style={{ animationDelay: '0.1s' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              💇‍♀️ Probar Asistente IA para Belleza
            </a>
            <a
              href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20para%20comidas"
              className="bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition slide-in-left-fade"
              style={{ animationDelay: '0.3s' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              🍔 Probar Asistente IA para Comidas
            </a>
            <a
              href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20Asistente"
              className="bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition slide-in-left-fade"
              style={{ animationDelay: '0.5s' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              📅 Probar Asistente IA Personal
            </a>
          </div>
        </div>

        {/* 📱 Lado derecho: Mockup iPhone con imagen + animación de signos de pesos */}
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
