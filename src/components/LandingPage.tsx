import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="mt-8 mb-16 w-full h-[60vh] md:h-[80vh] relative flex items-center border border-slate-200 overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida/AP1WRLtwbpLR0OrlYn4dNF3tqH_42Aj4oMGBojFifs3u0hC1FGVJZitGN2H2vJNH1c97S7473i6ycdPbD_oUZX62wI6GTJ1I1j-ciBWMH2LJbHk7cg857jBsi8xSaC4_CC-BiNnzLXvoDdX0ZNA3FCreYP-RqDDvMK303JTP_8bfq00cq1N3lfOZSvC6TBZUzvitSmd7HwqfQx86VqCwSGclWFvuVNUBajQAdv3Lz24O1rZQa8G148-0AD7JvROx" 
          alt="Hero Banner" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        <div className="relative z-10 p-8 md:p-16 max-w-lg bg-white/70 backdrop-blur-md border border-white/50 ml-4 md:ml-12 mt-12 md:mt-0 shadow-sm">
          <span className="inline-block text-xs font-semibold text-slate-600 tracking-widest uppercase mb-4">New Arrival</span>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">무결점 피부<br/>모공탄력 세럼</h1>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">빈틈없이 매끈한 무결점 피부 붉은팥 PDRN 모공탄력 세럼. 비건 펩타이드의 시너지로 밀착 탄력 케어.</p>
          <Link to="#" className="inline-block bg-slate-900 text-white text-sm font-bold px-8 py-4 uppercase tracking-widest hover:bg-slate-700 transition-colors">
            Discover Now
          </Link>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="mb-24">
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900">Best Sellers</h2>
          <Link to="#" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
            More View +
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product 1 */}
          <article className="group cursor-pointer">
            <div className="w-full aspect-[3/4] bg-white mb-4 relative overflow-hidden flex items-center justify-center border border-slate-100">
              <img 
                src="https://lh3.googleusercontent.com/aida/AP1WRLtsVqrSDMr5Hp64St34s8zOuQMwoQkxb_mpUI1fs4_2dB2UmUWby6gENUgL-jXfMej03GSR4NqFXKFf0OBWAGI2wJEX3OrSBqoUAQ0S_GzTp6JR3QNdI56t1gi0j2IsgFHVIqQHpFrmBPRSExV_9yqYXUysdrMV6j46vU4JO4cESKH_0HUMLa1XhrvVZ1We1fVi1nB3DZyflXa7qWQ9AhYRsp9B-s9p6On59kcaVEus1ayOmxiUCE28C0c3" 
                alt="Product 1" 
                className="w-3/4 h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="text-center md:text-left px-2">
              <h3 className="text-base text-slate-900 font-medium mb-1 line-clamp-2">맑은쌀선크림 : 쌀추출물+나이아시나마이드 (SPF 50+ PA++++)</h3>
              <p className="text-sm text-slate-500">18,000원</p>
            </div>
          </article>

          {/* Product 2 */}
          <article className="group cursor-pointer">
            <div className="w-full aspect-[3/4] bg-white mb-4 relative overflow-hidden flex items-center justify-center border border-slate-100">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase">Best</span>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida/AP1WRLsTDIbMW4ORIttbx7LcQBhQqCx3rUQzDZ0rKkTJlESxSyUuepvECQSxUULhXCS4f8eXC7CQU5meNhFXxQdr1h9C_ivcvf5ngHZ3ygsQcf7vhSkmFUoWkmjXwZiXVW-Em_EcgJHqx2tAbXrzXneCVMxbRmehlH_19d_zScE8wQggEYpVLob70lv2GXaObDHGs1-VBNQ77JCsoI1ZQUWF02rRduDfDoGx2sjn-WrTEFk5h98TEj0t0r53bBPW" 
                alt="Product 2" 
                className="w-3/4 h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="text-center md:text-left px-2">
              <h3 className="text-base text-slate-900 font-medium mb-1 line-clamp-2">조선미녀 인삼 탄력 크림 60ml</h3>
              <p className="text-sm text-slate-500">24,000원</p>
            </div>
          </article>

          {/* Product 3 */}
          <article className="group cursor-pointer">
            <div className="w-full aspect-[3/4] bg-white mb-4 relative overflow-hidden flex items-center justify-center border border-slate-100">
              <img 
                src="https://lh3.googleusercontent.com/aida/AP1WRLuFct-ui2RnjkMJUwltrg1fdnrwyLkZxjjYRtFWXTCib50VZ1HtAwR8fGW2yTTkpf3hR_VK-NQfztsSELjuwbfQ0vYMsGphGqaGA5PzRMKW8l7BkMV27t2NhgFaC9orJzzADHciOruVLh1WTxOnP4eFQY5gNuUyvbpQZkPTvk76g7pdHvOmUULeBMgemezDTK-STJEotnwLg1ARxE-uMKGL8s6W2M9vY58z2WYHdKRcrUyYLux-4nv0jw2f" 
                alt="Product 3" 
                className="w-3/4 h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="text-center md:text-left px-2">
              <h3 className="text-base text-slate-900 font-medium mb-1 line-clamp-2">인삼선세럼 (SPF 50+ PA++++)</h3>
              <p className="text-sm text-slate-500">21,000원</p>
            </div>
          </article>
        </div>
      </section>

      {/* Brand Story Bento/Asymmetric */}
      <section className="mb-16 border-t border-slate-200 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 pr-0 lg:pr-8">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">Blend heritage,<br/>Create beauty.</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We create inspired skincare that's unique to your routine, gentle on skin, and always effective. Rooted in the traditional Hanbang ingredients favored during the Joseon Dynasty, reinterpreted with modern science for today's serene efficacy.
            </p>
            <Link to="#" className="inline-flex items-center gap-2 border-b border-slate-900 pb-1 text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors uppercase tracking-widest">
              <span>Read Brand Story</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
            </Link>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2 bg-slate-100 min-h-[400px] lg:min-h-[500px] relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-white opacity-50"></div>
            <div className="absolute inset-4 border border-slate-300 flex flex-col justify-center items-center p-8 text-center bg-white/40 backdrop-blur-sm">
              <span className="text-3xl font-serif text-slate-800 mb-4">朝鮮美女</span>
              <p className="text-base text-slate-500 italic max-w-md">"Quiet elegance, profound efficacy."</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
