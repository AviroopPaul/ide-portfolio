import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const { login } = usePortfolio();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Access Denied');
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-card p-8 rounded-lg border border-border w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center">
            <Lock className="text-yellow" />
            Authenticate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Password (hint: admin123)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg border border-border rounded p-2 focus:border-accent focus:outline-none text-text"
              placeholder="Enter access key..."
            />
          </div>
          {error && <div className="text-red text-sm">{error}</div>}
          <button 
            type="submit"
            className="w-full bg-green text-bg font-bold py-2 rounded hover:brightness-110 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
