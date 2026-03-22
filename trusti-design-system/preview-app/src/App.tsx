import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { HomePage } from './pages/HomePage';
import { TokensPage } from './pages/TokensPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { PrototypesPage } from './pages/PrototypesPage';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/prototypes" element={<PrototypesPage />} />
      </Routes>
    </Layout>
  );
}
