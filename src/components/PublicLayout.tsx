import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageCode, supportedLanguages, translations } from '../i18n';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [showShoppingMall, setShowShoppingMall] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<LanguageCode>('ko');

  const location = useLocation();

  useEffect(() => {
    const savedShowMall = localStorage.getItem('show_shopping_mall');
    if (savedShowMall !== null) {
      setShowShoppingMall(JSON.parse(savedShowMall));
    }

    const savedLang = localStorage.getItem('selected_language') as LanguageCode;
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (code: LanguageCode) => {
    setCurrentLang(code);
    localStorage.setItem('selected_language', code);
    setLangDropdownOpen(false);

    // Apply RTL for Arabic
    if (code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const t = (key: string) => {
    return translations[currentLang]?.[key] || translations['ko']?.[key] || key;
  };

  const isShopPage = location.pathname === '/';
  const currentLangObj = supportedLanguages.find((l) => l.code === currentLang) || supportedLanguages[0];

  return (
    <div className="text-slate-900 font-sans antialiased min-h-screen flex flex-col bg-[#fbf9f6]">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
        <div className="flex justify-between items-center px-4 md:px-10 py-3.5 w-full max-w-[1440px] mx-auto">
          
          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              to="/company"
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === '/company'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('company')}
            </Link>
            <Link
              to="/company?tab=ceo"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300"
            >
              {t('brand')}
            </Link>
            <Link
              to="/media"
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === '/media'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('media')}
            </Link>
            {showShoppingMall && (
              <Link
                to="/"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isShopPage
                    ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('shop')}
              </Link>
            )}
          </nav>

          {/* Logo Center */}
          <div className="flex-1 flex justify-center items-center">
            <Link to="/" className="text-xl md:text-2xl font-serif tracking-widest text-slate-900 hover:opacity-80 transition-opacity">
              BEAUTY OF JOSEON
            </Link>
          </div>

          {/* Header Right Tools: Language Selector + User MyPage */}
          <div className="flex gap-2.5 md:gap-4 items-center text-slate-900">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors text-xs font-bold text-slate-800"
              >
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.label}</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-200">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Language (언어 선택)
                  </div>
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        currentLang === lang.code ? 'font-bold text-slate-900 bg-slate-50' : 'text-slate-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {currentLang === lang.code && (
                        <span className="material-symbols-outlined text-[16px] text-slate-900">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MyPage Icon */}
            <Link
              to="/mypage"
              className="p-1.5 hover:text-slate-500 transition-colors duration-300 flex items-center justify-center"
              title={t('mypage')}
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
            </Link>

            {showShoppingMall && (
              <Link
                to="/"
                className="p-1.5 hover:text-slate-500 transition-colors duration-300 flex items-center justify-center"
                title={t('shop')}
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Header Shop Sub-Menu */}
        {showShoppingMall && isShopPage && (
          <div className="hidden md:block bg-slate-50/90 border-t border-slate-200 px-5 md:px-10 py-2.5">
            <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-8 overflow-x-auto text-xs md:text-sm font-medium">
              <a href="#product-catalog" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">category</span>
                <span>{t('categories')}</span>
              </a>
              <Link to="/?filter=bestsellers" className="flex items-center gap-1.5 text-slate-900 font-bold transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{t('bestsellers')}</span>
              </Link>
              <a href="#product-catalog" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                <span>{t('cart')}</span>
              </a>
              <a href="#product-catalog" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>{t('orders')}</span>
              </a>
              <Link to="/mypage" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>{t('mypage')}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200">
          <div className="fixed top-[60px] left-0 right-0 bg-white border-b border-slate-200 p-6 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Main Nav Links */}
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Navigation</p>
              <div className="grid grid-cols-2 gap-3 text-sm font-bold">
                <Link
                  to="/company"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-slate-50 rounded-xl text-slate-900 flex items-center justify-between"
                >
                  <span>{t('company')}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
                <Link
                  to="/company?tab=ceo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-slate-50 rounded-xl text-slate-900 flex items-center justify-between"
                >
                  <span>{t('brand')}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
                <Link
                  to="/media"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-slate-50 rounded-xl text-slate-900 flex items-center justify-between"
                >
                  <span>{t('media')}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
                {showShoppingMall && (
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-slate-50 rounded-xl text-slate-900 flex items-center justify-between"
                  >
                    <span>{t('shop')}</span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Shop Sub-Menu Links */}
            {showShoppingMall && (
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shop Shortcuts</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <a
                    href="#product-catalog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 border border-slate-200 rounded-lg text-slate-700 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">category</span>
                    <span>{t('categories')}</span>
                  </a>
                  <Link
                    to="/?filter=bestsellers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 border border-amber-300 bg-amber-50 rounded-lg text-amber-900 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span>{t('bestsellers')}</span>
                  </Link>
                  <Link
                    to="/mypage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 border border-slate-200 rounded-lg text-slate-700 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">account_circle</span>
                    <span>{t('mypage')}</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Multi-Language Grid Selector */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Language (다국어 선택 - 7개 국어)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      currentLang === lang.code
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className={`flex flex-1 ${isShopPage && showShoppingMall ? 'pt-[115px] md:pt-[125px]' : 'pt-[65px] md:pt-[73px]'}`}>
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-16">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-16 px-6 md:px-10 grid grid-cols-4 gap-8 max-w-[1440px] mx-auto bg-white border-t border-slate-200">
        <div className="col-span-4 lg:col-span-1 mb-6 lg:mb-0">
          <h4 className="text-2xl font-serif uppercase tracking-tighter text-slate-900 mb-4">BEAUTY OF JOSEON</h4>
          <p className="text-sm text-slate-500 mb-4">Copyright © BEAUTY OF JOSEON {t('rights')}</p>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <Link to="#" className="text-sm text-slate-900 underline transition-colors duration-200">{t('customerService')}</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">{t('faq')}</Link>
          <Link to="/admin/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">{t('console')}</Link>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Terms of Use</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Privacy Policy</Link>
          <Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200">Business Info</Link>
        </div>
        <div className="col-span-4 lg:col-span-1 flex gap-4 mt-4 lg:mt-0">
          <Link to="#" className="text-slate-500 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined">public</span></Link>
          <Link to="#" className="text-slate-500 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined">mail</span></Link>
        </div>
      </footer>
    </div>
  );
}
