export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: 12 }}>
            <span className="logo-dot">+</span> Градиент
          </div>
          <p style={{ color: 'var(--color-muted)', maxWidth: 280, fontSize: 14 }}>
            Простое хранилище фото с авторизацией и ролями user/admin.
          </p>
        </div>
        <div>
          <h4>Сервис</h4>
          <ul>
            <li>Лента</li>
            <li>Загрузка фото</li>
          </ul>
        </div>
        <div>
          <h4>Компания</h4>
          <ul>
            <li>О проекте</li>
            <li>Правила</li>
          </ul>
        </div>
        <div>
          <h4>Связь</h4>
          <ul>
            <li>Написать нам</li>
            <li>Поддержка</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Градиент. Учебный проект.</span>
      </div>
    </footer>
  );
}
