import { useState, useEffect } from 'react';

export function SiteManagement() {
  const [showShoppingMall, setShowShoppingMall] = useState(true);
  
  // CEO Message
  const [ceoTitle, setCeoTitle] = useState('자연의 지혜와 정성을 가득 담아 피부 본연의 아름다움을 선물합니다.');
  const [ceoContent, setCeoContent] = useState('안녕하십니까, 조선미녀(Beauty of Joseon) 대표이사입니다.\n\n저희 브랜드는 한방 화장품의 고루한 이미지를 탈피하여 현대인들이 부담 없이 스킨케어를 즐길 수 있도록 전통과 현대의 조화를 탐구해 왔습니다.\n\n조선 시대 여성들의 단아하고 기품 있는 피부 관리 방식을 현대적인 처방으로 재해석하여, 맑고 투명한 피부 본연의 힘을 되찾아 드리는 것이 저희의 사명입니다.\n\n언제나 좋은 원료와 정직한 제조를 바탕으로 고객 여러분의 신뢰에 보답하겠습니다. 늘 함께해 주셔서 감사합니다.');
  
  // Company Overview
  const [overviewMission, setOverviewMission] = useState('전통 한방 원료에 현대적 기술을 결합하여 현대인의 피부 고민을 덜어주는 클린 뷰티의 글로벌 스탠다드');
  const [overviewEstYear, setOverviewEstYear] = useState('2020');
  const [overviewEmployees, setOverviewEmployees] = useState('120');
  const [overviewGlobalOffices, setOverviewGlobalOffices] = useState('3');

  // Careers
  const [careerStatus, setCareerStatus] = useState('현재 마케팅 및 글로벌 영업 직군 채용이 활발하게 진행 중입니다.');
  const [careerPositions, setCareerPositions] = useState('• [신입/경력] 글로벌 브랜드 마케터 (영어가능자 필수)\n• [경력] 국내/해외 화장품 상품 기획자 (BM)\n• [신입/경력] 자사몰 퍼포먼스 마케팅 담당자');

  // Contact Us
  const [contactAddress, setContactAddress] = useState('서울특별시 종로구 율곡로 10길 (운니동, 한방빌딩 4층)');
  const [contactPhone, setContactPhone] = useState('02-1234-5678');
  const [contactEmail, setContactEmail] = useState('support@beautyofjoseon.com');

  // Load from localStorage on mount
  useEffect(() => {
    const savedShowMall = localStorage.getItem('show_shopping_mall');
    if (savedShowMall !== null) {
      setShowShoppingMall(JSON.parse(savedShowMall));
    }

    const savedCeoTitle = localStorage.getItem('site_ceo_title');
    if (savedCeoTitle) setCeoTitle(savedCeoTitle);

    const savedCeoContent = localStorage.getItem('site_ceo_content');
    if (savedCeoContent) setCeoContent(savedCeoContent);

    const savedOverviewMission = localStorage.getItem('site_overview_mission');
    if (savedOverviewMission) setOverviewMission(savedOverviewMission);

    const savedOverviewEstYear = localStorage.getItem('site_overview_est_year');
    if (savedOverviewEstYear) setOverviewEstYear(savedOverviewEstYear);

    const savedOverviewEmployees = localStorage.getItem('site_overview_employees');
    if (savedOverviewEmployees) setOverviewEmployees(savedOverviewEmployees);

    const savedOverviewGlobalOffices = localStorage.getItem('site_overview_global_offices');
    if (savedOverviewGlobalOffices) setOverviewGlobalOffices(savedOverviewGlobalOffices);

    const savedCareerStatus = localStorage.getItem('site_career_status');
    if (savedCareerStatus) setCareerStatus(savedCareerStatus);

    const savedCareerPositions = localStorage.getItem('site_career_positions');
    if (savedCareerPositions) setCareerPositions(savedCareerPositions);

    const savedContactAddress = localStorage.getItem('site_contact_address');
    if (savedContactAddress) setContactAddress(savedContactAddress);

    const savedContactPhone = localStorage.getItem('site_contact_phone');
    if (savedContactPhone) setContactPhone(savedContactPhone);

    const savedContactEmail = localStorage.getItem('site_contact_email');
    if (savedContactEmail) setContactEmail(savedContactEmail);
  }, []);

  const handleSave = () => {
    localStorage.setItem('show_shopping_mall', JSON.stringify(showShoppingMall));
    localStorage.setItem('site_ceo_title', ceoTitle);
    localStorage.setItem('site_ceo_content', ceoContent);
    localStorage.setItem('site_overview_mission', overviewMission);
    localStorage.setItem('site_overview_est_year', overviewEstYear);
    localStorage.setItem('site_overview_employees', overviewEmployees);
    localStorage.setItem('site_overview_global_offices', overviewGlobalOffices);
    localStorage.setItem('site_career_status', careerStatus);
    localStorage.setItem('site_career_positions', careerPositions);
    localStorage.setItem('site_contact_address', contactAddress);
    localStorage.setItem('site_contact_phone', contactPhone);
    localStorage.setItem('site_contact_email', contactEmail);

    alert('설정이 성공적으로 저장되었습니다!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">사이트 관리 (Site Management)</h2>
          <p className="text-sm text-on-surface-variant mt-1">공개 웹사이트의 메뉴 노출 및 회사 정보 페이지 내용을 설정합니다.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm"
        >
          설정 저장하기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: General Menu Configurations */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">기본 노출 설정</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-on-surface block">쇼핑몰 메뉴 노출</span>
                  <span className="text-xs text-on-surface-variant">공개 페이지에서 쇼핑몰(Shop) 관련 메뉴를 숨기거나 표시합니다.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showShoppingMall}
                    onChange={(e) => setShowShoppingMall(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">대표 연락처 설정 (Contact Us)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">회사 주소</label>
                <input
                  type="text"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">대표 전화번호</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">대표 이메일</label>
                <input
                  type="text"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Company Info Pages Editing */}
        <div className="lg:col-span-2 space-y-6">
          {/* CEO Message Edit */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">대표이사 인사말 설정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">인사말 핵심 헤드라인</label>
                <input
                  type="text"
                  value={ceoTitle}
                  onChange={(e) => setCeoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">인사말 본문 내용</label>
                <textarea
                  rows={6}
                  value={ceoContent}
                  onChange={(e) => setCeoContent(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Company Overview Edit */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">회사개요 설정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">브랜드 미션 (Mission)</label>
                <input
                  type="text"
                  value={overviewMission}
                  onChange={(e) => setOverviewMission(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">설립년도 (연도만)</label>
                  <input
                    type="text"
                    value={overviewEstYear}
                    onChange={(e) => setOverviewEstYear(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">임직원 수 (명)</label>
                  <input
                    type="text"
                    value={overviewEmployees}
                    onChange={(e) => setOverviewEmployees(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">글로벌 지사 수 (개)</label>
                  <input
                    type="text"
                    value={overviewGlobalOffices}
                    onChange={(e) => setOverviewGlobalOffices(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Careers Edit */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">채용정보 설정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">채용 현황 요약</label>
                <input
                  type="text"
                  value={careerStatus}
                  onChange={(e) => setCareerStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">모집 부문 리스트 (줄바꿈 구분)</label>
                <textarea
                  rows={4}
                  value={careerPositions}
                  onChange={(e) => setCareerPositions(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
