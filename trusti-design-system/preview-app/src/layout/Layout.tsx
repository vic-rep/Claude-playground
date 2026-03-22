import { NavLink, useLocation } from 'react-router-dom';
import './layout.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/atoms', label: 'Atoms' },
  {
    to: '/components',
    label: 'Components',
    anchors: [
      { id: 'alert', label: 'Alert' },
      { id: 'button', label: 'Button' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'context-menu', label: 'Context Menu' },
      { id: 'input', label: 'Input' },
      { id: 'logo', label: 'Logo' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'pill', label: 'Pill' },
      { id: 'progressbar', label: 'ProgressBar' },
      { id: 'radio', label: 'Radio' },
      { id: 'slider', label: 'Slider' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'tag', label: 'Tag' },
      { id: 'toast', label: 'Toast' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'drawer', label: 'Drawer' },
      { id: 'modal', label: 'Modal' },
    ],
  },
  { to: '/prototypes', label: 'Prototypes' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isComponentsPage = location.pathname === '/components';

  return (
    <div className="preview-layout">
      <aside className="preview-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">T</div>
          <span className="sidebar-title">Trusti DS</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
              {item.anchors && isComponentsPage && (
                <div className="sidebar-anchors">
                  {item.anchors.map((anchor) => (
                    <a
                      key={anchor.id}
                      href={`#${anchor.id}`}
                      className="sidebar-anchor"
                    >
                      {anchor.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
