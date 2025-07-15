import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const animatedElementsRef = useRef([]);

  useEffect(() => {
    // CAMBIAR DURACIÓN DE LA PANTALLA DE CARGA (en milisegundos)
    const loadingDuration = 1700;
    
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-left-fade');
            entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
          } else {
            // Remover la clase para que se pueda repetir la animación
            entry.target.classList.remove('slide-in-left-fade');
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Se activa 50px antes de que el elemento esté completamente visible
      }
    );

    // Observar todos los elementos que deben animarse
    animatedElementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Pantalla de carga */}
      {showLoading && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center loading-screen">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="average.ai logo" width={280} height={80} className="mx-auto w-auto h-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mb-4" priority />
            <div className="cursor-blink"></div>
          </div>
        </div>
      )}

      <Head>
        <title>Asistente IA | average.ai</title>
        <meta name="description" content="Asistentes IA – Sistemas Humanos + IA que atienden y cierran ventas por ti." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="w-full flex justify-end max-w-7xl mx-auto">
        <a href="https://panel.average.lat" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white border px-4 py-2 rounded border-gray-600">
          Admin Panel
        </a>
      </header>

      {/* Hero */}
      <section className="text-center mt-10 mb-20">
        <Image src="/logo.png" alt="average.ai logo" width={280} height={80} className="mx-auto w-auto h-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mb-6" priority />
        <h1 className="text-3xl md:text-5xl font-light leading-tight mb-6">
          No somos una IA.<br />
          <span className="text-[#71F14F]">Somos Humanos + IA</span><br />
          que crean sistemas para ayudarte a enfocarte en lo que sí importa.
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-4">
          Creamos sistemas que trabajan por ti. Tú te quedas con los resultados.
        </p>
        <Link href="/nodos">
          <span className="bg-[#71F14F] text-black px-6 py-2 rounded font-semibold hover:bg-green-400 transition glow-green-soft">
            Ver cómo funciona Asistentes IA
          </span>
        </Link>
      </section>

      {/* Quiénes somos */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl mb-4">¿Quiénes somos?</h2>
        <p className="text-gray-400">
          Somos una agencia de Humanos + IA. Creamos soluciones tecnologícas que automatizan, organizan y escalan tu operación, sin que tengas que entender tecnología. Nos enfocamos en lo que funciona, no en lo que suena bonito.
        </p>
      </section>

      {/* Paquete IA */}
      <section className="max-w-5xl mx-auto text-left mb-24">
        <h2 className="text-3xl text-center mb-10">¿Qué incluye el Paquete IA?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div 
            ref={(el) => (animatedElementsRef.current[0] = el)}
            className="bg-[#181818] p-6 rounded-xl"
            data-delay="0.1s"
          >
            <h3 className="text-xl text-[#71F14F]">Asistente IA</h3>
            <p>Sistemas que atienden y cierran ventas en automático.</p>
          </div>
          <div 
            ref={(el) => (animatedElementsRef.current[1] = el)}
            className="bg-[#181818] p-6 rounded-xl"
            data-delay="0.2s"
          >
            <h3 className="text-xl text-[#71F14F]">CRM</h3>
            <p>Organiza, visualiza y segmenta a tus clientes.</p>
          </div>
          <div 
            ref={(el) => (animatedElementsRef.current[2] = el)}
            className="bg-[#181818] p-6 rounded-xl"
            data-delay="0.3s"
          >
            <h3 className="text-xl text-[#71F14F]">Pulse</h3>
            <p>Envía mensajes automáticos segmentados por WhatsApp, email o SMS.</p>
          </div>
          <div 
            ref={(el) => (animatedElementsRef.current[3] = el)}
            className="bg-[#181818] p-6 rounded-xl"
            data-delay="0.4s"
          >
            <h3 className="text-xl text-[#71F14F]">averageLabs</h3>
            <p>Formación, documentación y experimentos reales con IA aplicada.</p>
          </div>
        </div>
      </section>

      {/* La Agencia */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl mb-4">La Agencia</h2>
        <p className="text-gray-400">
          Para quienes quieren escalar (Growth). Gestionamos contenido, anuncios, SEO y estrategia digital con Humanos + IA. Operamos en segundo plano, tú ves los resultados.
        </p>
      </section>

      {/* Casos por sector */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl text-center mb-10">Casos por sector</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div 
            ref={(el) => (animatedElementsRef.current[4] = el)}
            className="bg-[#181818] p-4 rounded-xl"
            data-delay="0.1s"
          >
            <h3 className="text-[#71F14F] text-xl mb-1">Peluquería / Spa</h3>
            <p>Automatización de agenda y mensajes de seguimiento. Aumento del 40% en clientes que vuelven.</p>
          </div>
          <div 
            ref={(el) => (animatedElementsRef.current[5] = el)}
            className="bg-[#181818] p-4 rounded-xl"
            data-delay="0.2s"
          >
            <h3 className="text-[#71F14F] text-xl mb-1">Restaurante local</h3>
            <p>Pedidos por WhatsApp en automatico. Respuesta 10x más rápida que antes.</p>
          </div>
        </div>
      </section>

      {/* Escalado */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl mb-4">¿Cómo escalo (Growth)?</h2>
        <p className="text-gray-400">
          Empiezas con un Asistente IA. Luego conectas el CRM. Activas campañas. Y si todo funciona, te unes a la Agencia.
        </p>
      </section>

      {/* Testimonios */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <h2 className="text-3xl mb-10">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div 
            ref={(el) => (animatedElementsRef.current[6] = el)}
            className="bg-[#181818] p-6 rounded-xl"
            data-delay="0.1s"
          >
            <p className="italic">&quot;Yo no sabía ni usar una agenda virtual. Ahora todo se agenda solo y no tengo que hacerlo yo.&quot;</p>
            <p className="text-gray-400 mt-2">– Laura, Estética</p>
          </div>
          <div 
            ref={(el) => (animatedElementsRef.current[7] = el)}
            className="bg-[#181818] p-6 rounded-xl"
            data-delay="0.2s"
          >
            <p className="italic">&quot;Los pedidos me llegan listos y yo solo entrego. Esto vale oro.&quot;</p>
            <p className="text-gray-400 mt-2">– Andrés, Restaurante</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl mb-4">¿Listo para probarlo en tu negocio?</h2>
        <a href="https://wa.me/447717190625" target="_blank" rel="noopener noreferrer" className="bg-[#71F14F] text-black px-8 py-3 rounded font-semibold hover:bg-green-400 transition glow-green-soft">
          Agenda una llamada
        </a>
      </section>
    </div>
  )
}