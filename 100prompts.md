// ===== 100개 완전히 다른 스타일 =====
const TEMPLATES = [
// ========== 심플 (8) ==========
{ id: 'minimal', name: '미니멀 젠', category: '심플', style: { bg: '#FFFFFF', text: '#000000', accent: '#9ca3af', font: 'Helvetica Neue' },
mood: 'Apple 키노트, 무인양품(MUJI)', characteristics: ['여백 60% 이상', '요소 3개 이하', '무채색 기반', '얇은 산세리프'], texture: '없음 (순수 평면)', layoutGuide: '제목 정중앙, 위아래 얇은 구분선' },

{ id: 'monochrome', name: '블랙 & 화이트', category: '심플', style: { bg: '#000000', text: '#ffffff', accent: '#ffffff', font: 'DM Sans' },
mood: 'Karl Lagerfeld, 갤러리 도록', characteristics: ['순수 흑백', '강한 명암 대비', '대담한 타이포', '네거티브 스페이스'], texture: '미세 노이즈 5%', layoutGuide: '검정 배경 + 흰색 대문자, Bold 처리' },

{ id: 'nordic', name: '노르딕', category: '심플', style: { bg: '#F0F4F8', text: '#2d3748', accent: '#718096', font: 'Inter' },
mood: 'IKEA, 코펜하겐 인테리어', characteristics: ['파스텔 뮤트 톤', '둥근 모서리 8px', '자연광 느낌', '따뜻한 기능미'], texture: '린넨 텍스처 3%', layoutGuide: '좌측 정렬, 우상단 원형 장식' },

{ id: 'wireframe', name: '와이어프레임', category: '심플', style: { bg: '#1a202c', text: '#e2e8f0', accent: '#4299e1', font: 'Roboto Mono' },
mood: 'Figma 목업, UI 설계서', characteristics: ['점선 테두리', '플레이스홀더 박스', '모노스페이스', '청사진 그리드'], texture: '도트 그리드 20px', layoutGuide: '점선 프레임, [TITLE] 스타일' },

{ id: 'paper', name: '화이트 페이퍼', category: '심플', style: { bg: '#FAFAFA', text: '#374151', accent: '#6B7280', font: 'Georgia' },
mood: '학술 백서, 공식 문서', characteristics: ['깔끔한 여백', '세리프 본문', '미니멀 장식', '인쇄물 느낌'], texture: '종이 질감 2%', layoutGuide: '상단 제목, 하단 페이지 번호 스타일' },

{ id: 'muji', name: '무인양품', category: '심플', style: { bg: '#F5F5F0', text: '#4A4A4A', accent: '#8B7355', font: 'Noto Sans KR' },
mood: 'MUJI 카탈로그, 생활용품', characteristics: ['자연스러운 베이지', '군더더기 없음', '기능 중심', '차분한 톤'], texture: '크래프트 종이 hint', layoutGuide: '중앙 정렬, 최소한의 요소' },

{ id: 'zen', name: '젠 가든', category: '심플', style: { bg: '#F7F6F3', text: '#2C2C2C', accent: '#7C8B6F', font: 'Cormorant' },
mood: '일본 정원, 다도 문화', characteristics: ['비대칭 균형', '자연 모티프', '고요한 분위기', '세리프 우아함'], texture: '와시 종이 느낌', layoutGuide: '좌측 여백 크게, 우측에 제목' },

{ id: 'clean', name: '클린 모던', category: '심플', style: { bg: '#FFFFFF', text: '#1F2937', accent: '#3B82F6', font: 'SF Pro Display' },
mood: 'iOS 인터페이스, 테크 기업', characteristics: ['시스템 폰트', '파란 포인트', '카드 UI', '그림자 활용'], texture: '없음', layoutGuide: '카드 형태 중앙 배치' },

// ========== 모던 (10) ==========
{ id: 'cyberpunk', name: '네온 퓨처', category: '모던', style: { bg: '#050505', text: '#00ff9d', accent: '#ff00ff', font: 'Roboto Mono' },
mood: 'Blade Runner, CD Projekt', characteristics: ['네온 글로우', '어둠+형광', '글리치 효과', 'HUD 스타일'], texture: '스캔라인 2px', layoutGuide: '네온 글로우 blur 20px, 사이버 프레임' },

{ id: 'swiss', name: '스위스 스타일', category: '모던', style: { bg: '#ffffff', text: '#1a1a1a', accent: '#e11d48', font: 'Helvetica' },
mood: 'Helvetica 다큐, 국제 양식', characteristics: ['엄격한 그리드', '산세리프', '빨강/검정/흰색', '비대칭 균형'], texture: '없음', layoutGuide: '좌측 빨간 사각형, 그리드 라인 10%' },

{ id: 'glass', name: '글래스모피즘', category: '모던', style: { bg: '#E8EEF5', text: '#334155', accent: '#38bdf8', font: 'Inter' },
mood: 'iOS Big Sur, Windows 11', characteristics: ['반투명 blur 20px', '밝은 테두리', '그림자 레이어링', '그라데이션 배경'], texture: '프로스티드 글래스', layoutGuide: '중앙 글래스 카드, 그라데이션 메쉬 배경' },

{ id: 'neon', name: '네온 느와르', category: '모던', style: { bg: '#0f0f0f', text: '#f43f5e', accent: '#8b5cf6', font: 'Space Grotesk' },
mood: '홍콩 네온, 느와르 영화', characteristics: ['near black 배경', '핑크/퍼플/시안', '글로우 15px', '빈티지 무드'], texture: '도시 노이즈', layoutGuide: '더블 글로우, 하단 반사 효과' },

{ id: 'bauhaus', name: '바우하우스', category: '모던', style: { bg: '#f4f4f5', text: '#111', accent: '#eab308', font: 'Futura' },
mood: 'Bauhaus 포스터, 몬드리안', characteristics: ['원/삼각/사각', '빨강/노랑/파랑', '굵은 검정선', '기하학 구성'], texture: '없음', layoutGuide: '좌상단 빨간원, 우측 노란사각, 하단 파란바' },

{ id: 'gradient', name: '오로라 그라데이션', category: '모던', style: { bg: '#0F0F1A', text: '#FFFFFF', accent: '#A855F7', font: 'Outfit' },
mood: 'Stripe, Linear 웹사이트', characteristics: ['메쉬 그라데이션', '퍼플-블루-핑크', '부드러운 전환', '미래적 느낌'], texture: '메쉬 그라데이션', layoutGuide: '배경 전체 그라데이션, 흰색 텍스트' },

{ id: 'brutalism', name: '웹 브루탈리즘', category: '모던', style: { bg: '#FFFF00', text: '#000000', accent: '#FF0000', font: 'Times New Roman' },
mood: 'Bloomberg, 실험적 웹', characteristics: ['극단적 대비', '기본 폰트', '의도적 불편함', '원색 충돌'], texture: '없음', layoutGuide: '노란 배경에 검정 텍스트, 빨간 밑줄' },

{ id: 'neumorphism', name: '뉴모피즘', category: '모던', style: { bg: '#E0E5EC', text: '#2D3748', accent: '#4299E1', font: 'Poppins' },
mood: '소프트 UI, 3D 버튼', characteristics: ['볼록/오목 효과', '동일 배경색', '부드러운 그림자', '촉각적 느낌'], texture: '없음', layoutGuide: '볼록한 카드 효과, 부드러운 그림자' },

{ id: 'dark', name: '다크 모드', category: '모던', style: { bg: '#18181B', text: '#FAFAFA', accent: '#22D3EE', font: 'Inter' },
mood: 'GitHub Dark, VS Code', characteristics: ['다크 그레이 배경', '밝은 텍스트', '시안 강조', '눈 편안함'], texture: '없음', layoutGuide: '어두운 카드, 시안 포인트' },

{ id: 'memphis', name: '멤피스', category: '모던', style: { bg: '#FFE4E1', text: '#1A1A2E', accent: '#FF6B6B', font: 'Quicksand' },
mood: '80s 멤피스 디자인, 포스트모던', characteristics: ['기하학 패턴', '파스텔+원색', '물결/점/지그재그', '장난스러움'], texture: '기하학 패턴', layoutGuide: '배경에 도형 패턴, 중앙 제목' },

// ========== 비즈니스 (10) ==========
{ id: 'corporate', name: '코퍼레이트', category: '비즈니스', style: { bg: '#ffffff', text: '#0f172a', accent: '#0ea5e9', font: 'Inter' },
mood: 'McKinsey, LinkedIn', characteristics: ['깔끔한 차트', '파란색 신뢰감', '명확한 계층', '프로 사진'], texture: '없음', layoutGuide: '상단 컬러바, 중앙 제목, 하단 날짜' },

{ id: 'startup', name: '스타트업 피치', category: '비즈니스', style: { bg: '#fff', text: '#111', accent: '#6366F1', font: 'Pretendard' },
mood: 'Y Combinator, Airbnb 초기', characteristics: ['임팩트 숫자', '심플 아이콘', '에너지 컬러', '스토리텔링'], texture: '없음', layoutGuide: '"We are changing X" 한 문장 강조' },

{ id: 'finance', name: '파이낸스', category: '비즈니스', style: { bg: '#064e3b', text: '#ecfdf5', accent: '#34d399', font: 'Lato' },
mood: 'Bloomberg Terminal, 투자은행', characteristics: ['어두운 녹색/검정', '형광 녹색', '데이터 테이블', '차트 중심'], texture: '미세 그리드', layoutGuide: '좌측 세로바, 대문자 제목' },

{ id: 'medical', name: '메디컬 케어', category: '비즈니스', style: { bg: '#f0f9ff', text: '#0c4a6e', accent: '#0284c7', font: 'Nunito Sans' },
mood: 'WHO, Johns Hopkins', characteristics: ['청결 흰색/하늘색', '의료 아이콘', '신뢰 레이아웃', '명확한 데이터'], texture: '없음', layoutGuide: '상단 로고, 중앙 제목, + 심볼' },

{ id: 'realestate', name: '럭셔리 부동산', category: '비즈니스', style: { bg: '#1C1C1C', text: '#FFFFFF', accent: '#C9A962', font: 'Cormorant' },
mood: '고급 부동산, 건축 잡지', characteristics: ['넓은 사진', '골드 포인트', '미니멀 텍스트', '여백의 미'], texture: '대리석 hint', layoutGuide: '전체 이미지, 하단 골드 바' },

{ id: 'legal', name: '법률 문서', category: '비즈니스', style: { bg: '#FFFEF5', text: '#1F2937', accent: '#7C3AED', font: 'Garamond' },
mood: '로펌, 공식 계약서', characteristics: ['전통 세리프', '보수적 레이아웃', '권위적 컬러', '정돈된 여백'], texture: '양피지 hint', layoutGuide: '중앙 정렬, 상단 로고, 하단 날인' },

{ id: 'consulting', name: '컨설팅 리포트', category: '비즈니스', style: { bg: '#1E3A5F', text: '#FFFFFF', accent: '#00B4D8', font: 'Roboto' },
mood: 'BCG, Deloitte 보고서', characteristics: ['네이비 배경', '시안 강조', '데이터 시각화', '매트릭스 레이아웃'], texture: '없음', layoutGuide: '좌측 로고, 우측 제목, 하단 차트' },

{ id: 'tech', name: '테크 기업', category: '비즈니스', style: { bg: '#0A0A0A', text: '#FFFFFF', accent: '#00D084', font: 'SF Pro Display' },
mood: 'Apple 발표, Google I/O', characteristics: ['다크 배경', '그린 포인트', '대형 타이포', '제품 중심'], texture: '없음', layoutGuide: '중앙 대형 텍스트, 하단 부제' },

{ id: 'hr', name: 'HR/채용', category: '비즈니스', style: { bg: '#FDF4FF', text: '#581C87', accent: '#A855F7', font: 'Plus Jakarta Sans' },
mood: '채용 브로셔, 회사 소개', characteristics: ['따뜻한 퍼플', '사람 중심', '친근한 무드', '아이콘 활용'], texture: '없음', layoutGuide: '팀 사진 영역, 컬러풀 강조' },

{ id: 'retail', name: '리테일/커머스', category: '비즈니스', style: { bg: '#FFFFFF', text: '#111827', accent: '#EF4444', font: 'DM Sans' },
mood: 'Supreme, 패션 브랜드', characteristics: ['빨간 강조', '볼드 타이포', '제품 포커스', '그리드 레이아웃'], texture: '없음', layoutGuide: '빨간 박스 로고, 큰 제품 이미지' },

// ========== 내추럴 (8) ==========
{ id: 'forest', name: '포레스트', category: '내추럴', style: { bg: '#fcf9ee', text: '#2c3e2e', accent: '#567c5d', font: 'Merriweather' },
mood: 'National Geographic, 환경 다큐', characteristics: ['자연 녹색/갈색', '유기적 곡선', '손글씨 믹스', '에코 무드'], texture: '나뭇잎 패턴 subtle', layoutGuide: '자연 일러스트 프레임, 중앙 제목' },

{ id: 'space', name: '딥 스페이스', category: '내추럴', style: { bg: '#020617', text: '#e2e8f0', accent: '#6366f1', font: 'Orbitron' },
mood: 'NASA, Interstellar', characteristics: ['우주 검정/남색', '별/은하', '미래적 폰트', '빛나는 포인트'], texture: '별 필드', layoutGuide: '별 배경, 제목 글로우, 행성 장식' },

{ id: 'ocean', name: '딥 오션', category: '내추럴', style: { bg: '#0c4a6e', text: '#e0f2fe', accent: '#38bdf8', font: 'Montserrat' },
mood: 'Blue Planet, 해양 캠페인', characteristics: ['깊은 파랑 그라데이션', '물결 패턴', '투명감', '수중 느낌'], texture: 'caustics 효과', layoutGuide: '상단→하단 그라데이션, 파도 라인' },

{ id: 'desert', name: '사하라 듄', category: '내추럴', style: { bg: '#fff7ed', text: '#7c2d12', accent: '#ea580c', font: 'Lora' },
mood: 'Dune 영화, 사막 다큐', characteristics: ['오렌지/베이지', '모래 언덕 곡선', '강한 햇빛', '황금 그라데이션'], texture: '모래 노이즈', layoutGuide: '하단 언덕 실루엣, 상단 태양' },

{ id: 'aurora', name: '오로라', category: '내추럴', style: { bg: '#0F172A', text: '#F0FDF4', accent: '#4ADE80', font: 'Nunito' },
mood: '북유럽 오로라, 겨울밤', characteristics: ['그린-퍼플 오로라', '어두운 밤하늘', '신비로운 빛', '자연 현상'], texture: '오로라 그라데이션', layoutGuide: '상단 오로라 효과, 하단 실루엣' },

{ id: 'botanical', name: '보타니컬', category: '내추럴', style: { bg: '#FEFCE8', text: '#365314', accent: '#84CC16', font: 'Playfair Display' },
mood: '식물도감, 보태니컬 아트', characteristics: ['식물 일러스트', '빈티지 그린', '세밀한 디테일', '과학적 레이아웃'], texture: '오래된 종이', layoutGuide: '중앙 식물 일러스트, 라벨 스타일' },

{ id: 'mountain', name: '알파인', category: '내추럴', style: { bg: '#F1F5F9', text: '#0F172A', accent: '#0369A1', font: 'Montserrat' },
mood: '파타고니아, 등산 브랜드', characteristics: ['산 실루엣', '블루 그레이', '아웃도어 무드', '미니멀 자연'], texture: '없음', layoutGuide: '하단 산 실루엣, 상단 대형 텍스트' },

{ id: 'tropical', name: '트로피컬', category: '내추럴', style: { bg: '#ECFDF5', text: '#064E3B', accent: '#F59E0B', font: 'Varela Round' },
mood: '하와이, 열대 리조트', characteristics: ['야자수 패턴', '밝은 그린', '옐로우 포인트', '휴양지 무드'], texture: '열대 잎 패턴', layoutGuide: '모서리 야자수 장식, 중앙 제목' },

// ========== 럭셔리 (6) ==========
{ id: 'luxury', name: '골든 아워', category: '럭셔리', style: { bg: '#1c1917', text: '#fafaf9', accent: '#d4af37', font: 'Playfair Display' },
mood: 'Rolex, Louis Vuitton', characteristics: ['골드/블랙', '세리프 폰트', '얇은 골드 라인', '대칭 구성'], texture: '미세 노이즈', layoutGuide: '중앙 대칭, 위아래 골드 라인' },

{ id: 'editorial', name: '보그 에디토리얼', category: '럭셔리', style: { bg: '#f9fafb', text: '#18181b', accent: '#dc2626', font: 'Bodoni Moda' },
mood: 'Vogue, Harper\'s Bazaar', characteristics: ['대담한 타이포', '흑백+원포인트', '매거진 그리드', '사진 오버랩'], texture: '없음', layoutGuide: '대형 세리프 제목, 빨간 강조 점' },

{ id: 'jewelry', name: '다이아몬드', category: '럭셔리', style: { bg: '#1E1B4B', text: '#E0E7FF', accent: '#C084FC', font: 'Cinzel' },
mood: 'Tiffany, Cartier', characteristics: ['딥 퍼플/네이비', '보석 반짝임', '섬세한 디테일', '곡선 우아함'], texture: '벨벳+스파클', layoutGuide: '다이아몬드 프레임, 미세 파티클' },

{ id: 'champagne', name: '샴페인 골드', category: '럭셔리', style: { bg: '#FFFBEB', text: '#78350F', accent: '#D97706', font: 'Cormorant Garamond' },
mood: '웨딩, 셀러브레이션', characteristics: ['샴페인 골드', '우아한 서체', '버블 효과', '축하 무드'], texture: '미세 버블', layoutGuide: '아치 프레임, 골드 버블 장식' },

{ id: 'noir', name: '누아르', category: '럭셔리', style: { bg: '#000000', text: '#D4D4D8', accent: '#A1A1AA', font: 'Bebas Neue' },
mood: '고급 향수, 아트 하우스', characteristics: ['완전한 블랙', '실버 톤', '미스터리', '극적 조명'], texture: '필름 그레인', layoutGuide: '어둠 속 텍스트, 스팟 조명 효과' },

{ id: 'marble', name: '이탈리안 마블', category: '럭셔리', style: { bg: '#F5F5F5', text: '#1F2937', accent: '#9CA3AF', font: 'Libre Baskerville' },
mood: '럭셔리 호텔, 건축 명품', characteristics: ['대리석 텍스처', '그레이 톤', '클래식 세리프', '고급 소재감'], texture: '마블 패턴', layoutGuide: '마블 배경, 심플 중앙 텍스트' },

// ========== 레트로 (12) ==========
{ id: 'synthwave', name: '신스웨이브', category: '레트로', style: { bg: '#2e1065', text: '#f0abfc', accent: '#22d3ee', font: 'Righteous' },
mood: 'Miami Vice, Stranger Things', characteristics: ['네온 핑크/시안', '선셋 그라데이션', '크롬 텍스트', '야자수/그리드'], texture: 'VHS 노이즈', layoutGuide: '하단 그리드, 크롬 제목, 태양 실루엣' },

{ id: 'pixel', name: '8비트 아케이드', category: '레트로', style: { bg: '#18181b', text: '#4ade80', accent: '#fb7185', font: 'Press Start 2P' },
mood: '슈퍼마리오, 아케이드', characteristics: ['픽셀 폰트', '제한된 팔레트', '도트 그래픽', '게임 UI'], texture: '픽셀 그리드', layoutGuide: '"PRESS START", 스코어바, 픽셀 프레임' },

{ id: 'y2k', name: 'Y2K 퓨처', category: '레트로', style: { bg: '#e0e7ff', text: '#4338ca', accent: '#ec4899', font: 'Orbitron' },
mood: '2000년대 초, 초기 아이맥', characteristics: ['투명 플라스틱', '파스텔+메탈릭', '버블/별', '3D 광택'], texture: '글로시 그라데이션', layoutGuide: '광택 타이틀, 별/하트 장식' },

{ id: 'polaroid', name: '폴라로이드', category: '레트로', style: { bg: '#FFFEF5', text: '#44403C', accent: '#78716C', font: 'Caveat' },
mood: '인스탁스, 빈티지 앨범', characteristics: ['흰색 프레임', '바랜 색감', '손글씨 캡션', '필름 느낌'], texture: '종이+세피아', layoutGuide: '폴라로이드 프레임, 하단 손글씨' },

{ id: 'vinyl', name: '재즈 바이닐', category: '레트로', style: { bg: '#1C1917', text: '#FCA5A5', accent: '#F87171', font: 'Abril Fatface' },
mood: 'Blue Note, 70s 레코드', characteristics: ['따뜻한 아날로그', '레코드 원형', '빈티지 타이포', '노이즈/그레인'], texture: '비닐 그루브', layoutGuide: '레코드판 그래픽, 빈티지 서체' },

{ id: 'brutalist', name: '브루탈 콘크리트', category: '레트로', style: { bg: '#d1d5db', text: '#000', accent: '#525252', font: 'Archivo Black' },
mood: '콘크리트 건축, Raw HTML', characteristics: ['무거운 블록', '고대비 흑백', '거친 텍스처', '투박함'], texture: '콘크리트 노이즈', layoutGuide: '검정 블록 제목, 거친 회색 배경' },

{ id: 'vhs', name: 'VHS 글리치', category: '레트로', style: { bg: '#0D0D0D', text: '#FFFFFF', accent: '#FF00FF', font: 'VCR OSD Mono' },
mood: 'VHS 테이프, 글리치 아트', characteristics: ['RGB 분리', '스캔라인', '노이즈 왜곡', 'TV 에러'], texture: 'VHS 스캔라인', layoutGuide: 'RGB 분리 텍스트, 트래킹 에러' },

{ id: 'disco', name: '디스코 70s', category: '레트로', style: { bg: '#4A1942', text: '#FFD700', accent: '#FF69B4', font: 'Pacifico' },
mood: '디스코 클럽, Saturday Night Fever', characteristics: ['미러볼 반짝임', '골드/핑크', '그루비 폰트', '댄스 무드'], texture: '글리터 효과', layoutGuide: '미러볼 요소, 골드 제목' },

{ id: 'newspaper', name: '빈티지 신문', category: '레트로', style: { bg: '#F5F5DC', text: '#1A1A1A', accent: '#8B0000', font: 'Playfair Display' },
mood: '1920s 신문, 헤드라인', characteristics: ['세리프 헤드라인', '컬럼 레이아웃', '세피아 톤', '빨간 강조'], texture: '오래된 신문지', layoutGuide: '큰 헤드라인, 컬럼 구분선' },

{ id: 'psychedelic', name: '사이키델릭', category: '레트로', style: { bg: '#FF6B35', text: '#1A1A2E', accent: '#FFE66D', font: 'Rubik Mono One' },
mood: '60s 히피, 우드스톡', characteristics: ['물결치는 패턴', '강렬한 원색', '환각적 무드', '유기적 형태'], texture: '물결 패턴', layoutGuide: '물결치는 텍스트, 소용돌이 배경' },

{ id: 'art_deco', name: '아르데코', category: '레트로', style: { bg: '#1A1A2E', text: '#D4AF37', accent: '#C9A962', font: 'Poiret One' },
mood: '1920s 뉴욕, 개츠비', characteristics: ['기하학 패턴', '골드 라인', '대칭 구조', '럭셔리 빈티지'], texture: '기하학 패턴', layoutGuide: '아르데코 프레임, 골드 라인 장식' },

{ id: 'polaroid_grid', name: '폴라로이드 콜라주', category: '레트로', style: { bg: '#3D3D3D', text: '#FFFFFF', accent: '#F5F5F5', font: 'Indie Flower' },
mood: '추억 사진첩, 콜라주', characteristics: ['여러 프레임 겹침', '테이프 장식', '손글씨 라벨', '비정형 배치'], texture: '코르크 보드', layoutGuide: '겹친 폴라로이드들, 테이프 효과' },

// ========== 크리에이티브 (10) ==========
{ id: 'gallery', name: '모던 갤러리', category: '크리에이티브', style: { bg: '#f3f4f6', text: '#111827', accent: '#ec4899', font: 'Abril Fatface' },
mood: 'MoMA, 현대미술관', characteristics: ['여백과 오브제', '아티스틱 폰트', '비대칭 레이아웃', '컬러 팝'], texture: '캔버스 subtle', layoutGuide: '컬러 원형+타이틀 오버랩' },

{ id: 'vivid', name: '비비드 팝', category: '크리에이티브', style: { bg: '#facc15', text: '#000000', accent: '#2563eb', font: 'Poppins' },
mood: 'Andy Warhol, Keith Haring', characteristics: ['원색 대비', '굵은 아웃라인', '에너지 폭발', '반복 패턴'], texture: '하프톤 도트', layoutGuide: '노란 배경, 파란 원, 팝아트 스타일' },

{ id: 'graffiti', name: '스트릿 그래피티', category: '크리에이티브', style: { bg: '#111', text: '#facc15', accent: '#ec4899', font: 'Permanent Marker' },
mood: 'Banksy, 뉴욕 스트릿', characteristics: ['스프레이 효과', '거친 텍스처', '스텐실', '반항적 에너지'], texture: '벽돌 벽', layoutGuide: '스프레이 제목, 드립 효과' },

{ id: 'collage', name: '다다 콜라주', category: '크리에이티브', style: { bg: '#fef3c7', text: '#78350f', accent: '#d97706', font: 'Courier Prime' },
mood: '다다이즘, 잡지 콜라주', characteristics: ['오려붙인 종이', '폰트 믹스', '테이프/스티커', '레이어 겹침'], texture: '찢어진 종이', layoutGuide: '겹친 종이 조각, 잡지 스타일' },

{ id: 'watercolor', name: '수채화', category: '크리에이티브', style: { bg: '#FFFBF5', text: '#4A4A4A', accent: '#7C9EB2', font: 'Dancing Script' },
mood: '수채화 아트, 손그림 일러스트', characteristics: ['번지는 효과', '파스텔 물감', '손글씨 폰트', '부드러운 경계'], texture: '수채화 번짐', layoutGuide: '수채화 얼룩 배경, 손글씨 제목' },

{ id: 'neon_sign', name: '네온 사인', category: '크리에이티브', style: { bg: '#1A1A2E', text: '#FF6B6B', accent: '#4ECDC4', font: 'Pacifico' },
mood: '카페 네온, 밤거리 간판', characteristics: ['네온 튜브 느낌', '글로우 효과', '손글씨 스타일', '밤 분위기'], texture: '벽돌 배경', layoutGuide: '네온 튜브 텍스트, 온/오프 느낌' },

{ id: 'risograph', name: '리소그래프', category: '크리에이티브', style: { bg: '#FFF8E1', text: '#E65100', accent: '#1565C0', font: 'Space Mono' },
mood: '리소 프린트, 인디 포스터', characteristics: ['판화 느낌', '2-3색 레이어', '오프셋 효과', '그레인 텍스처'], texture: '리소 그레인', layoutGuide: '컬러 레이어 오프셋, 인쇄 느낌' },

{ id: 'abstract', name: '추상 미니멀', category: '크리에이티브', style: { bg: '#FAF5FF', text: '#1E1B4B', accent: '#7C3AED', font: 'Sora' },
mood: '추상화, 모던 아트', characteristics: ['기하학 형태', '비정형 도형', '퍼플 포인트', '여백 활용'], texture: '없음', layoutGuide: '추상 도형 배경, 심플 텍스트' },

{ id: 'comic', name: '아메리칸 코믹', category: '크리에이티브', style: { bg: '#FFF500', text: '#000000', accent: '#FF0000', font: 'Bangers' },
mood: 'Marvel/DC 코믹스', characteristics: ['하프톤 패턴', '말풍선', '액션 라인', '원색+검정'], texture: 'Ben-Day dots', layoutGuide: '폭발 효과, 굵은 테두리' },

{ id: 'sticker', name: '스티커 팩', category: '크리에이티브', style: { bg: '#E0F2FE', text: '#0C4A6E', accent: '#F472B6', font: 'Nunito' },
mood: '카카오 이모티콘, 스티커', characteristics: ['귀여운 일러스트', '둥근 외곽선', '파스텔 톤', '장난스러움'], texture: '없음', layoutGuide: '스티커 형태 요소들, 흩뿌린 배치' },

// ========== 학술 (6) ==========
{ id: 'academic', name: '학술 논문', category: '학술', style: { bg: '#fffbf0', text: '#3f3f46', accent: '#9f1239', font: 'Times New Roman' },
mood: 'Harvard 논문, Nature', characteristics: ['세리프 본문', '정돈된 여백', '각주 스타일', '절제된 컬러'], texture: '아이보리 종이', layoutGuide: '중앙 정렬 제목, 저자/기관 하단' },

{ id: 'history', name: '역사 문서', category: '학술', style: { bg: '#e5e5e5', text: '#451a03', accent: '#78350f', font: 'Noto Serif KR' },
mood: '고문서, 역사 다큐', characteristics: ['세피아 톤', '고풍 서체', '손상 효과', '문장 요소'], texture: '양피지 얼룩', layoutGuide: '양피지 배경, 테두리 장식' },

{ id: 'science', name: '사이언스 랩', category: '학술', style: { bg: '#0f172a', text: '#38bdf8', accent: '#22d3ee', font: 'Roboto' },
mood: 'MIT Media Lab, 과학 저널', characteristics: ['데이터 시각화', '회로/분자 모티프', '테크 블루', '정밀 그리드'], texture: '회로 패턴', layoutGuide: '다크 배경, 시안 강조, 분자 장식' },

{ id: 'math', name: '수학 공식', category: '학술', style: { bg: '#1E293B', text: '#F8FAFC', accent: '#38BDF8', font: 'JetBrains Mono' },
mood: '수학 교재, 칠판', characteristics: ['모노스페이스', '수식 레이아웃', '다크 배경', '분필 느낌'], texture: '칠판 텍스처', layoutGuide: '수식 중앙 배치, 분필 스타일' },

{ id: 'thesis', name: '학위논문', category: '학술', style: { bg: '#FFFFFF', text: '#1F2937', accent: '#1E40AF', font: 'Linux Libertine' },
mood: '대학원 논문, 학술 발표', characteristics: ['전통 학술 폰트', '넘버링 시스템', '각주/인용', '페이지 구조'], texture: '없음', layoutGuide: '논문 표지 형식, 대학 로고 위치' },

{ id: 'encyclopedia', name: '백과사전', category: '학술', style: { bg: '#F5F5DC', text: '#2F2F2F', accent: '#8B4513', font: 'Libre Baskerville' },
mood: '브리태니커, 도감', characteristics: ['다단 레이아웃', '삽화 스타일', '빈티지 학술', '크로스레퍼런스'], texture: '오래된 책', layoutGuide: '컬럼 레이아웃, 삽화 영역' },

// ========== 카툰 (8) ==========
{ id: 'cartoon', name: '팝 코믹스', category: '카툰', style: { bg: '#FFF500', text: '#000000', accent: '#FF0000', font: 'Comic Neue' },
mood: 'Marvel 코믹스, 만화책', characteristics: ['하프톤 패턴', '말풍선', '액션 라인', '원색+검정'], texture: 'Ben-Day dots', layoutGuide: '대각선 구도, 폭발 BOOM!' },

{ id: 'anime', name: '애니메이션', category: '카툰', style: { bg: '#fff', text: '#000', accent: '#db2777', font: 'Nunito' },
mood: '지브리, 일본 애니', characteristics: ['소프트 그라데이션', '빛나는 하이라이트', '파스텔+비비드', '동적 구도'], texture: '글로우 파티클', layoutGuide: '대각선 레이아웃, 반짝임 효과' },

{ id: 'clay', name: '클레이 3D', category: '카툰', style: { bg: '#f1f5f9', text: '#475569', accent: '#818cf8', font: 'Nunito' },
mood: '닌텐도 Kirby, 클레이 렌더', characteristics: ['부드러운 라운드', '파스텔 컬러', '소프트 그림자', '촉감적 느낌'], texture: '클레이 표면', layoutGuide: '둥근 3D 오브젝트, 파스텔 배경' },

{ id: 'lowpoly', name: '로우 폴리', category: '카툰', style: { bg: '#1e293b', text: '#e2e8f0', accent: '#14b8a6', font: 'Share Tech Mono' },
mood: 'Monument Valley, 폴리곤 아트', characteristics: ['삼각형 면', '플랫 셰이딩', '그라데이션 면', '기하학 풍경'], texture: '없음', layoutGuide: '로우폴리 배경, 면 처리 타이틀' },

{ id: 'chibi', name: '치비 캐릭터', category: '카툰', style: { bg: '#FFF0F5', text: '#1A1A2E', accent: '#FF69B4', font: 'Varela Round' },
mood: '귀여운 캐릭터, SD 캐릭터', characteristics: ['큰 머리 비율', '동글동글', '핑크 톤', '이모티콘 스타일'], texture: '없음', layoutGuide: '캐릭터 중심, 하트/별 장식' },

{ id: 'webtoon', name: '웹툰 스타일', category: '카툰', style: { bg: '#FFFFFF', text: '#000000', accent: '#FF5722', font: 'Nanum Gothic' },
mood: '네이버 웹툰, 디지털 만화', characteristics: ['깔끔한 선', '풀컬러', '스크롤 최적화', '현대적 만화'], texture: '없음', layoutGuide: '세로 스크롤 구도, 말풍선 배치' },

{ id: 'doodle', name: '두들 낙서', category: '카툰', style: { bg: '#FFFEF5', text: '#1F2937', accent: '#EF4444', font: 'Architects Daughter' },
mood: '노트 낙서, 손그림', characteristics: ['펜 스케치 느낌', '불완전한 선', '노트 배경', '화살표/별표'], texture: '노트 줄', layoutGuide: '노트 위 낙서 스타일' },

{ id: 'cartoon_retro', name: '빈티지 카툰', category: '카툰', style: { bg: '#FDF6E3', text: '#5C4033', accent: '#D2691E', font: 'Luckiest Guy' },
mood: '1930s 디즈니, 고전 애니', characteristics: ['고무호스 스타일', '세피아 톤', '빈티지 캐릭터', '필름 그레인'], texture: '오래된 필름', layoutGuide: '빈티지 프레임, 필름 스크래치' },

// ========== 테크니컬 (8) ==========
{ id: 'blueprint', name: '건축 청사진', category: '테크니컬', style: { bg: '#1e3a8a', text: '#ffffff', accent: '#93c5fd', font: 'Courier New' },
mood: '건축 설계도, CAD', characteristics: ['파란 배경+흰 라인', '기술 도면', '치수선/주석', '모노스페이스'], texture: '청사진 그리드', layoutGuide: '점선 테두리, 도면 제목 블록' },

{ id: 'circuit', name: 'PCB 회로', category: '테크니컬', style: { bg: '#064e3b', text: '#34d399', accent: '#fbbf24', font: 'Share Tech' },
mood: 'PCB 기판, 전자회로', characteristics: ['녹색/검정', '회로 패턴', '납땜 포인트', '부품 심볼'], texture: '회로 패턴', layoutGuide: '회로 라인이 제목 연결, LED 포인트' },

{ id: 'infographic', name: '인포그래픽', category: '테크니컬', style: { bg: '#f8fafc', text: '#334155', accent: '#6366f1', font: 'Roboto' },
mood: 'Google Material, 데이터 시각화', characteristics: ['플랫 아이콘', '밝은 컬러', '명확한 계층', '심플 차트'], texture: '없음', layoutGuide: '아이콘+제목 조합, 플랫 스타일' },

{ id: 'map', name: '지형 지도', category: '테크니컬', style: { bg: '#fff', text: '#4b5563', accent: '#ef4444', font: 'Inter' },
mood: 'National Geographic 지도', characteristics: ['등고선', '위치 마커', '경로 표시', '지도 컬러'], texture: '지형 패턴', layoutGuide: '지도 배경, 빨간 마커' },

{ id: 'dashboard', name: '대시보드 UI', category: '테크니컬', style: { bg: '#111827', text: '#F9FAFB', accent: '#10B981', font: 'Inter' },
mood: 'Grafana, 관제 시스템', characteristics: ['다크 UI', '실시간 데이터', '그래프 위젯', '상태 표시'], texture: '없음', layoutGuide: '카드 그리드, 숫자 강조' },

{ id: 'code', name: '코드 에디터', category: '테크니컬', style: { bg: '#1E1E1E', text: '#D4D4D4', accent: '#569CD6', font: 'Fira Code' },
mood: 'VS Code, 개발자 IDE', characteristics: ['모노스페이스', '신택스 하이라이팅', '다크 테마', '라인 넘버'], texture: '없음', layoutGuide: '코드 블록 스타일, 컬러 키워드' },

{ id: 'terminal', name: '터미널', category: '테크니컬', style: { bg: '#000000', text: '#00FF00', accent: '#00FF00', font: 'IBM Plex Mono' },
mood: 'Matrix, 해커 터미널', characteristics: ['검정 배경', '녹색 텍스트', '커서 깜빡임', '명령어 스타일'], texture: 'CRT 스캔라인', layoutGuide: '$ 프롬프트, 타이핑 효과' },

{ id: 'diagram', name: '플로우차트', category: '테크니컬', style: { bg: '#FFFFFF', text: '#374151', accent: '#3B82F6', font: 'Nunito Sans' },
mood: 'Miro, 프로세스 다이어그램', characteristics: ['도형 연결', '화살표 플로우', '컬러 노드', '명확한 구조'], texture: '없음', layoutGuide: '박스 연결, 화살표 흐름' },

// ========== 크래프트 (6) ==========
{ id: 'sketch', name: '스케치북', category: '크래프트', style: { bg: '#ffffff', text: '#57534e', accent: '#ef4444', font: 'Permanent Marker' },
mood: '디자이너 스케치북, 브레인스토밍', characteristics: ['연필/펜 드로잉', '거친 선', '메모/화살표', '낙서 느낌'], texture: '스케치북 종이', layoutGuide: '손글씨 제목, 동그라미/화살표 강조' },

{ id: 'vintage_paper', name: '빈티지 타자기', category: '크래프트', style: { bg: '#f5f5dc', text: '#4a4a4a', accent: '#8b4513', font: 'Courier Prime' },
mood: '오래된 타자기, 빈티지 문서', characteristics: ['타자기 폰트', '바랜 종이', '잉크 번짐', '스탬프'], texture: '오래된 종이+커피 얼룩', layoutGuide: '타자기체 제목, 문서 스탬프' },

{ id: 'origami', name: '종이접기', category: '크래프트', style: { bg: '#fff', text: '#333', accent: '#f97316', font: 'Quicksand' },
mood: '오리가미, 페이퍼아트', characteristics: ['종이 접힘', '그림자 입체감', '폴드 라인', '파스텔/화이트'], texture: '종이 질감', layoutGuide: '종이접기 형태, 그림자 표현' },

{ id: 'embroidery', name: '자수 패턴', category: '크래프트', style: { bg: '#FFFEF5', text: '#1F2937', accent: '#DC2626', font: 'Lora' },
mood: '십자수, 자수 공예', characteristics: ['스티치 패턴', '천 텍스처', '전통 문양', '수공예 느낌'], texture: '린넨 천', layoutGuide: '자수 프레임, 스티치 텍스트' },

{ id: 'woodblock', name: '목판화', category: '크래프트', style: { bg: '#FDF6E3', text: '#1A1A1A', accent: '#8B0000', font: 'Crimson Text' },
mood: '전통 목판 인쇄, 우키요에', characteristics: ['판화 텍스처', '제한된 색상', '강한 윤곽선', '전통 느낌'], texture: '나무결+잉크 번짐', layoutGuide: '목판 스타일 일러스트, 한자 느낌' },

{ id: 'letterpress', name: '활판 인쇄', category: '크래프트', style: { bg: '#F5F5F0', text: '#2D2D2D', accent: '#B8860B', font: 'Josefin Sans' },
mood: '활자 인쇄, 명함 프레스', characteristics: ['눌린 자국', '잉크 불균일', '클래식 타이포', '장인 느낌'], texture: '압인 효과', layoutGuide: '눌린 텍스트 효과, 심플 레이아웃' },

// ========== 재미 (8) ==========
{ id: 'secret', name: '1급 기밀', category: '재미', style: { bg: '#f3f3f3', text: '#000000', accent: '#ff0000', font: 'Special Elite' },
mood: 'CIA 문서, 스파이 영화', characteristics: ['검열 마킹', 'TOP SECRET 스탬프', '파일 폴더', '타자기 폰트'], texture: '오래된 서류', layoutGuide: '"TOP SECRET" 스탬프, 검열 바' },

{ id: 'warning', name: '위험 경고', category: '재미', style: { bg: '#fbbf24', text: '#000000', accent: '#000000', font: 'Bangers' },
mood: '공사장 경고, 위험 표지', characteristics: ['노랑/검정 줄무늬', '경고 아이콘', '대문자 볼드', '빨간 강조'], texture: '금속 표면', layoutGuide: '대각선 테두리, ⚠️ 아이콘' },

{ id: 'kid', name: '어린이 그림', category: '재미', style: { bg: '#fff', text: '#000', accent: '#f472b6', font: 'Comic Neue' },
mood: '그림일기, 초등학교 게시판', characteristics: ['크레용 느낌', '무지개 색', '귀여운 그림', '손글씨'], texture: '도화지', layoutGuide: '🌈⭐ 장식, 동글동글 글씨' },

{ id: 'bsod', name: '블루스크린', category: '재미', style: { bg: '#0000AA', text: '#FFFFFF', accent: '#FFFFFF', font: 'Courier Prime' },
mood: 'Windows 에러, 시스템 오류', characteristics: ['파란 배경 #0000AA', '흰색 고정폭', '에러 코드', '시스템 메시지'], texture: 'CRT 느낌', layoutGuide: 'BSOD 레이아웃, STOP 코드' },

{ id: 'win95', name: '윈도우 95', category: '재미', style: { bg: '#008080', text: '#000', accent: '#c0c0c0', font: 'MS Sans Serif' },
mood: 'Windows 95/98 UI', characteristics: ['회색 UI', '3D 버튼', '클래식 아이콘', '시스템 폰트'], texture: '없음', layoutGuide: '윈도우 타이틀바, 확인/취소 버튼' },

{ id: 'loading', name: '로딩 스크린', category: '재미', style: { bg: '#000000', text: '#FFFFFF', accent: '#00FF00', font: 'Press Start 2P' },
mood: 'PS1 로딩, 게임 부팅', characteristics: ['프로그레스 바', '팁 메시지', '게임 폰트', '대기 화면'], texture: '없음', layoutGuide: '로딩 바, "Please Wait" 메시지' },

{ id: 'receipt', name: '영수증', category: '재미', style: { bg: '#FFFEF5', text: '#000000', accent: '#000000', font: 'Courier New' },
mood: '마트 영수증, 주문서', characteristics: ['모노스페이스', '점선 구분', '가격 정렬', '열전사 느낌'], texture: '영수증 종이', layoutGuide: '영수증 형식, 가격 우측 정렬' },

{ id: 'meme', name: '밈 템플릿', category: '재미', style: { bg: '#FFFFFF', text: '#000000', accent: '#FF0000', font: 'Impact' },
mood: '인터넷 밈, SNS 짤', characteristics: ['Impact 폰트', '상단/하단 텍스트', '검정 외곽선', '강렬한 임팩트'], texture: '없음', layoutGuide: '상단 텍스트 + 하단 텍스트 구조' },
];

const CATEGORIES = ['전체', '심플', '모던', '비즈니스', '내추럴', '럭셔리', '레트로', '크리에이티브', '학술', '카툰', '테크니컬', '크래프트', '재미'];
