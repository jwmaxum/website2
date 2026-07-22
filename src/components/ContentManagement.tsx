import { useState, useEffect, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { MediaPost, initialMediaPosts } from './MediaCenter';
import { FAQItem, CustomerInquiry, initialFAQs, initialInquiries } from '../types/SupportTypes';

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState<string>('전체');
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ & Inquiry States
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);

  // FAQ Modal state
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [faqCategory, setFaqCategory] = useState<FAQItem['category']>('배송/택배');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Inquiry Reply state
  const [replyingInquiry, setReplyingInquiry] = useState<CustomerInquiry | null>(null);
  const [replyText, setReplyText] = useState('');

  const tabs = ['전체', '공지사항', 'News Room', '자료실', 'FAQ 관리', '1:1 고객문의'];

  useEffect(() => {
    // Media Posts
    const savedPosts = localStorage.getItem('media_center_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(initialMediaPosts);
      }
    } else {
      setPosts(initialMediaPosts);
      localStorage.setItem('media_center_posts', JSON.stringify(initialMediaPosts));
    }

    // FAQs
    const savedFaqs = localStorage.getItem('support_faqs');
    if (savedFaqs) {
      try {
        setFaqs(JSON.parse(savedFaqs));
      } catch (e) {
        setFaqs(initialFAQs);
      }
    } else {
      setFaqs(initialFAQs);
      localStorage.setItem('support_faqs', JSON.stringify(initialFAQs));
    }

    // Inquiries
    const savedInq = localStorage.getItem('customer_inquiries');
    if (savedInq) {
      try {
        setInquiries(JSON.parse(savedInq));
      } catch (e) {
        setInquiries(initialInquiries);
      }
    } else {
      setInquiries(initialInquiries);
      localStorage.setItem('customer_inquiries', JSON.stringify(initialInquiries));
    }
  }, []);

  const savePosts = (newPosts: MediaPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('media_center_posts', JSON.stringify(newPosts));
  };

  const saveFaqs = (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
    localStorage.setItem('support_faqs', JSON.stringify(newFaqs));
  };

  const saveInquiries = (newInq: CustomerInquiry[]) => {
    setInquiries(newInq);
    localStorage.setItem('customer_inquiries', JSON.stringify(newInq));
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      const updated = posts.filter((p) => p.id !== id);
      savePosts(updated);
    }
  };

  // FAQ Modal Handlers
  const handleOpenFaqModal = (item?: FAQItem) => {
    if (item) {
      setEditingFaq(item);
      setFaqCategory(item.category);
      setFaqQuestion(item.question);
      setFaqAnswer(item.answer);
    } else {
      setEditingFaq(null);
      setFaqCategory('배송/택배');
      setFaqQuestion('');
      setFaqAnswer('');
    }
    setShowFaqModal(true);
  };

  const handleSaveFaq = (e: FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      alert('질문과 답변을 모두 입력해주세요.');
      return;
    }

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    if (editingFaq) {
      const updated = faqs.map((f) =>
        f.id === editingFaq.id
          ? { ...f, category: faqCategory, question: faqQuestion.trim(), answer: faqAnswer.trim() }
          : f
      );
      saveFaqs(updated);
    } else {
      const newFaq: FAQItem = {
        id: `faq-${Date.now()}`,
        category: faqCategory,
        question: faqQuestion.trim(),
        answer: faqAnswer.trim(),
        createdAt: dateStr,
      };
      saveFaqs([newFaq, ...faqs]);
    }

    setShowFaqModal(false);
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm('이 FAQ 질문 항목을 삭제하시겠습니까?')) {
      const updated = faqs.filter((f) => f.id !== id);
      saveFaqs(updated);
    }
  };

  // Inquiry Reply Handlers
  const handleSendReply = (inquiryId: string) => {
    if (!replyText.trim()) {
      alert('답변 내용을 입력해 주세요.');
      return;
    }

    const today = new Date();
    const formattedTime = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

    const updated = inquiries.map((inq) => {
      if (inq.id === inquiryId) {
        return {
          ...inq,
          status: '답변완료' as const,
          replyContent: replyText.trim(),
          repliedAt: formattedTime,
        };
      }
      return inq;
    });

    saveInquiries(updated);
    setReplyingInquiry(null);
    setReplyText('');
    alert('고객 1:1 문의 답변 처리가 완료되었습니다.');
  };

  const filteredPosts = posts.filter((p) => {
    const matchesTab = activeTab === '전체' || p.category === activeTab;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">콘텐츠 & 고객 센터 관리 (Content & Support Management)</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            미디어 센터 게시물 및 **자주 묻는 질문(FAQ) 등록**, **1:1 고객문의 답변 관리**를 총괄 수행합니다.
          </p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'FAQ 관리' ? (
            <button
              onClick={() => handleOpenFaqModal()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              신규 FAQ 등록
            </button>
          ) : (
            <NavLink
              to="/admin/content/new"
              className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              새 미디어 콘텐츠 등록
            </NavLink>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 border-b border-outline-variant overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-secondary text-secondary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab}
            {tab === 'FAQ 관리' && ` (${faqs.length})`}
            {tab === '1:1 고객문의' && ` (${inquiries.filter((i) => i.status === '접수완료').length}건 미처리)`}
            {tab !== 'FAQ 관리' && tab !== '1:1 고객문의' && tab !== '전체' && ` (${posts.filter((p) => p.category === tab).length})`}
          </button>
        ))}
      </div>

      {/* VIEW 1: Media Posts (공지사항 / News Room / 자료실 / 전체) */}
      {activeTab !== 'FAQ 관리' && activeTab !== '1:1 고객문의' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant flex items-center justify-between">
            <div className="relative w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="제목 또는 작성자 검색..."
                className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-sm focus:border-secondary outline-none"
              />
            </div>
            <span className="text-xs font-bold text-slate-500">총 {filteredPosts.length}건</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase border-b border-outline-variant">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">카테고리</th>
                  <th className="py-3.5 px-4 font-semibold">제목</th>
                  <th className="py-3.5 px-4 font-semibold">작성자</th>
                  <th className="py-3.5 px-4 font-semibold text-center">등록일</th>
                  <th className="py-3.5 px-4 font-semibold text-center">관리</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-outline-variant">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{post.title}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{post.author}</td>
                    <td className="py-3.5 px-4 text-center text-xs text-slate-400">{post.date}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="삭제"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: FAQ 관리 */}
      {activeTab === 'FAQ 관리' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">고객센터 FAQ 목록 ({faqs.length}개 항목)</span>
            <button
              onClick={() => handleOpenFaqModal()}
              className="px-3.5 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800 transition-colors"
            >
              + 새 FAQ 등록하기
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {faqs.map((f) => (
              <div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-900 rounded-full">
                      {f.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{f.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Q. {f.question}</h4>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-line">
                    A. {f.answer}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenFaqModal(f)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(f.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: 1:1 고객문의 답변 관리 */}
      {activeTab === '1:1 고객문의' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">고객 1:1 온라인 문의 내역 ({inquiries.length}건)</span>
          </div>

          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-800 rounded-full">
                      {inq.category}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{inq.subject}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                    inq.status === '답변완료' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status}
                  </span>
                </div>

                <div className="text-xs text-slate-500 flex justify-between">
                  <span>작성자: **{inq.customerName}** ({inq.customerEmail})</span>
                  <span>{inq.createdAt}</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-800 border border-slate-200">
                  <p className="font-bold text-slate-900 mb-1">💬 고객 문의 내용</p>
                  <p className="whitespace-pre-line">{inq.message}</p>
                </div>

                {inq.replyContent ? (
                  <div className="bg-emerald-50 p-4 rounded-xl text-xs text-emerald-950 border border-emerald-200 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-900">
                      <span>✅ 답변 완료 내용 (관리자)</span>
                      <span className="text-[11px] font-normal text-emerald-700">{inq.repliedAt}</span>
                    </div>
                    <p className="whitespace-pre-line">{inq.replyContent}</p>
                  </div>
                ) : replyingInquiry?.id === inq.id ? (
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 space-y-3">
                    <label className="block text-xs font-bold text-amber-900">1:1 문의 답변 작성</label>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="고객 이메일로 수신될 답변 내용을 상세히 입력하세요."
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs focus:outline-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setReplyingInquiry(null)}
                        className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleSendReply(inq.id)}
                        className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                      >
                        답변 등록 및 전송
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setReplyingInquiry(inq);
                      setReplyText('');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    ✏️ 답변 작성하기
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Add/Edit Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              {editingFaq ? 'FAQ 항목 수정' : '신규 FAQ 항목 등록'}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">카테고리</label>
                <select
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="배송/택배">배송/택배</option>
                  <option value="주문/결제">주문/결제</option>
                  <option value="취소/반품/교환">취소/반품/교환</option>
                  <option value="제품/성분">제품/성분</option>
                  <option value="회원/혜택">회원/혜택</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">질문 (Question)</label>
                <input
                  type="text"
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="자주 묻는 질문 내용 입력"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">답변 (Answer)</label>
                <textarea
                  rows={4}
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="친절하고 정확한 답변 내용을 입력하세요"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none"
                  required
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 shadow-md"
                >
                  {editingFaq ? '수정 완료' : '등록 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
