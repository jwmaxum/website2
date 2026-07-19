import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState('공지사항');
  const tabs = ['공지사항', 'FAQ', '보도자료', '갤러리', '자료실', '동영상', '팝업', '배너'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Content Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage all website posts and publications.</p>
        </div>
        <div className="flex gap-3">
          <NavLink to="/content/new" className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            새 콘텐츠 등록 (New Content)
          </NavLink>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-outline-variant overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters (CMS Common feature) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select className="px-3 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary">
            <option>전체 상태 (All Status)</option>
            <option>게시중 (Published)</option>
            <option>임시저장 (Draft)</option>
            <option>숨김 (Hidden)</option>
          </select>
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="제목, 작성자 검색..." 
              className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs text-on-surface-variant mr-2">Total 42 items</span>
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
          </button>
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4 w-12 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></th>
                <th className="py-3 px-4 font-semibold">제목 (Title)</th>
                <th className="py-3 px-4 font-semibold">작성자 (Author)</th>
                <th className="py-3 px-4 font-semibold">작성일 (Created At)</th>
                <th className="py-3 px-4 font-semibold text-center">조회수 (Views)</th>
                <th className="py-3 px-4 font-semibold text-center">게시상태 (Status)</th>
                <th className="py-3 px-4 font-semibold text-right">관리 (Manage)</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              
              <tr className="hover:bg-surface-container-low/50 transition-colors bg-blue-50/30">
                <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></td>
                <td className="py-3 px-4 font-medium flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold">공지</span>
                  시스템 정기 점검 안내 (11/5)
                </td>
                <td className="py-3 px-4 text-on-surface-variant">System Admin</td>
                <td className="py-3 px-4 text-on-surface-variant">2023.10.27</td>
                <td className="py-3 px-4 text-center text-on-surface-variant">1,240</td>
                <td className="py-3 px-4 text-center"><span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">게시중</span></td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1.5 text-on-surface-variant hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-1.5 text-on-surface-variant hover:text-rose-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </td>
              </tr>
              
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></td>
                <td className="py-3 px-4 font-medium">신규 브랜드 런칭 이벤트 공지</td>
                <td className="py-3 px-4 text-on-surface-variant">Marketing Team</td>
                <td className="py-3 px-4 text-on-surface-variant">2023.10.25</td>
                <td className="py-3 px-4 text-center text-on-surface-variant">856</td>
                <td className="py-3 px-4 text-center"><span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">게시중</span></td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1.5 text-on-surface-variant hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-1.5 text-on-surface-variant hover:text-rose-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></td>
                <td className="py-3 px-4 font-medium text-on-surface-variant">2023년 하반기 채용 안내</td>
                <td className="py-3 px-4 text-on-surface-variant">HR Team</td>
                <td className="py-3 px-4 text-on-surface-variant">2023.10.20</td>
                <td className="py-3 px-4 text-center text-on-surface-variant">-</td>
                <td className="py-3 px-4 text-center"><span className="inline-flex px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">임시저장</span></td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1.5 text-on-surface-variant hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-1.5 text-on-surface-variant hover:text-rose-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low/30">
          <span className="text-xs text-on-surface-variant">Showing 1 to 10 of 42 entries</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant disabled:opacity-50" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="w-8 h-8 rounded-md bg-secondary text-white text-sm font-medium flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container text-on-surface text-sm font-medium flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container text-on-surface text-sm font-medium flex items-center justify-center transition-colors">3</button>
            <span className="px-1 text-on-surface-variant">...</span>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container text-on-surface text-sm font-medium flex items-center justify-center transition-colors">5</button>
            <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
