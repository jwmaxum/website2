import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaPost, initialMediaPosts } from './MediaCenter';

export function ContentRegistration() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'공지사항' | 'News Room' | '자료실'>('공지사항');
  const [priority, setPriority] = useState<number>(1);
  const [content, setContent] = useState('');
  const [attachmentType, setAttachmentType] = useState<'youtube' | 'pdf' | 'image' | 'file'>('youtube');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    // Helper to transform standard YouTube link to embed link with autoplay
    let finalAttachmentUrl = attachmentUrl;
    if (attachmentType === 'youtube' && attachmentUrl.includes('watch?v=')) {
      const videoId = attachmentUrl.split('watch?v=')[1]?.split('&')[0];
      if (videoId) {
        finalAttachmentUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
      }
    }

    const newPost: MediaPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      category,
      content: content || title,
      date: formattedDate,
      priority: Number(priority),
      isPinned: Number(priority) <= 3,
      author: '관리자 (Admin)',
      views: 1,
      attachmentType,
      attachmentUrl: finalAttachmentUrl,
      attachmentName: attachmentName || (attachmentType === 'youtube' ? '유튜브 영상 자료' : '첨부 파일'),
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    };

    const saved = localStorage.getItem('media_center_posts');
    let postsList: MediaPost[] = initialMediaPosts;
    if (saved) {
      try {
        postsList = JSON.parse(saved);
      } catch (e) {
        postsList = initialMediaPosts;
      }
    }

    const updatedPosts = [newPost, ...postsList];
    localStorage.setItem('media_center_posts', JSON.stringify(updatedPosts));

    alert('게시물이 성공적으로 등록되었습니다.');
    navigate('/admin/content');
  };

  return (
    <form onSubmit={handlePublish} className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">미디어 콘텐츠 등록 (New Media Entry)</h2>
          <p className="text-sm text-on-surface-variant mt-1">미디어 센터(공지사항, News Room, 자료실) 게시물을 새로 등록합니다.</p>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => navigate('/admin/content')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
          >
            취소 (Cancel)
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm"
          >
            게시물 등록 (Publish)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Form Area */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant space-y-4">
            <h3 className="text-lg font-semibold text-on-surface">기본 정보</h3>
            
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">게시물 제목 <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm" 
                placeholder="게시물 제목을 입력하세요" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">카테고리 선택</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm font-medium"
                >
                  <option value="공지사항">공지사항 (Notice)</option>
                  <option value="News Room">News Room</option>
                  <option value="자료실">자료실 (Resources)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">상단 노출 순위 (Priority)</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm font-medium"
                >
                  <option value={1}>★ 1위 (Top 1 - 최상단 고정)</option>
                  <option value={2}>★ 2위 (Top 2 - 상단 고정)</option>
                  <option value={3}>★ 3위 (Top 3 - 상단 고정)</option>
                  <option value={4}>4위 (일반 목록)</option>
                  <option value={5}>5위 (일반 목록)</option>
                </select>
              </div>
            </div>
          </div>

          {/* HTML Content Body */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant space-y-3">
            <h3 className="text-lg font-semibold text-on-surface">게시물 본문 내용 (HTML/텍스트 작성)</h3>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시물 본문 내용을 작성하세요. HTML 태그 또는 일반 텍스트 작성이 가능합니다."
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-secondary text-sm resize-none"
            />
          </div>

          {/* Attachments Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant space-y-4">
            <h3 className="text-lg font-semibold text-on-surface">첨부 자료 및 영상 설정</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">첨부 유형</label>
                <select 
                  value={attachmentType}
                  onChange={(e) => setAttachmentType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm"
                >
                  <option value="youtube">유튜브 영상 (YouTube URL)</option>
                  <option value="pdf">PDF 문서 (PDF File)</option>
                  <option value="image">이미지 (Image)</option>
                  <option value="file">일반 첨부파일 (Zip/Doc)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">첨부파일명 / 표시제목</label>
                <input 
                  type="text" 
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="예: 2026_조선미녀_소개서.pdf"
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">첨부 URL / YouTube URL (자동재생 설정됨)</label>
              <input 
                type="text" 
                value={attachmentUrl}
                onChange={(e) => setAttachmentUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/... 또는 파일 다운로드 링크"
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm"
              />
              <p className="text-xs text-on-surface-variant mt-1">※ 유튜브 링크 입력 시 모달 팝업 및 상세 화면에서 **자동재생 (Autoplay)** 처리됩니다.</p>
            </div>
          </div>
          
        </div>

        {/* Sidebar Options */}
        <div className="space-y-6">
          {/* Thumbnail Image */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant space-y-3">
            <h3 className="text-lg font-semibold text-on-surface">대표 썸네일 이미지 URL</h3>
            <input 
              type="text" 
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs"
            />
            {thumbnailUrl && (
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mt-2">
                <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
