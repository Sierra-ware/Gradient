import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Неверный email или пароль.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Header />
      <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Вход в Градиент</h2>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-dark" style={{ width: '100%' }} disabled={busy}>
          {busy ? 'Входим...' : 'Sign in'}
        </button>
        <p style={{ marginTop: 16, fontSize: 14, color: 'var(--color-muted)' }}>
          Нет аккаунта? <Link to="/register" style={{ color: 'var(--color-accent)' }}>Зарегистрироваться</Link>
        </p>
        <p style={{ marginTop: 8, fontSize: 12, color: 'var(--color-muted)' }}>
          Демо: admin@gradient.local / user@gradient.local, пароль password
        </p>
      </form>
      </div>
    </>
  );
}
