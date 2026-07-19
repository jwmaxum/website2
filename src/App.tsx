import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './components/Dashboard';
import { ContentManagement } from './components/ContentManagement';
import { ContentRegistration } from './components/ContentRegistration';
import { ProductManagement } from './components/ProductManagement';
import { PublicLayout } from './components/PublicLayout';
import { LandingPage } from './components/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        
        <Route path="/admin/site" element={<AdminLayout><div className="p-4">Site Management</div></AdminLayout>} />
        <Route path="/admin/menu" element={<AdminLayout><div className="p-4">Menu Management</div></AdminLayout>} />
        
        <Route path="/admin/content" element={<AdminLayout><ContentManagement /></AdminLayout>} />
        <Route path="/admin/content/new" element={<AdminLayout><ContentRegistration /></AdminLayout>} />
        
        <Route path="/admin/products" element={<AdminLayout><ProductManagement /></AdminLayout>} />
        
        <Route path="/admin/shop" element={<AdminLayout><div className="p-4">Shopping Mall Management</div></AdminLayout>} />
        <Route path="/admin/customers" element={<AdminLayout><div className="p-4">Customer Management</div></AdminLayout>} />
        <Route path="/admin/design" element={<AdminLayout><div className="p-4">Design Management</div></AdminLayout>} />
        <Route path="/admin/seo" element={<AdminLayout><div className="p-4">SEO Management</div></AdminLayout>} />
        <Route path="/admin/files" element={<AdminLayout><div className="p-4">File Management</div></AdminLayout>} />
        <Route path="/admin/system" element={<AdminLayout><div className="p-4">System Management</div></AdminLayout>} />
        <Route path="/admin/logs" element={<AdminLayout><div className="p-4">Log Management</div></AdminLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
