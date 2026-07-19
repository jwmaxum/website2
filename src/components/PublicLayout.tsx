import { ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [showShoppingMall, setShowShoppingMall] = useState(true);

  useEffect(() => {
    const savedShowMall = localStorage.getItem('show_shopping_mall');
    if (savedShowMall !== null) {
      setShowShoppingMall(JSON.parse(savedShowMall));
    }
  }, []);

  return (
    <div className="text-slate-900 font-sans antialiased min-h-screen flex flex-col bg-[#fbf9f6]">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-colors duration-300">
        <div className="flex justify-between items-center px-5 md:px-10 py-4 w-full max-w-[1440px] mx-auto">
          
          <nav className="hidden md:flex gap-6 items-center">
            {showShoppingMall && (
              <Link to="/" className="text-sm font-medium text-slate-900 border-b border-slate-900 pb-1">Shop</Link>
            )}
            <Link to="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300">Brand Story</Link>
            <Link to="/company" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300">Company</Link>
            <Link to="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300">Collection</Link>
            <Link to="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300">Event</Link>
          </nav>
          
          <div className="flex-1 flex justify-center md:justify-center justify-start">
            <Link to="/" className="text-2xl font-serif tracking-widest text-slate-900">
              BEAUTY OF JOSEON
            </Link>
          </div>
          
          <div className="flex gap-4 items-center text-slate-900">
            <Link to="#" className="hover:text-slate-500 transition-colors duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>public</span>
            </Link>
            <Link to="/admin/login" className="hover:text-slate-500 transition-colors duration-300 flex items-center justify-center" title="Admin Login">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
            </Link>
            {showShoppingMall && (
              <Link to="#" className="hover:text-slate-500 transition-colors duration-300 flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* SideNavBar & Main Content Wrapper */}
      <div className="flex flex-1 pt-[73px]">
        {/* SideNavBar - Based on Dev Document (Shop & Company) */}
        <aside className="bg-white border-r border-slate-200 fixed left-0 top-0 h-screen pt-24 px-6 z-40 w-64 hidden lg:flex flex-col overflow-y-auto">
          
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-slate-900 mb-2">Navigation</h2>
            <p className="text-sm text-slate-500">Beauty of Joseon</p>
          </div>

          {showShoppingMall && (
            <nav className="flex flex-col gap-1 mb-8">
              <h3 className="text-xs font-bold text-slate-900 px-4 mb-2 uppercase tracking-widest">Shop</h3>
              <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">category</span>
                <span>제품 카테고리</span>
              </Link>
              <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-900 bg-slate-100 font-bold transition-all text-sm">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>베스트 셀러</span>
              </Link>
              <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                <span>장바구니</span>
              </Link>
              <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>주문 / 결제</span>
              </Link>
              <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>마이페이지</span>
              </Link>
            </nav>
          )}

          <nav className="flex flex-col gap-1 pb-8">
            <h3 className="text-xs font-bold text-slate-900 px-4 mb-2 uppercase tracking-widest">Company</h3>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">auto_stories</span>
              <span>Brand Story</span>
            </Link>
            <Link to="/company" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>Company</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              <span>Collection</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">perm_media</span>
              <span>Media</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Customer Support</span>
            </Link>
          </nav>

        </aside>

        {/* Main Canvas */}
        <main className="flex-1 lg:ml-64 w-full max-w-[1440px] mx-auto px-5 md:px-10 pb-16">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-16 px-10 grid grid-cols-4 gap-8 max-w-[1440px] mx-auto bg-white border-t border-slate-200">
        <div className="col-span-4 lg:col-span-1 mb-8 lg:mb-0">
          <h4 className="text-2xl font-serif uppercase tracking-tighter text-slate-900 mb-4">BEAUTY OF JOSEON</h4>
          <p className="text-sm text-slate-500 mb-4">Copyright © BEAUTY OF JOSEON All rights reserved.</p>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <Link to="#" className="text-sm text-slate-900 underline transition-colors duration-200">Customer Service</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">FAQ</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Contact Us</Link>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Terms of Use</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Privacy Policy</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Business Info</Link>
        </div>
        <div className="col-span-4 lg:col-span-1 flex gap-4 mt-8 lg:mt-0">
          <Link to="#" className="text-slate-500 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined">public</span></Link>
          <Link to="#" className="text-slate-500 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined">mail</span></Link>
        </div>
      </footer>
    </div>
  );
}
