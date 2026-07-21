import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [showShoppingMall, setShowShoppingMall] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const savedShowMall = localStorage.getItem('show_shopping_mall');
    if (savedShowMall !== null) {
      setShowShoppingMall(JSON.parse(savedShowMall));
    }
  }, []);

  const isShopPage = location.pathname === '/';

  return (
    <div className="text-slate-900 font-sans antialiased min-h-screen flex flex-col bg-[#fbf9f6]">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
        <div className="flex justify-between items-center px-5 md:px-10 py-4 w-full max-w-[1440px] mx-auto">
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/company" className={`text-sm font-medium transition-colors duration-300 ${location.pathname === '/company' ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5' : 'text-slate-600 hover:text-slate-900'}`}>Company</Link>
            <Link to="/company?tab=ceo" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300">Brand</Link>
            <Link to="/company?tab=contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300">Media Center</Link>
            {showShoppingMall && (
              <Link to="/" className={`text-sm font-medium transition-colors duration-300 ${isShopPage ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5' : 'text-slate-600 hover:text-slate-900'}`}>Shop</Link>
            )}
          </nav>
          
          <div className="flex-1 flex justify-center items-center">
            <Link to="/" className="text-2xl font-serif tracking-widest text-slate-900 hover:opacity-80 transition-opacity">
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
              <Link to="/" className="hover:text-slate-500 transition-colors duration-300 flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
              </Link>
            )}
          </div>
        </div>

        {/* Header Shop Sub-Menu (Triggered on Shop Page access) */}
        {showShoppingMall && isShopPage && (
          <div className="bg-slate-50/90 border-t border-slate-200 px-5 md:px-10 py-2.5">
            <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-6 md:gap-10 overflow-x-auto text-xs md:text-sm font-medium">
              <Link to="#" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">category</span>
                <span>제품 카테고리</span>
              </Link>
              <Link to="#" className="flex items-center gap-1.5 text-slate-900 font-bold transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>베스트 셀러</span>
              </Link>
              <Link to="#" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                <span>장바구니</span>
              </Link>
              <Link to="#" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>주문 / 결제</span>
              </Link>
              <Link to="#" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>마이페이지</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Wrapper (Sidebar hidden completely) */}
      <div className={`flex flex-1 ${isShopPage && showShoppingMall ? 'pt-[125px]' : 'pt-[73px]'}`}>
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-5 md:px-10 pb-16">
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
          <Link to="/admin/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Console</Link>
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
