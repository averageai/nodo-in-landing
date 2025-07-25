import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/admin-panel');
      } else {
        setError(data.error || 'Error de autenticación');
      }
    } catch (err) {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 border border-gray-700 p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#71F14F' }}>Iniciar Sesión</h1>
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Usuario</label>
          <input
            type="text"
            className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring focus:border-[#71F14F] placeholder-gray-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-600 bg-black/40 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring focus:border-[#71F14F] placeholder-gray-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#71F14F] text-black font-semibold py-2 rounded hover:bg-green-400 transition"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
} 