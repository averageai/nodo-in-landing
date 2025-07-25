import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Componente de menú superior sticky y animado
function Navbar({ onVisible }) {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (scrolled) {
      setShow(true);
      onVisible && onVisible(true);
    } else {
      setShow(false);
      onVisible && onVisible(false);
    }
  }, [scrolled, onVisible]);
  if (!show) return null;
  return (
    <nav className={
      `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92vw] max-w-5xl py-0.5 shadow-2xl bg-[#181c1b]/60 backdrop-blur-2xl rounded-2xl flex items-center border border-[#232b28] animate-navbar-fade-in-strong`
    }>
      <div className="flex items-center justify-center h-11 w-11 bg-black rounded-xl shadow-lg ml-3 mr-6">
        <Image src="/android-chrome-512x512.png" alt="average.ai logo" width={36} height={36} className="rounded object-contain" />
      </div>
      <div className="flex-1 flex items-center justify-center gap-6 pl-8 pr-8">
        <Link href="#asistentes" className="text-gray-200 px-3 py-1.5 rounded transition hover:bg-[#232b28] hover:text-[#71F14F] focus:outline-none text-base">Asistentes IA</Link>
        <Link href="#agency" className="text-gray-200 px-3 py-1.5 rounded transition hover:bg-[#232b28] hover:text-[#71F14F] focus:outline-none text-base">La Agency</Link>
        <Link href="#contacto" className="text-gray-200 px-3 py-1.5 rounded transition hover:bg-[#232b28] hover:text-[#71F14F] focus:outline-none text-base">Contacto</Link>
        <Link href="/login" className="text-gray-200 px-3 py-1.5 rounded transition hover:bg-[#232b28] hover:text-[#71F14F] focus:outline-none text-base">Login</Link>
      </div>
      <div className="flex items-center justify-end min-w-[180px] ml-6">
        <a href="https://wa.me/447717190625" className="bg-[#71F14F] text-black px-5 py-1.5 rounded font-semibold hover:bg-green-400 transition glow-green-soft shadow-lg text-base">Conócenos</a>
      </div>
    </nav>
  );
}

// Animación de estrellas verdes
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

// Líneas diagonales de fondo
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

export default function Index() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const loadingDuration = 1700;
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, loadingDuration);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center loading-screen">
        <div className="flex flex-col items-center">
          <Image src="/logo - copia.png" alt="average.ai logo" width={280} height={80} className="mx-auto w-auto h-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mb-4" priority />
          <div className="cursor-blink"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <Head>
        <title>Asistente IA | average.ai</title>
        <meta name="description" content="Asistentes IA – Sistemas Humanos + IA que atienden y cierran ventas por ti." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DiagonalLines />
      <GreenStars />
      <Navbar onVisible={setNavbarVisible} />
      <main className="relative z-10 pt-32 pb-20 px-4 max-w-5xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-20">
          <div
            className={`mx-auto w-auto h-auto mb-6 transition-all duration-700 ease-in-out`}
            style={{
              maxWidth: navbarVisible ? 280 : 560,
              transform: navbarVisible ? 'scale(1)' : 'scale(1)',
            }}
          >
            <Image src="/logo - copia.png" alt="average.ai logo" width={navbarVisible ? 280 : 560} height={navbarVisible ? 80 : 160} priority />
          </div>
          <div className="mb-10"></div>
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6 text-gray-100">
            No somos una IA.<br />
            <span className="text-[#71F14F]">Somos Humanos + IA</span><br />
            que crean sistemas para ayudarte a enfocarte en lo que sí importa.
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-4">
            Creamos sistemas que trabajan por ti. Tú te quedas con los resultados.
          </p>
          <Link href="/nodos">
            <span className="bg-[#71F14F] text-black px-6 py-2 rounded font-semibold hover:bg-green-400 transition glow-green-soft shadow-lg">
              Ver cómo funciona Asistentes IA
            </span>
          </Link>
        </section>
        {/* Quiénes somos */}
        <section className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl mb-4">¿Quiénes somos?</h2>
          <p className="text-gray-400">
            Somos una agencia de marketing impulsada por tecnología. Aquí, Humanos + IA acompañamos negocios como el tuyo con estrategias claras, herramientas actuales y sistemas que trabajan en segundo plano. No venimos a explicarte tecnología, sino a ayudarte a crecer con ella. Porque lo importante no es parecer innovador, es funcionar mejor.
          </p>
        </section>
        {/* Paquete IA */}
        <section className="max-w-5xl mx-auto text-left mb-24">
          <h2 className="text-3xl text-center mb-10">¿Qué incluye el Paquete IA?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-6 rounded-xl">
              <h3 className="text-xl text-[#71F14F]">Asistente IA</h3>
              <p>Sistemas que atienden y cierran ventas en automático.</p>
            </div>
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-6 rounded-xl">
              <h3 className="text-xl text-[#71F14F]">CRM</h3>
              <p>Organiza, visualiza y segmenta a tus clientes.</p>
            </div>
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-6 rounded-xl">
              <h3 className="text-xl text-[#71F14F]">Pulse</h3>
              <p>Envía mensajes automáticos segmentados por WhatsApp, email o SMS.</p>
            </div>
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-6 rounded-xl">
              <h3 className="text-xl text-[#71F14F]">averageLabs</h3>
              <p>Formación, documentación y experimentos reales con IA aplicada.</p>
            </div>
          </div>
        </section>
        {/* La Agencia */}
        <section className="text-center max-w-3xl mx-auto mb-24" id="agency">
          <h2 className="text-3xl mb-4">La Agencia</h2>
          <p className="text-gray-400">
            Para quienes quieren escalar (Growth). Gestionamos contenido, anuncios, SEO y estrategia digital con Humanos + IA. Operamos en segundo plano, tú ves los resultados.
          </p>
        </section>
        {/* Casos por sector */}
        <section className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl text-center mb-10">Casos por sector</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-4 rounded-xl">
              <h3 className="text-[#71F14F] text-xl mb-1">Peluquería / Spa</h3>
              <p>Automatización de agenda y mensajes de seguimiento. Aumento del 40% en clientes que vuelven.</p>
            </div>
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-4 rounded-xl">
              <h3 className="text-[#71F14F] text-xl mb-1">Restaurante local</h3>
              <p>Pedidos por WhatsApp en automático. Respuesta 10x más rápida que antes.</p>
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
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-6 rounded-xl">
              <p className="italic">&quot;Yo no sabía ni usar una agenda virtual. Ahora todo se agenda solo y no tengo que hacerlo yo.&quot;</p>
              <p className="text-gray-400 mt-2">– Laura, Estética</p>
            </div>
            <div className="bg-[#181c1b]/60 backdrop-blur-2xl border border-[#71F14F] p-6 rounded-xl">
              <p className="italic">&quot;Los pedidos me llegan listos y yo solo entrego. Esto vale oro.&quot;</p>
              <p className="text-gray-400 mt-2">– Andrés, Restaurante</p>
            </div>
          </div>
        </section>
        {/* CTA Final */}
        <section className="text-center max-w-3xl mx-auto mb-20" id="contacto">
          <h2 className="text-3xl mb-4">¿Listo para probarlo en tu negocio?</h2>
          <a href="https://calendly.com/weare-average-ai/reunion-average-marketing" target="_blank" rel="noopener noreferrer" className="bg-[#71F14F] text-black px-8 py-3 rounded font-semibold hover:bg-green-400 transition glow-green-soft">
            Agenda una llamada
          </a>
        </section>
      </main>
      {/* Footer moderno solo al final, ancho al texto */}
      <div className="w-full flex justify-center">
        <footer className="mt-12 py-2 px-6 rounded-2xl shadow-2xl bg-[#181c1b]/60 backdrop-blur-2xl border border-[#232b28] text-sm inline-block">
          <span className="text-gray-400">average - </span>
          <span className="text-[#71F14F] font-semibold mx-1">Humanos + IA</span>
          <span className="text-gray-400"> - proudly </span>
          <span className="text-[#71F14F] font-semibold">Colombian 🇨🇴</span>
        </footer>
      </div>
    </div>
  );
} 