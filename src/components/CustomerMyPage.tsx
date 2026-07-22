import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  membership: 'GOLD VIP' | 'SILVER' | 'BRONZE';
  points: number;
  coupons: number;
  joinedDate: string;
}

const defaultCustomer: CustomerUser = {
  id: 'cust-1001',
  name: '김조선 님',
  email: 'joseon_vip@beauty.com',
  phone: '010-1234-5678',
  membership: 'GOLD VIP',
  points: 12500,
  coupons: 3,
  joinedDate: '2025.11.10',
};

export function CustomerMyPage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [myPageSection, setMyPageSection] = useState<'orders' | 'wishlist' | 'coupons' | 'settings'>('orders');

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states - Sign Up
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  useEffect(() => {
    const loggedCustomer = localStorage.getItem('customer_logged_in_user');
    if (loggedCustomer) {
      try {
        setCurrentUser(JSON.parse(loggedCustomer));
        setIsLoggedIn(true);
      } catch (e) {
        // default
      }
    }
  }, []);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // Customer login success
    const userToLogin: CustomerUser = {
      ...defaultCustomer,
      email: loginEmail.trim(),
      name: loginEmail.split('@')[0] + ' 님',
    };

    localStorage.setItem('customer_logged_in_user', JSON.stringify(userToLogin));
    setCurrentUser(userToLogin);
    setIsLoggedIn(true);
  };

  const handleQuickDemoLogin = () => {
    localStorage.setItem('customer_logged_in_user', JSON.stringify(defaultCustomer));
    setCurrentUser(defaultCustomer);
    setIsLoggedIn(true);
  };

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }
    if (signupPassword !== signupConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const newUser: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: signupName.trim() + ' 님',
      email: signupEmail.trim(),
      phone: signupPhone.trim() || '010-0000-0000',
      membership: 'SILVER',
      points: 3000, // Welcome signup points
      coupons: 1,
      joinedDate: new Date().toLocaleDateString('ko-KR'),
    };

    localStorage.setItem('customer_logged_in_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    alert('회원가입이 완료되었습니다! 가입 축하 3,000P 적립금이 지급되었습니다.');
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_logged_in_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Mock Orders Data
  const sampleOrders = [
    {
      orderId: 'ORD-20260720-9821',
      date: '2026.07.20',
      status: '배송중',
      trackingNo: 'CJ대한통운 6830-1928-3011',
      productName: '맑은쌀선크림 (SPF 50+ PA++++) 외 1건',
      price: 39300,
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtsVqrSDMr5Hp64St34s8zOuQMwoQkxb_mpUI1fs4_2dB2UmUWby6gENUgL-jXfMej03GSR4NqFXKFf0OBWAGI2wJEX3OrSBqoUAQ0S_GzTp6JR3QNdI56t1gi0j2IsgFHVIqQHpFrmBPRSExV_9yqYXUysdrMV6j46vU4JO4cESKH_0HUMLa1XhrvVZ1We1fVi1nB3DZyflXa7qWQ9AhYRsp9B-s9p6On59kcaVEus1ayOmxiUCE28C0c3',
    },
    {
      orderId: 'ORD-20260614-1102',
      date: '2026.06.14',
      status: '배송완료',
      trackingNo: '우체국택배 4019-1120-9923',
      productName: '조선미녀 인삼 탄력 크림 60ml',
      price: 20400,
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLsTDIbMW4ORIttbx7LcQBhQqCx3rUQzDZ0rKkTJlESxSyUuepvECQSxUULhXCS4f8eXC7CQU5meNhFXxQdr1h9C_ivcvf5ngHZ3ygsQcf7vhSkmFUoWkmjXwZiXVW-Em_EcgJHqx2tAbXrzXneCVMxbRmehlH_19d_zScE8wQggEYpVLob70lv2GXaObDHGs1-VBNQ77JCsoI1ZQUWF02rRduDfDoGx2sjn-WrTEFk5h98TEj0t0r53bBPW',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      {/* 1. Unauthenticated State (Customer Login / Sign Up - Amazon Style) */}
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif tracking-widest text-slate-900 mb-2">BEAUTY OF JOSEON</h1>
            <p className="text-xs text-slate-500">고객 전용 쇼핑몰 회원 서비스 (Customer Account)</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-sm font-bold transition-colors border-b-2 ${
                activeTab === 'login'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              로그인 (Sign In)
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 text-sm font-bold transition-colors border-b-2 ${
                activeTab === 'signup'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              회원가입 (Create Account)
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">이메일 주소 또는 아이디</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900 transition-colors"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">비밀번호</label>
                  <a href="#" className="text-xs text-amber-800 hover:underline">비밀번호 재설정</a>
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900 transition-colors"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-slate-900 focus:ring-slate-900" />
                  로그인 상태 유지
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-all shadow-md mt-2"
              >
                로그인하기
              </button>

              {/* Quick Demo Login */}
              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400 mb-2">테스트용 데모 계정으로 원클릭 체험</p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 bg-amber-50 text-amber-900 font-bold border border-amber-200 rounded-xl text-xs hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  VIP 회원으로 바로 체험하기
                </button>
              </div>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">성명 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">이메일 주소 <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">휴대폰 번호</label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호 <span className="text-rose-500">*</span></label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="6자리 이상"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호 확인 <span className="text-rose-500">*</span></label>
                  <input
                    type="password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    placeholder="비밀번호 재입력"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 text-xs space-y-1.5 text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input type="checkbox" required defaultChecked className="rounded text-slate-900" />
                  이용약관 및 개인정보 처리방침 동의 (필수)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-all shadow-md mt-2"
              >
                신규 회원가입 완료
              </button>
            </form>
          )}
        </div>
      ) : (
        /* 2. Authenticated State: Customer My Page Dashboard */
        <div className="space-y-8">
          {/* Welcome User Banner */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center text-2xl font-bold font-serif shadow-md">
                {currentUser?.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                    {currentUser?.membership}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{currentUser?.email} | 가입일 {currentUser?.joinedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-100 justify-around">
              <div className="text-center px-3 border-r border-slate-200">
                <span className="text-xs font-bold text-slate-400 block">보유 적립금</span>
                <span className="text-lg font-bold text-slate-900">{currentUser?.points.toLocaleString()} P</span>
              </div>
              <div className="text-center px-3">
                <span className="text-xs font-bold text-slate-400 block">할인 쿠폰</span>
                <span className="text-lg font-bold text-amber-800">{currentUser?.coupons} 장</span>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setMyPageSection('orders')}
              className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                myPageSection === 'orders'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              주문 / 배송 조회
            </button>
            <button
              onClick={() => setMyPageSection('wishlist')}
              className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                myPageSection === 'wishlist'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              찜한 상품 (Wishlist)
            </button>
            <button
              onClick={() => setMyPageSection('settings')}
              className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                myPageSection === 'settings'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
              내 정보 관리
            </button>
          </div>

          {/* My Page Content - Orders */}
          {myPageSection === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2">최근 주문 및 배송 현황</h3>
              {sampleOrders.map((ord) => (
                <div key={ord.orderId} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="flex items-center gap-4">
                    <img src={ord.image} alt={ord.productName} className="w-16 h-16 rounded-xl object-cover border border-slate-100" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-slate-400">{ord.orderId}</span>
                        <span className="text-xs text-slate-400">({ord.date})</span>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                          ord.status === '배송중' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{ord.productName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{ord.trackingNo} | 결제금액 {ord.price.toLocaleString()}원</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => alert(`[${ord.trackingNo}] 운송장 배송 추적 화면을 호출합니다.`)}
                      className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      배송 추적
                    </button>
                    <button
                      onClick={() => alert(`'${ord.productName}' 재주문이 장바구니에 담겼습니다.`)}
                      className="flex-1 md:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      재주문하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* My Page Content - Settings */}
          {myPageSection === 'settings' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">회원 정보 확인 및 관리</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">성명</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">{currentUser?.name}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">이메일 주소</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">{currentUser?.email}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">연락처</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">{currentUser?.phone}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">회원 등급</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-bold text-amber-800">{currentUser?.membership}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  로그아웃 (Sign Out)
                </button>
                <Link to="/" className="text-xs text-slate-500 hover:text-slate-900 font-bold">
                  쇼핑하러 돌아가기 ➡️
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
