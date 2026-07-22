import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MediaPost, initialMediaPosts } from './MediaCenter';

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState<string>('전체');
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['전체', '공지사항', 'News Room', '자료실'];

  useEffect(() => {
    const saved = localStorage.getItem('media_center_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(initialMediaPosts);
      }
    } else {
      setPosts(initialMediaPosts);
      localStorage.setItem('media_center_posts', JSON.stringify(initialMediaPosts));
    }
  }, []);

  const savePosts = (newPosts: MediaPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('media_center_posts', JSON.stringify(newPosts));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      const updated = posts.filter(p => p.id !== id);
      savePosts(updated);
    }
  };

  const handlePriorityChange = (id: string, newPriority: number) => {
    const updated = posts.map(p => p.id === id ? { ...p, priority: newPriority } : p);
    savePosts(updated);
  };

  const filteredPosts = posts.filter(p => {
    const matchesTab = activeTab === '전체' || p.category === activeTab;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Content & Media Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">미디어 센터 게시물 및 공지사항 / News Room / 자료실 통합 관리</p>
        </div>
        <div className="flex gap-3">
          <NavLink to="/admin/content/new" className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            새 콘텐츠 등록 (New Content)
          </NavLink>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 border-b border-outline-variant overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab} {tab !== '전체' && `(${posts.filter(p => p.category === tab).length})`}
          </button>
        ))}
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목 또는 작성자 검색..." 
              className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant mr-2">Total {filteredPosts.length} items</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4 font-semibold w-24 text-center">우선순위 (Priority)</th>
                <th className="py-3 px-4 font-semibold">카테고리</th>
                <th className="py-3 px-4 font-semibold">제목 (Title)</th>
                <th className="py-3 px-4 font-semibold">첨부파일/유형</th>
                <th className="py-3 px-4 font-semibold">작성일</th>
                <th className="py-3 px-4 font-semibold text-center">조회수</th>
                <th className="py-3 px-4 font-semibold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-on-surface-variant text-sm">
                    등록된 게시물이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-4 text-center">
                      <select 
                        value={post.priority} 
                        onChange={(e) => handlePriorityChange(post.id, Number(e.target.value))}
                        className={`text-xs font-bold px-2 py-1 rounded border border-outline-variant ${
                          post.priority <= 3 ? 'bg-amber-100 text-amber-800 font-bold border-amber-300' : 'bg-white text-slate-700'
                        }`}
                      >
                        <option value={1}>★ 1위 (Top 1)</option>
                        <option value={2}>★ 2위 (Top 2)</option>
                        <option value={3}>★ 3위 (Top 3)</option>
                        <option value={4}>4위</option>
                        <option value={5}>5위</option>
                        <option value={6}>6위</option>
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                        post.category === '공지사항' 
                          ? 'bg-rose-100 text-rose-700' 
                          : post.category === 'News Room' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-medium text-on-surface max-w-xs truncate">
                      {post.title}
                    </td>

                    <td className="py-3 px-4 text-xs text-on-surface-variant">
                      {post.attachmentType ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {post.attachmentType === 'youtube' ? 'smart_display' : post.attachmentType === 'pdf' ? 'picture_as_pdf' : 'attachment'}
                          </span>
                          {post.attachmentName || post.attachmentType}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td className="py-3 px-4 text-xs text-on-surface-variant">{post.date}</td>
                    <td className="py-3 px-4 text-center text-xs text-on-surface-variant">{post.views}</td>

                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-on-surface-variant hover:text-rose-600 transition-colors"
                        title="게시물 삭제"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
