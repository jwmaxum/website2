import { FormEvent } from 'react';
import { Input } from './ui/Input';

export function LoginPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative Background Layer */}
      <div className="absolute inset-0 ambient-grid z-0"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply z-0" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgwj4YPsfqs9iMwiN5qSnRxdbtAIPlqpA4bFv-SLLUJOSW_Nrp_cBMPYwrY3HanwDRBGe4BxpoIXDUUuvdMK5UVCQchhDiT9mK6qhV6LNdrJiM4evYIi2VfXcX67xltoys17CV7265GsjRVIvVcFIpgE4QLfjfrS6FM30IEAkL1-hN94_YZonEIdmJ8VkO66kYuc8brBSfX1NN7hEhDzvR9RfPtTtP_6176yDMX8wvQNDiSuLk4Z2dzg')" }}
      ></div>

      {/* Login Card Canvas */}
      <div className="w-full max-w-md mx-4 md:mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
          
          {/* Card Header / Brand */}
          <div className="p-6 pb-4 flex flex-col items-center justify-center border-b border-surface-container border-opacity-50">
            <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center mb-4 shadow-sm ring-1 ring-outline-variant/30 overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Company Logo" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzdKFsdPnKcTZgizNUKNAQm4C7c0rxBrNMlB3K5hpuP-ZtI39somkJYvZ44418CAGbL_oNOOYdt8XvN0xntUda3uvRiJ7ClsESuUvSTvxQunbLKo_chpYgvscwiltagl-nk3eNRXa02lkJl6B4_pZWgWYXcljNDFz49O07dhycfXCfTqEtc38vlmTd0bJKETS9M_mviIM6bAh3DgLQkcfOqeoWpGwIjzFuMVamK28DEASUmEFHTskKTA" 
              />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-primary text-center">Company CMS</h1>
            <p className="text-sm font-normal text-on-surface-variant text-center mt-1">Secure Back-office Access</p>
          </div>

          {/* Form Body */}
          <form className="p-6 flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* ID Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="userId" className="text-sm font-semibold text-on-surface">ID</label>
              <Input 
                id="userId"
                name="userId"
                type="text"
                placeholder="Enter your employee ID"
                icon="badge"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-on-surface">Password</label>
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon="lock"
              />
            </div>

            {/* Actions / Options Row */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 border border-outline-variant rounded-sm bg-surface-bright peer-checked:bg-secondary peer-checked:border-secondary transition-colors group-hover:border-secondary"></div>
                  <span 
                    className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-on-secondary text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </div>
                <span className="text-sm font-normal text-on-surface-variant group-hover:text-on-surface transition-colors">Keep me logged in</span>
              </label>
              <a href="#" className="text-sm font-normal text-secondary hover:text-on-secondary-fixed-variant hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded-sm px-1">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              onClick={() => window.location.href = '/admin/dashboard'}
              className="mt-2 w-full py-3 px-6 bg-secondary text-on-secondary text-sm font-bold tracking-wide rounded-xl shadow-lg shadow-secondary/20 hover:bg-on-secondary-fixed-variant hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface-container-lowest active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Login
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          {/* Footer subtle text */}
          <div className="bg-surface px-6 py-3 border-t border-outline-variant/30 flex justify-center">
            <span className="text-[11px] font-medium text-outline flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">security</span>
              End-to-end encrypted connection
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
