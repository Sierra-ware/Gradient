import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await register(name, email, password, passwordConfirmation);
      navigate('/');
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' ') : 'Не удалось зарегистрироваться.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Header />
      <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Регистрация</h2>
        <div className="field">
          <label>Имя</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        <div className="field">
          <label>Подтвердите пароль</label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-dark" style={{ width: '100%' }} disabled={busy}>
          {busy ? 'Создаём...' : 'Register'}
        </button>
        <p style={{ marginTop: 16, fontSize: 14, color: 'var(--color-muted)' }}>
          Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--color-accent)' }}>Войти</Link>
        </p>
      </form>
      </div>
    </>
  );
}
