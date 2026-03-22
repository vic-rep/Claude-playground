import { NavLink } from 'react-router-dom';
import './layout.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/tokens', label: 'Tokens' },
  { to: '/components', label: 'Components' },
  { to: '/prototypes', label: 'Prototypes' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="preview-layout">
      <aside className="preview-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">T</div>
          <span className="sidebar-title">Trusti DS</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-version">v1.0.0</span>
        </div>
      </aside>
      <main className="preview-main">
        <div className="preview-content">{children}</div>
      </main>
    </div>
  );
}
