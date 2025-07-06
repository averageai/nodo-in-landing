import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <Head>
        <title>Nodo IN | average.ai</title>
        <meta name="description" content="Nodo IN – Sistemas Humanos + AI que atienden y cierran ventas por ti." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-light leading-tight">
          ¿Qué es <span className="text-[#71F14F]">Nodo IN</span>?
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mt-6">
          Es tu primer sistema IA. Atiende por ti, cierra por ti. Y no se cansa.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 text-left">
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-2xl mb-2 text-[#71F14F]">Nodo IN Agendas</h3>
            <p>Agenda citas automáticamente por WhatsApp. Perfecto para peluquerías, spas y clínicas.</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-2xl mb-2 text-[#71F14F]">Nodo IN Domicilios</h3>
            <p>Recibe pedidos, valida inventario y responde con el total. Sin apps externas ni operadores.</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-2xl mb-2 text-[#71F14F]">Nodo IN Marketplace</h3>
            <p>Responde preguntas y cierra ventas en Instagram o plataformas. Ideal para emprendedores.</p>
          </div>
          <div className="bg-[#181818] p-6 rounded-xl">
            <h3 className="text-2xl mb-2 text-[#71F14F]">Nodo IN Asistente Personal</h3>
            <p>Gestiona tu agenda, confirma citas y organiza notas. Ideal para médicos, abogados o asesores.</p>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-gray-400 mb-4">¿Quieres uno para tu negocio?</p>
          <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="bg-[#71F14F] text-black px-8 py-3 rounded font-semibold hover:bg-green-400 transition">
            Agenda una llamada
          </a>
        </div>
      </main>
    </div>
  )
}
