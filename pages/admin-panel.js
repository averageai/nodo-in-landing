import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import AdminLayout from '../components/AdminLayout';

export default function AdminPanel() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  // Aquí puedes agregar más estados para horarios y calendario si lo necesitas

  useEffect(() => {
    // Protección de ruta: verificar JWT
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }
    try {
      // Solo decodificamos, no validamos firma en el cliente (por seguridad real, validar en backend en endpoints sensibles)
      const decoded = jwt.decode(token);
      if (!decoded || !decoded.username) {
        localStorage.removeItem('token');
        router.replace('/login');
        return;
      }
      setAuthChecked(true);
    } catch (e) {
      localStorage.removeItem('token');
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    if (authChecked) {
      loadServices();
    }
    // eslint-disable-next-line
  }, [authChecked]);

  async function loadServices() {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  }

  // Puedes agregar aquí las funciones para guardar servicios, editar, etc.

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">Verificando acceso...</div>;
  }

  return (
    <AdminLayout>
      <div className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
              className="border border-gray-400 text-gray-200 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition bg-black/40 backdrop-blur-md"
            >
              Cerrar sesión
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-8 text-[#71F14F]">Panel de Administración - Asistente Belleza</h1>

          {/* Gestión de Servicios */}
          <section className="backdrop-blur-md bg-white/10 border border-gray-700 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#71F14F]">Gestión de Servicios</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-gray-200">
                <thead>
                  <tr className="bg-black/30">
                    <th className="px-4 py-2 text-left">Servicio</th>
                    <th className="px-4 py-2 text-left">Precio</th>
                    <th className="px-4 py-2 text-left">Duración</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-4">Cargando...</td></tr>
                  ) : services.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-4">No hay servicios registrados.</td></tr>
                  ) : (
                    services.map(service => (
                      <tr key={service.id} className="hover:bg-black/20">
                        <td className="px-4 py-2">{service.service_name}</td>
                        <td className="px-4 py-2">${service.price.toLocaleString()}</td>
                        <td className="px-4 py-2">{service.duration_minutes} min</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-sm ${service.is_active ? 'bg-green-900 text-[#71F14F]' : 'bg-red-900 text-red-400'}`}>
                            {service.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-[#71F14F] hover:underline mr-2">Editar</button>
                          <button className="text-red-400 hover:underline">
                            {service.is_active ? 'Desactivar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="mt-4 bg-[#71F14F] text-black px-4 py-2 rounded hover:bg-green-400 font-semibold">
              + Agregar Servicio
            </button>
          </section>

          {/* Horarios de Atención */}
          <section className="backdrop-blur-md bg-white/10 border border-gray-700 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#71F14F]">Horarios de Atención</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Aquí iría el formulario dinámico de horarios */}
              <div>
                <span className="text-gray-400">(Próximamente)</span>
              </div>
            </div>
          </section>

          {/* Configuración de Calendario */}
          <section className="backdrop-blur-md bg-white/10 border border-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#71F14F]">Configuración de Calendario</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Google Calendar ID</label>
                <input type="text" className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" placeholder="your-calendar@gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Zona Horaria</label>
                <select className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2">
                  <option value="America/Bogota">Colombia (Bogotá)</option>
                  <option value="America/Mexico_City">México</option>
                  <option value="America/Argentina/Buenos_Aires">Argentina</option>
                </select>
              </div>
              <button className="bg-[#71F14F] text-black px-4 py-2 rounded hover:bg-green-400 font-semibold">
                Guardar Configuración
              </button>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
} 