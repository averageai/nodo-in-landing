import Image from 'next/image';

export default function Nodos() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* 📌 Lado izquierdo: Texto + botones */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Qué hace un Nodo IN?
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg">
            Es un sistema conectado a WhatsApp que atiende por ti y cierra ventas sin depender de operadores.
            Responde, valida, organiza y confirma. Solo necesitas uno.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20para%20belleza"
              className="bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              💇‍♀️ Probar Nodo para Belleza
            </a>
            <a
              href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20para%20comidas"
              className="bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              🍔 Probar Nodo para Comidas
            </a>
            <a
              href="https://wa.me/447717190625?text=Hola%20quiero%20probar%20el%20Nodo%20IN%20Asistente"
              className="bg-neutral-900 border border-gray-600 hover:border-[#71F14F] px-5 py-3 rounded transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              📅 Probar Nodo Asistente Personal
            </a>
          </div>
        </div>

        {/* 📱 Lado derecho: Mockup animado */}
        <div className="flex justify-center">
          <div
            className="w-[300px] h-[620px] rounded-[2.5rem] border-[10px] border-black shadow-2xl overflow-hidden transform transition duration-700 hover:scale-105 hover:shadow-green-500/30 opacity-0 animate-fade-up"
          >
            <Image
              src="/preview-nodo.jpeg"
              alt="Demo Nodo IN"
              width={300}
              height={620}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
