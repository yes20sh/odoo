import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { identifier, password });
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md drop-shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-gray-600 text-xs mb-6">Login with your email or username</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Email / Username</label>
            <input
              type="text"
              placeholder="email@example.com or yourUsername"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white rounded-md py-3 text-sm font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs mt-4">
          Forgot your password?{' '}
          <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
            Reset here
          </span>
        </p>

        <p className="text-center text-gray-900 text-xs mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-purple-700 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
