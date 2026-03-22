import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { HomePage } from './pages/HomePage';
import { AtomsPage } from './pages/AtomsPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { PrototypesPage } from './pages/PrototypesPage';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/atoms" element={<AtomsPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/prototypes" element={<PrototypesPage />} />
      </Routes>
    </Layout>
  );
}
