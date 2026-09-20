import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ search, onSearch }: { search?: string; onSearch?: (v: string) => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        <span className="logo-dot">+</span> Градиент
      </Link>

      {onSearch && (
        <input
          className="search-input"
          placeholder="Value"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}

      {user ? (
        <div className="nav-links">
          <span>{user.name}</span>
          <span className={`role-badge ${user.role}`}>{user.role}</span>
          <button className="btn btn-ghost" onClick={onLogout}>Выйти</button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login"><button className="btn btn-ghost">Sign in</button></Link>
          <Link to="/register"><button className="btn btn-dark">Register</button></Link>
        </div>
      )}
    </header>
  );
}
