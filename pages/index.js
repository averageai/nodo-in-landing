import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <Head>
        <title>Nodo IN | average.ai</title>
        <meta name="description" content="Nodo IN – Sistemas Humanos + AI que atienden y cierran ventas por ti." />
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
        <img src="/logo.png" alt="average.ai logo" className="mx-auto h-14 mb-6" />
        <h1 className="text-3xl md:text-5xl font-light leading-tight mb-6">
          No somos una IA.<br />
          <span className="text-[#71F14F]">Somos Humanos + AI</span><br />
          que la implementan para ayudarte a enfocarte en lo que sí importa.
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-4">
          Creamos sistemas que trabajan por ti. Tú te quedas con los resultados.
        </p>
        <a href="#nodos" className="bg-[#71F14F] text-black px-6 py-2 rounded font-semibold hover:bg-green-400 transition">
          Ver cómo funciona Nodo IN
        </a>
      </section>

      {/* Quiénes somos */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl mb-4">¿Quiénes somos?</h2>
        <p className="text-gray-400">
          Somos una agencia de Humanos + AI. Creamos soluciones técnicas que automatizan, organizan y escalan tu operación, sin que tengas que entender tecnología. Nos enfocamos en lo que funciona, no en lo que suena bonito.
        </p>
      </section>

      {/* Bundle AI */}
      <section className="max-w-5xl mx-auto text-left mb-24">
        <h2 className="text-3xl text-center mb-10">¿Qué incluye el Bundle AI?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-xl text-[#71F14F]">Nodo IN</h3>
            <p>Sistemas que atienden y cierran ventas en automático.</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-xl text-[#71F14F]">averageCRM</h3>
            <p>Organiza, visualiza y segmenta a tus clientes.</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-xl text-[#71F14F]">Pulse</h3>
            <p>Envía mensajes automáticos segmentados por WhatsApp, email o SMS.</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-xl text-[#71F14F]">averageLabs</h3>
            <p>Formación, documentación y experimentos reales con IA aplicada.</p>
          </div>
        </div>
      </section>

      {/* La Agencia */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl mb-4">La Agencia</h2>
        <p className="text-gray-400">
          Para quienes quieren escalar en serio. Gestionamos contenido, anuncios, SEO y estrategia digital con Humanos + AI. Operamos en segundo plano, tú ves los resultados.
        </p>
      </section>

      {/* Casos por sector */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl text-center mb-10">Casos por sector</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#181818] p-4 rounded-xl">
            <h3 className="text-[#71F14F] text-xl mb-1">Peluquería / Spa</h3>
            <p>Automatización de agenda y mensajes de seguimiento. Aumento del 40% en reactivación de clientes.</p>
          </div>
          <div className="bg-[#181818] p-4 rounded-xl">
            <h3 className="text-[#71F14F] text-xl mb-1">Restaurante local</h3>
            <p>Pedidos por WhatsApp con validación de stock. Respuesta 10x más rápida que antes.</p>
          </div>
        </div>
      </section>

      {/* Escalado */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl mb-4">¿Cómo escalo?</h2>
        <p className="text-gray-400">
          Empiezas con un Nodo IN. Luego conectas el CRM. Activas campañas. Y si todo funciona, te unes a la Agencia.
        </p>
      </section>

      {/* Testimonios */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <h2 className="text-3xl mb-10">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#181818] p-6 rounded-xl">
            <p className="italic">“Yo no sabía ni automatizar una agenda. Ahora no tengo que hacerlo.”</p>
            <p className="text-gray-400 mt-2">– Laura, Estética en Medellín</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <p className="italic">“Los pedidos me llegan listos y yo solo entrego. Esto vale oro.”</p>
            <p className="text-gray-400 mt-2">– Andrés, Restaurante en Pereira</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl mb-4">¿Listo para probarlo en tu negocio?</h2>
        <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="bg-[#71F14F] text-black px-8 py-3 rounded font-semibold hover:bg-green-400 transition">
          Agenda una llamada
        </a>
      </section>
    </div>
  )
}
