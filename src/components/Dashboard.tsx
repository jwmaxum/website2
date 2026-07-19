import { ReactNode } from 'react';

// Helper component for KPI cards
function StatCard({ title, value, icon, trend, trendUp = true, color = 'bg-white' }: { title: string, value: string, icon: string, trend?: string, trendUp?: boolean, color?: string }) {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border border-outline-variant flex flex-col justify-between ${color}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-on-surface-variant">{title}</span>
        <span className="material-symbols-outlined text-outline text-[20px]">{icon}</span>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-on-surface">{value}</h3>
        {trend && (
          <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${trendUp ? 'text-emerald-600' : 'text-rose-500'}`}>
            <span className="material-symbols-outlined text-[14px]">
              {trendUp ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Dashboard</h2>
          <p className="text-sm text-on-surface-variant mt-1">Real-time system metrics and pending actions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        <StatCard title="오늘 방문자" value="1,250" icon="visibility" trend="+12%" trendUp={true} />
        <StatCard title="오늘 주문" value="18" icon="shopping_bag" trend="+3%" trendUp={true} />
        <StatCard title="신규회원" value="4" icon="person_add" trend="-2%" trendUp={false} />
        <div className="p-6 rounded-2xl shadow-sm border border-secondary/20 bg-secondary/5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-secondary">답변대기 문의</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">forum</span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-on-surface">6</h3>
            <span className="px-2 py-1 rounded-md bg-secondary text-white text-[10px] font-bold uppercase tracking-wider">Action Req.</span>
          </div>
        </div>
        <StatCard title="배송준비" value="12" icon="local_shipping" />
        <div className="p-6 rounded-2xl shadow-sm border border-rose-200 bg-rose-50 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-rose-600">재고부족</span>
            <span className="material-symbols-outlined text-rose-600 text-[20px]">warning</span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-on-surface">2</h3>
            <span className="px-2 py-1 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">Critical</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-semibold text-on-surface">최근 주문 (Recent Orders)</h3>
              <button className="text-secondary text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container text-on-surface-variant text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Order ID</th>
                    <th className="py-3 px-5 font-semibold">Customer</th>
                    <th className="py-3 px-5 font-semibold">Amount</th>
                    <th className="py-3 px-5 font-semibold">Status</th>
                    <th className="py-3 px-5 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 px-5 font-medium">#ORD-0921</td>
                    <td className="py-4 px-5">Alex Morgan</td>
                    <td className="py-4 px-5">$1,250.00</td>
                    <td className="py-4 px-5"><span className="inline-flex px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">결제완료</span></td>
                    <td className="py-4 px-5 text-right text-on-surface-variant">Today, 10:42 AM</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 px-5 font-medium">#ORD-0920</td>
                    <td className="py-4 px-5">Jordan Lee</td>
                    <td className="py-4 px-5">$340.50</td>
                    <td className="py-4 px-5"><span className="inline-flex px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-medium">상품준비중</span></td>
                    <td className="py-4 px-5 text-right text-on-surface-variant">Today, 09:15 AM</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 px-5 font-medium">#ORD-0919</td>
                    <td className="py-4 px-5">Taylor Smith</td>
                    <td className="py-4 px-5">$89.99</td>
                    <td className="py-4 px-5"><span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">배송완료</span></td>
                    <td className="py-4 px-5 text-right text-on-surface-variant">Yesterday</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-semibold text-on-surface flex items-center gap-2">
                최근 문의 (Recent Inquiries)
                <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">6 New</span>
              </h3>
            </div>
            <div className="flex flex-col divide-y divide-outline-variant">
              <div className="p-5 hover:bg-surface-container-low transition-colors flex gap-4 items-start cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-sm">MR</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold text-on-surface truncate group-hover:text-secondary transition-colors">제품 배송이 언제되나요?</h4>
                    <span className="text-xs text-on-surface-variant shrink-0 ml-2">10 mins ago</span>
                  </div>
                  <p className="text-sm text-on-surface-variant truncate">어제 주문한 상품인데 배송 조회가 안되네요. 확인 부탁드립니다...</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></span>
              </div>
              <div className="p-5 hover:bg-surface-container-low transition-colors flex gap-4 items-start cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold text-sm">KL</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold text-on-surface truncate group-hover:text-secondary transition-colors">대량 구매 문의</h4>
                    <span className="text-xs text-on-surface-variant shrink-0 ml-2">1 hr ago</span>
                  </div>
                  <p className="text-sm text-on-surface-variant truncate">안녕하세요, 기업 사은품으로 100개 세트를 구매하려고 합니다. 견적서...</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Narrower) */}
        <div className="flex flex-col gap-8">
          
          {/* Notices Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
            <h3 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary">campaign</span> 
              공지사항 (Notices)
            </h3>
            <div className="bg-surface-container-low rounded-xl p-4 text-sm border border-outline-variant border-dashed">
              <p className="mb-2 font-semibold">시스템 정기 점검 안내</p>
              <p className="text-on-surface-variant text-sm">내일 새벽 2시부터 4시까지 데이터베이스 최적화 작업이 진행됩니다.</p>
              <div className="mt-4 text-right">
                <span className="text-xs text-outline font-medium">- System Admin</span>
              </div>
            </div>
          </div>

          {/* System Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant p-6 flex-1">
            <h3 className="font-semibold text-on-surface mb-6">최근 시스템 로그 (Logs)</h3>
            <div className="relative pl-4 border-l border-outline-variant space-y-6">
              
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-white"></div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">10:45 AM</p>
                <p className="text-sm text-on-surface">Admin 'super_admin' logged in.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">09:12 AM</p>
                <p className="text-sm text-on-surface">상품 'AETERNO Cream' 정보 수정 완료.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-white"></div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">08:03 AM</p>
                <p className="text-sm text-on-surface">결제 모듈(PG) API 연동 오류 발생.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">01:00 AM</p>
                <p className="text-sm text-on-surface">자동 데이터베이스 백업 완료.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
