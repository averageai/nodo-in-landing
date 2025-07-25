import { useState, useEffect } from 'react';
import Image from 'next/image';

const FUTURE_FEATURES = [
  { key: 'asistentes', label: 'asistentes' },
  { key: 'belleza', label: 'Belleza' },
  { key: 'crm', label: 'CRM' },
  { key: 'configuracion', label: 'configuracion' },
  { key: 'soporte', label: 'soporte' },
];

export default function AdminLayout({ children }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showFutureMsg, setShowFutureMsg] = useState('');

  // Clave maestra (en producción, comparar con process.env.ADMIN_MASTER_KEY desde el backend)
  const handleAdminAccess = () => {
    if (adminKey === process.env.NEXT_PUBLIC_ADMIN_MASTER_KEY) {
      setShowAdmin(true);
      setAdminError('');
    } else {
      setAdminError('Clave incorrecta');
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Menú lateral */}
      <aside
        className="fixed left-0 top-0 h-full w-60 z-30 flex flex-col justify-between p-4 bg-white/10 backdrop-blur-xl border-r border-gray-700 shadow-2xl animate-slide-in-left"
        style={{ borderTopRightRadius: 24, borderBottomRightRadius: 24 }}
      >
        <div>
          {/* Apple window icons */}
          <div className="flex space-x-2 mb-6 mt-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          </div>
          <div className="text-[#71F14F] font-bold text-2xl mb-8 ml-1">average</div>
          <nav className="flex flex-col gap-3">
            {FUTURE_FEATURES.map((f) => (
              <button
                key={f.key}
                className="border border-gray-300 text-gray-100 rounded px-4 py-2 text-left hover:border-[#71F14F] hover:text-[#71F14F] transition bg-black/30"
                onClick={() => setShowFutureMsg(f.label)}
              >
                {f.label}
              </button>
            ))}
            <button
              className="border border-gray-300 text-gray-100 rounded px-4 py-2 text-left hover:border-[#71F14F] hover:text-[#71F14F] transition bg-black/30 mt-4"
              onClick={() => setShowAdmin('modal')}
            >
              Admin
            </button>
          </nav>
        </div>
        <div className="text-gray-400 text-xs text-center mt-8">
          v 1.1<br />
          proudly Colombian 🇨🇴<br />
          average - Humanos + AI @2025<br />
          <span className="text-gray-600">The hard work is on us</span>
        </div>
      </aside>

      {/* Overlay para mensajes de funciones futuras */}
      {showFutureMsg && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          onClick={() => setShowFutureMsg('')}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl p-8 text-center text-gray-100 max-w-xs shadow-2xl">
            <div className="text-[#71F14F] font-bold mb-2">¡Muy pronto!</div>
            <div className="mb-4">Nunca paramos de trabajar, espera esta función muy pronto.</div>
            <button
              className="mt-2 px-4 py-2 rounded bg-[#71F14F] text-black font-semibold hover:bg-green-400"
              onClick={() => setShowFutureMsg('')}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de acceso admin */}
      {showAdmin === 'modal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl p-8 text-center text-gray-100 max-w-xs shadow-2xl">
            <div className="text-[#71F14F] font-bold mb-2">Acceso Admin</div>
            <input
              type="password"
              className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-[#71F14F] placeholder-gray-500"
              placeholder="Clave maestra"
              value={adminKey}
              onChange={e => setAdminKey(e.target.value)}
            />
            {adminError && <div className="text-red-400 text-sm mb-2">{adminError}</div>}
            <button
              className="mt-2 px-4 py-2 rounded bg-[#71F14F] text-black font-semibold hover:bg-green-400"
              onClick={handleAdminAccess}
            >
              Acceder
            </button>
            <button
              className="mt-2 ml-2 px-4 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700"
              onClick={() => { setShowAdmin(false); setAdminKey(''); setAdminError(''); }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Panel de gestión admin (solo si clave correcta) */}
      {showAdmin === true && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl p-8 text-center text-gray-100 max-w-md shadow-2xl">
            <div className="text-[#71F14F] font-bold mb-2">Gestión de Usuarios</div>
            <AdminUserManager onClose={() => setShowAdmin(false)} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="flex-1 ml-60 min-h-screen">
        {children}
      </main>
    </div>
  );
}

// Componente de gestión de usuarios
function AdminUserManager({ onClose }) {
  const [tab, setTab] = useState('create');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSuper, setIsSuper] = useState(false);
  const [masterKey, setMasterKey] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Cargar usuarios para cambiar clave
  useEffect(() => {
    if (tab === 'change') fetchUsers();
    // eslint-disable-next-line
  }, [tab]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/list-users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ masterKey }) });
      const data = await res.json();
      if (res.ok) setUsers(data.users);
      else setFeedback(data.error || 'Error al cargar usuarios');
    } catch {
      setFeedback('Error de red');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setFeedback('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterKey, action: 'create', username, password, is_superuser: isSuper }),
      });
      const data = await res.json();
      if (res.ok) setFeedback('Usuario creado correctamente');
      else setFeedback(data.error || 'Error al crear usuario');
    } catch {
      setFeedback('Error de red');
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setFeedback('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterKey, action: 'change_password', userId: selectedUser, password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) setFeedback('Contraseña actualizada');
      else setFeedback(data.error || 'Error al cambiar contraseña');
    } catch {
      setFeedback('Error de red');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-center mb-4 gap-2">
        <button className={`px-3 py-1 rounded ${tab === 'create' ? 'bg-[#71F14F] text-black' : 'bg-black/30 text-gray-200 border border-gray-600'}`} onClick={() => setTab('create')}>Crear usuario</button>
        <button className={`px-3 py-1 rounded ${tab === 'change' ? 'bg-[#71F14F] text-black' : 'bg-black/30 text-gray-200 border border-gray-600'}`} onClick={() => setTab('change')}>Cambiar clave</button>
      </div>
      {tab === 'create' && (
        <form onSubmit={handleCreate} className="space-y-3">
          <input type="text" className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" checked={isSuper} onChange={e => setIsSuper(e.target.checked)} />
            Superusuario
          </label>
          <input type="password" className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" placeholder="Clave maestra" value={masterKey} onChange={e => setMasterKey(e.target.value)} required />
          <button type="submit" className="w-full bg-[#71F14F] text-black font-semibold py-2 rounded hover:bg-green-400 transition" disabled={loading}>{loading ? 'Creando...' : 'Crear usuario'}</button>
        </form>
      )}
      {tab === 'change' && (
        <form onSubmit={handleChangePassword} className="space-y-3">
          <select className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" value={selectedUser} onChange={e => setSelectedUser(e.target.value)} required>
            <option value="">Selecciona usuario</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
          </select>
          <input type="password" className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          <input type="password" className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2" placeholder="Clave maestra" value={masterKey} onChange={e => setMasterKey(e.target.value)} required />
          <button type="submit" className="w-full bg-[#71F14F] text-black font-semibold py-2 rounded hover:bg-green-400 transition" disabled={loading}>{loading ? 'Cambiando...' : 'Cambiar clave'}</button>
        </form>
      )}
      {/* Feedback */}
      {feedback && <div className="mt-3 text-sm text-center text-[#71F14F]">{feedback}</div>}
      {/* Sección para gestión de módulos (futuro) */}
      {/*
      <div className="mt-6 text-gray-400 text-xs">Gestión de módulos por usuario próximamente...</div>
      */}
      <button className="mt-6 px-4 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700" onClick={onClose}>Cerrar</button>
    </div>
  );
}

// Animación slide-in-left
// Agrega esto a tu CSS global o tailwind.config.js:
// .animate-slide-in-left { animation: slideInLeftFade 0.8s cubic-bezier(0.4,0,0.2,1) both; } 