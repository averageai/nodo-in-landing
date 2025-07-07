import Head from 'next/head'

export default function Nodos() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <Head>
        <title>Cómo funciona Nodo IN | average.ai</title>
        <meta name="description" content="Descubre cómo funcionan los Nodos IN y pruébalos por sector." />
      </Head>

      <section className="max-w-5xl mx-auto mb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl mb-4">¿Qué hace un Nodo IN?</h1>
          <p className="text-gray-400">
            Es un sistema conectado a WhatsApp que atiende por ti y cierra ventas sin depender de operadores. Responde, valida, organiza y confirma. Solo necesitas uno.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <a href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20para%20belleza" target="_blank" className="bg-[#181818] border border-gray-700 px-6 py-4 rounded text-white hover:bg-[#1f1f1f]">
            💇‍♀️ Probar Nodo para Belleza
          </a>
          <a href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20para%20comidas" target="_blank" className="bg-[#181818] border border-gray-700 px-6 py-4 rounded text-white hover:bg-[#1f1f1f]">
            🍔 Probar Nodo para Comidas
          </a>
          <a href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20Asistente" target="_blank" className="bg-[#181818] border border-gray-700 px-6 py-4 rounded text-white hover:bg-[#1f1f1f]">
            📆 Probar Nodo Asistente Personal
          </a>
        </div>
      </section>
    </div>
  )
}
