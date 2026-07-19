import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: '사이트관리', path: '/admin/site', icon: 'settings_input_component' },
    { name: '메뉴관리', path: '/admin/menu', icon: 'menu' },
    { name: '콘텐츠관리', path: '/admin/content', icon: 'article' },
    { name: '제품관리', path: '/admin/products', icon: 'inventory_2' },
    { name: '쇼핑몰관리', path: '/admin/shop', icon: 'shopping_cart' },
    { name: '고객관리', path: '/admin/customers', icon: 'group' },
    { name: '디자인관리', path: '/admin/design', icon: 'palette' },
    { name: 'SEO 관리', path: '/admin/seo', icon: 'search_check' },
    { name: '파일관리', path: '/admin/files', icon: 'folder' },
    { name: '시스템관리', path: '/admin/system', icon: 'settings' },
    { name: '로그관리', path: '/admin/logs', icon: 'history' },
  ];

  return (
    <div className="flex h-screen bg-background text-on-surface overflow-hidden antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-on-primary flex flex-col h-full shrink-0 z-50">
        <div className="p-6 flex flex-col gap-1 mb-4 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center font-bold">
              C
            </div>
            <h1 className="text-xl font-bold">Company CMS</h1>
          </div>
          <p className="text-xs text-on-primary/70">Back-office System</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 pb-8 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer duration-150 text-sm ${
                  isActive
                    ? 'bg-secondary text-on-secondary font-medium'
                    : 'text-on-primary/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span 
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopNavBar */}
        <header className="bg-surface text-primary w-full h-16 sticky top-0 z-40 border-b border-outline-variant shadow-sm flex justify-between items-center px-8 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">Admin Portal</span>
          </div>
          
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Search... (CMD+K)" 
                className="w-full bg-surface-container border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-on-surface-variant hidden lg:block mr-2">Last Login: 2026-07-18</span>
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-all flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div className="ml-2 w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-sm font-bold cursor-pointer">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
