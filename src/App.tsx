import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './components/Dashboard';
import { ContentManagement } from './components/ContentManagement';
import { ContentRegistration } from './components/ContentRegistration';
import { ProductManagement } from './components/ProductManagement';
import { PublicLayout } from './components/PublicLayout';
import { LandingPage } from './components/LandingPage';
import { CompanyInfo } from './components/CompanyInfo';
import { MediaCenter } from './components/MediaCenter';
import { SiteManagement } from './components/SiteManagement';
import { UserManagement } from './components/UserManagement';
import { CustomerMyPage } from './components/CustomerMyPage';
import { OrderManagement } from './components/OrderManagement';
import { CustomerSupport } from './components/CustomerSupport';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/company" element={<PublicLayout><CompanyInfo /></PublicLayout>} />
        <Route path="/media" element={<PublicLayout><MediaCenter /></PublicLayout>} />
        <Route path="/mypage" element={<PublicLayout><CustomerMyPage /></PublicLayout>} />
        <Route path="/support" element={<PublicLayout><CustomerSupport /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        
        <Route path="/admin/site" element={<AdminLayout><SiteManagement /></AdminLayout>} />
        <Route path="/admin/menu" element={<AdminLayout><div className="p-4">Menu Management</div></AdminLayout>} />
        
        <Route path="/admin/content" element={<AdminLayout><ContentManagement /></AdminLayout>} />
        <Route path="/admin/content/new" element={<AdminLayout><ContentRegistration /></AdminLayout>} />
        
        <Route path="/admin/products" element={<AdminLayout><ProductManagement /></AdminLayout>} />
        <Route path="/admin/shop" element={<AdminLayout><div className="p-4 bg-white rounded-xl border p-6 font-bold">Shopping Mall Management</div></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><OrderManagement /></AdminLayout>} />
        <Route path="/admin/customers" element={<AdminLayout><div className="p-4 bg-white rounded-xl border p-6 font-bold">Customer Management</div></AdminLayout>} />
        <Route path="/admin/system" element={<AdminLayout><UserManagement /></AdminLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
