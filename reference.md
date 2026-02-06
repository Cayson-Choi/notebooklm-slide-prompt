import React, { useMemo, useState } from 'react';
import { Grid3X3, Layers, ExternalLink, Search } from 'lucide-react';

/\*\*

- ✅ NotebookLMBuilder (Refined)
- - 템플릿 자동 생성(최대 100) + 유사 템플릿 자동 통합(클러스터링)
- - 템플릿 선택 시: 프롬프트 + 예제 슬라이드(실제 화면) 미리보기 제공
    \*/

// ✅ 10개만 남긴 "대표" 템플릿 (중복/유사 스타일 제거)
// - 너무 비슷한 자동 생성 템플릿 제거
// - 각 카테고리에서 성격이 확실히 다른 것만 선별

const TEMPLATES = [
{
id: 'minimal',
name: '미니멀 젠',
category: '심플',
style: { bg: '#FFFFFF', text: '#000000', accent: '#9ca3af', font: 'Helvetica Neue' },
mood: 'Apple 키노트, 무인양품(MUJI)',
characteristics: ['여백 60% 이상', '요소 3개 이하', '무채색 기반', '얇은 산세리프'],
texture: '없음 (순수 평면)',
layoutGuide: '제목 정중앙, 위아래 얇은 구분선',
},
{
id: 'monochrome',
name: '블랙 & 화이트',
category: '심플',
style: { bg: '#000000', text: '#ffffff', accent: '#ffffff', font: 'DM Sans' },
mood: 'Karl Lagerfeld, 갤러리 도록',
characteristics: ['순수 흑백', '강한 명암 대비', '대담한 타이포', '네거티브 스페이스'],
texture: '미세 노이즈 5%',
layoutGuide: '검정 배경 + 흰색 대문자, Bold 처리',
},
{
id: 'glass',
name: '글래스모피즘',
category: '모던',
style: { bg: '#E8EEF5', text: '#334155', accent: '#38bdf8', font: 'Inter' },
mood: 'iOS Big Sur, Windows 11',
characteristics: ['반투명 blur 20px', '밝은 테두리', '그림자 레이어링', '그라데이션 배경'],
texture: '프로스티드 글래스',
layoutGuide: '중앙 글래스 카드, 그라데이션 메쉬 배경',
},
{
id: 'cyberpunk',
name: '네온 퓨처',
category: '모던',
style: { bg: '#050505', text: '#00ff9d', accent: '#ff00ff', font: 'Roboto Mono' },
mood: 'Blade Runner, CD Projekt',
characteristics: ['네온 글로우', '어둠+형광', '글리치 효과', 'HUD 스타일'],
texture: '스캔라인 2px',
layoutGuide: '네온 글로우 blur 20px, 사이버 프레임',
},
{
id: 'corporate',
name: '코퍼레이트',
category: '비즈니스',
style: { bg: '#ffffff', text: '#0f172a', accent: '#0ea5e9', font: 'Inter' },
mood: 'McKinsey, LinkedIn',
characteristics: ['깔끔한 차트', '파란색 신뢰감', '명확한 계층', '프로 느낌'],
texture: '없음',
layoutGuide: '상단 컬러바, 중앙 제목, 하단 날짜',
},
{
id: 'dashboard',
name: '대시보드 UI',
category: '테크니컬',
style: { bg: '#111827', text: '#F9FAFB', accent: '#10B981', font: 'Inter' },
mood: 'Grafana, 관제 시스템',
characteristics: ['다크 UI', '그래프 위젯', '상태 표시'],
texture: '없음',
layoutGuide: '카드 그리드, 숫자 강조',
},
{
id: 'forest',
name: '포레스트',
category: '내추럴',
style: { bg: '#fcf9ee', text: '#2c3e2e', accent: '#567c5d', font: 'Merriweather' },
mood: 'National Geographic, 환경 다큐',
characteristics: ['자연 녹색/갈색', '유기적 곡선', '에코 무드', '편안한 톤'],
texture: '나뭇잎 패턴 subtle',
layoutGuide: '자연 일러스트 프레임, 중앙 제목',
},
{
id: 'luxury',
name: '골든 아워',
category: '럭셔리',
style: { bg: '#1c1917', text: '#fafaf9', accent: '#d4af37', font: 'Playfair Display' },
mood: 'Rolex, Louis Vuitton',
characteristics: ['골드/블랙', '세리프', '얇은 라인', '대칭 구성'],
texture: '미세 노이즈',
layoutGuide: '중앙 대칭, 위아래 골드 라인',
},
{
id: 'synthwave',
name: '신스웨이브',
category: '레트로',
style: { bg: '#2e1065', text: '#f0abfc', accent: '#22d3ee', font: 'Righteous' },
mood: 'Miami Vice, Stranger Things',
characteristics: ['네온 핑크/시안', '선셋 그라데이션', '크롬 텍스트'],
texture: 'VHS 노이즈',
layoutGuide: '하단 그리드, 크롬 제목, 태양 실루엣',
},
{
id: 'gallery',
name: '모던 갤러리',
category: '크리에이티브',
style: { bg: '#f3f4f6', text: '#111827', accent: '#ec4899', font: 'Abril Fatface' },
mood: 'MoMA, 현대미술관',
characteristics: ['여백과 오브제', '비대칭', '컬러 팝'],
texture: '캔버스 subtle',
layoutGuide: '컬러 원형+타이틀 오버랩',
},
{
id: 'academic',
name: '학술 논문',
category: '학술',
style: { bg: '#fffbf0', text: '#3f3f46', accent: '#9f1239', font: 'Times New Roman' },
mood: 'Harvard 논문, Nature',
characteristics: ['세리프 본문', '정돈된 여백', '각주 스타일'],
texture: '아이보리 종이',
layoutGuide: '중앙 정렬 제목, 저자/기관 하단',
},
];

const CATEGORIES = ['전체', ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];

function hexToRgb(hex) {
const h = (hex || '').replace('#', '').trim();
if (h.length !== 6) return { r: 0, g: 0, b: 0 };
const r = parseInt(h.slice(0, 2), 16);
const g = parseInt(h.slice(2, 4), 16);
const b = parseInt(h.slice(4, 6), 16);
return { r, g, b };
}

// ===== 프롬프트 생성 =====
const generatePrompt = (template) => {
return `[NotebookLM 슬라이드 디자인 요청]

■ 역할: 전문 프레젠테이션 디자이너
■ 스타일: ${template.name}
■ 카테고리: ${template.category}

━━━━━━━━━━━━━━━━━━━━━━

[컬러 시스템]
• 배경: ${template.style.bg}
• 텍스트: ${template.style.text}
• 강조: ${template.style.accent}
• 폰트: ${template.style.font}

[무드 & 레퍼런스]
${template.mood}

[디자인 특성]
${(template.characteristics || []).map((c) => `• ${c}`).join('\n')}

[텍스처]
${template.texture}

[레이아웃 가이드]
${template.layoutGuide}

━━━━━━━━━━━━━━━━━━━━━━

위 가이드를 바탕으로 고품질 슬라이드를 생성해주세요.`;
};

// ===== THUMBNAIL COMPONENT =====
const StyleThumbnail = ({ template }) => {
const { style, id } = template;

const renderElements = () => {
switch (id) {
case 'minimal':
return (
<>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-px" style={{ backgroundColor: style.accent }} />
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 text-[8px]" style={{ color: style.text }}>
Less is More
</div>
</>
);
case 'monochrome':
return (
<>
<div className="absolute inset-3 border" style={{ borderColor: `${style.text}40` }} />
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold" style={{ color: style.text }}>
B&W
</div>
</>
);
case 'cyberpunk':
return (
<>
<div className="absolute inset-2 border" style={{ borderColor: style.accent }} />
<div
className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono"
style={{ color: style.text, textShadow: `0 0 10px ${style.text}` }} >
CYBER
</div>
</>
);
case 'luxury':
return (
<>
<div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-px" style={{ backgroundColor: style.accent }} />
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] tracking-widest" style={{ color: style.accent }}>
LUXE
</div>
<div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs" style={{ color: style.accent }}>
◆
</div>
</>
);
default:
return (
<>
<div className="absolute top-4 left-4 right-8 h-2 rounded" style={{ backgroundColor: style.text, opacity: 0.75 }} />
<div className="absolute top-8 left-4 right-12 h-1 rounded" style={{ backgroundColor: style.text, opacity: 0.35 }} />
<div className="absolute bottom-3 left-4 right-4 h-1 rounded" style={{ backgroundColor: style.accent, opacity: 0.55 }} />
</>
);
}
};

return (
<div className="aspect-video rounded-lg overflow-hidden relative pointer-events-none" style={{ backgroundColor: style.bg }}>
{renderElements()}
</div>
);
};

// ===== 예제 슬라이드(실제 화면) =====
const SlideExample = ({ template }) => {
const s = template.style;
const fontFamily = `${s.font}, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`;

const isDark = (() => {
const { r, g, b } = hexToRgb(s.bg);
// perceived luminance
const lum = (0.2126 _ r + 0.7152 _ g + 0.0722 \* b) / 255;
return lum < 0.45;
})();

// 스타일별 레이아웃 힌트(대충만)
const layoutKind = (() => {
const id = template.id;
if (id === 'minimal') return 'minimal';
if (id === 'monochrome') return 'poster';
if (id === 'cyberpunk') return 'hud';
if (id === 'dashboard') return 'dashboard';
if (id === 'academic') return 'paper';
if (id === 'cartoon') return 'comic';
if (id === 'luxury') return 'luxury';
return isDark ? 'card-dark' : 'card-light';
})();

const cardBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
const border = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';

return (
<div className="w-full">
<div
className="aspect-video w-full rounded-2xl overflow-hidden relative"
style={{
          background: s.bg,
          color: s.text,
          fontFamily,
          border: `1px solid ${border}`,
        }} >
{/_ accent decoration _/}
<div className="absolute inset-0 pointer-events-none">
{layoutKind === 'hud' && (
<>
<div style={{ position: 'absolute', inset: 16, border: `1px solid ${s.accent}`, opacity: 0.6 }} />
<div style={{ position: 'absolute', left: 16, top: 16, width: 80, height: 8, background: s.accent, opacity: 0.8 }} />
<div style={{ position: 'absolute', right: 16, bottom: 16, width: 140, height: 1, background: s.accent, opacity: 0.7 }} />
</>
)}
{layoutKind === 'luxury' && (
<>
<div style={{ position: 'absolute', left: 24, right: 24, top: 24, height: 1, background: s.accent, opacity: 0.75 }} />
<div style={{ position: 'absolute', left: 24, right: 24, bottom: 24, height: 1, background: s.accent, opacity: 0.75 }} />
</>
)}
{layoutKind === 'comic' && (
<>
<div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, ${s.accent}22, transparent 55%)` }} />
<div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,0,0,0.06) 6px, rgba(0,0,0,0.06) 7px)' }} />
</>
)}
{(layoutKind === 'card-light' || layoutKind === 'card-dark') && (
<div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 10, background: s.accent, opacity: 0.85 }} />
)}
</div>

        {/* content */}
        <div className="absolute inset-0 p-8">
          {layoutKind === 'poster' ? (
            <>
              <div className="text-[12px] tracking-[0.25em] opacity-70">EDITORIAL</div>
              <div className="mt-3 text-4xl font-extrabold leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {template.name}
              </div>
              <div className="mt-3 text-sm opacity-80">{template.mood}</div>
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="text-xs opacity-70">{template.category}</div>
                <div className="text-xs opacity-70">{s.font}</div>
              </div>
            </>
          ) : layoutKind === 'minimal' ? (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-4xl font-semibold">{template.name}</div>
                <div className="mx-auto mt-4 h-px w-56" style={{ background: s.accent, opacity: 0.85 }} />
                <div className="mt-4 text-sm opacity-70">{template.mood}</div>
              </div>
            </>
          ) : layoutKind === 'dashboard' ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-70">DASHBOARD</div>
                  <div className="text-2xl font-bold">{template.name}</div>
                </div>
                <div className="text-xs opacity-70">LIVE</div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((k) => (
                  <div key={k} className="rounded-xl p-3" style={{ background: cardBg, border: `1px solid ${border}` }}>
                    <div className="text-[10px] opacity-70">Metric {k}</div>
                    <div className="mt-2 text-2xl font-extrabold" style={{ color: s.accent }}>
                      {k === 1 ? '84' : k === 2 ? '1.2K' : '97%'}
                    </div>
                    <div className="mt-2 h-1 rounded" style={{ background: s.accent, opacity: 0.35 }} />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl p-4" style={{ background: cardBg, border: `1px solid ${border}` }}>
                <div className="text-[10px] opacity-70">Trend</div>
                <div className="mt-3 grid grid-cols-12 gap-1 items-end h-24">
                  {[18, 30, 26, 40, 34, 56, 44, 62, 48, 70, 58, 76].map((h, i) => (
                    <div key={i} className="rounded-t" style={{ height: `${h}%`, background: i % 3 === 0 ? s.accent : `${s.accent}88` }} />
                  ))}
                </div>
              </div>
            </>
          ) : layoutKind === 'paper' ? (
            <>
              <div className="text-2xl font-extrabold">{template.name}</div>
              <div className="mt-1 text-sm opacity-80">{template.mood}</div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ background: cardBg, border: `1px solid ${border}` }}>
                  <div className="text-xs font-semibold" style={{ color: s.accent }}>
                    Abstract
                  </div>
                  <div className="mt-2 text-[12px] leading-relaxed opacity-90">
                    {template.characteristics?.slice(0, 3).join(' · ')}
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: cardBg, border: `1px solid ${border}` }}>
                  <div className="text-xs font-semibold" style={{ color: s.accent }}>
                    Key Points
                  </div>
                  <ul className="mt-2 space-y-1 text-[12px] opacity-90">
                    {(template.characteristics || []).slice(0, 3).map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-6 right-8 text-[10px] opacity-60">p. 1</div>
            </>
          ) : (
            // 기본 카드형
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs opacity-70">{template.category}</div>
                  <div className="mt-1 text-3xl font-extrabold" style={{ letterSpacing: '-0.02em' }}>
                    {template.name}
                  </div>
                  <div className="mt-2 text-sm opacity-80">{template.mood}</div>
                </div>
                <div className="hidden sm:block text-[10px] opacity-60 text-right">
                  <div>{template.texture}</div>
                  <div className="mt-1">{template.layoutGuide}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {(template.characteristics || []).slice(0, 3).map((c, i) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: cardBg, border: `1px solid ${border}` }}>
                    <div className="text-[10px] opacity-65">Point</div>
                    <div className="mt-2 text-sm font-semibold" style={{ color: s.text }}>
                      {c}
                    </div>
                    <div className="mt-4 h-1 rounded" style={{ background: s.accent, opacity: 0.35 }} />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
                <div className="text-[10px] opacity-60">Font: {s.font}</div>
                <div className="text-[10px] opacity-60">Accent: {s.accent}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* small meta */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
        <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">배경 {template.style.bg}</span>
        <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">강조 {template.style.accent}</span>
        <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">폰트 {template.style.font}</span>
      </div>
    </div>

);
};

// ===== PROMPT PANEL =====
const PromptPanel = ({ template, onClose }) => {
const [copied, setCopied] = useState(false);
const [tab, setTab] = useState('example'); // example | prompt
const prompt = generatePrompt(template);

const handleCopy = () => {
navigator.clipboard
.writeText(prompt)
.then(() => {
setCopied(true);
setTimeout(() => setCopied(false), 2000);
})
.catch(() => {
const ta = document.createElement('textarea');
ta.value = prompt;
document.body.appendChild(ta);
ta.select();
document.execCommand('copy');
document.body.removeChild(ta);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
});
};

return (
<div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
<div className="flex items-center justify-between p-4 border-b border-zinc-800">
<div className="flex items-center gap-3">
<div className="w-10 h-7 rounded border border-zinc-600" style={{ backgroundColor: template.style.bg }} />
<div>
<div className="text-sm font-bold text-white flex items-center gap-2">
{template.name}
{template.mergedCount > 1 && (
<span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">통합 {template.mergedCount}개</span>
)}
</div>
<div className="text-xs text-zinc-500">{template.category}</div>
</div>
</div>
<button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 text-white text-xl flex items-center justify-center">
✕
</button>
</div>

      <div className="px-4 pt-3">
        <div className="inline-flex rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
          <button
            onClick={() => setTab('example')}
            className={`px-4 py-2 text-xs font-bold ${tab === 'example' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            예제 화면
          </button>
          <button
            onClick={() => setTab('prompt')}
            className={`px-4 py-2 text-xs font-bold ${tab === 'prompt' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            프롬프트
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {tab === 'example' ? (
          <SlideExample template={template} />
        ) : (
          <textarea
            readOnly
            value={prompt}
            className="w-full min-h-[60vh] bg-zinc-900 text-zinc-300 text-xs font-mono p-4 rounded-xl border border-zinc-700 resize-none focus:outline-none"
            style={{ lineHeight: '1.6' }}
          />
        )}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleCopy}
          className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 ${
            copied ? 'bg-green-600 text-white' : 'bg-white text-black'
          }`}
        >
          {copied ? '✓ 복사됨!' : '📋 프롬프트 복사'}
        </button>
      </div>
    </div>

);
};

// ===== MAIN APP =====
export default function NotebookLMBuilder() {
const [selectedCategory, setSelectedCategory] = useState('전체');
const [selectedTemplate, setSelectedTemplate] = useState(null);
const [searchQuery, setSearchQuery] = useState('');

const filteredTemplates = useMemo(() => {
return TEMPLATES.filter((t) => {
const matchCategory = selectedCategory === '전체' || t.category === selectedCategory;
const sq = searchQuery.trim().toLowerCase();
const matchSearch =
!sq ||
(t.name || '').toLowerCase().includes(sq) ||
(t.mood || '').toLowerCase().includes(sq) ||
(t.category || '').toLowerCase().includes(sq);
return matchCategory && matchSearch;
});
}, [selectedCategory, searchQuery]);

const categoryCount = useMemo(() => {
const counts = {};
CATEGORIES.forEach((c) => {
counts[c] = 0;
});
counts['전체'] = TEMPLATES.length;
TEMPLATES.forEach((t) => {
counts[t.category] = (counts[t.category] || 0) + 1;
});
return counts;
}, []);

const year = new Date().getFullYear();

return (
<div className="min-h-screen bg-zinc-950 text-white">
{/_ Ambient background _/}
<div className="pointer-events-none fixed inset-0">
<div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
<div className="absolute -bottom-48 -right-48 h-[640px] w-[640px] rounded-full blur-3xl opacity-25 bg-gradient-to-br from-emerald-400 via-cyan-400 to-indigo-500" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
</div>

      {/* Top command bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl blur-md opacity-70 bg-gradient-to-br from-violet-500 to-fuchsia-500" />
              <div className="relative w-10 h-10 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight">NotebookLM Visual Studio</div>
              <div className="text-[11px] text-white/60">
                {TEMPLATES.length} curated styles · click to preview + copy
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-[340px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search styles, moods, categories…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm outline-none focus:border-white/20 focus:bg-white/10"
              />
            </div>

            <a
              href="https://notebooklm.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-zinc-950 text-sm font-extrabold hover:bg-white/90"
            >
              <ExternalLink className="w-4 h-4" />
              Open NotebookLM
            </a>
          </div>

          <a
            href="https://notebooklm.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white text-zinc-950 text-xs font-extrabold"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </a>
        </div>
      </header>

      {/* Layout */}
      <div className="relative mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[72px] h-fit">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <div className="text-xs text-white/50">Filter</div>
              <div className="mt-1 text-lg font-extrabold tracking-tight">Categories</div>
              <div className="mt-3 md:hidden relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-2xl bg-zinc-950/60 border border-white/10 text-sm outline-none focus:border-white/20"
                />
              </div>
            </div>

            <div className="p-3">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all border ${
                      active
                        ? 'bg-white text-zinc-950 border-white shadow-[0_0_0_1px_rgba(255,255,255,0.35)]'
                        : 'bg-transparent text-white/75 border-transparent hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${active ? 'bg-zinc-950/10' : 'bg-white/10'}`}>
                      {categoryCount[cat] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="text-[11px] text-white/55 leading-relaxed">
                Tip: click a card → <span className="text-white/85 font-semibold">Example</span> preview → switch to <span className="text-white/85 font-semibold">Prompt</span> → copy.
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main>
          {/* Hero */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/70">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Curated templates (10)
              </div>
              <div className="mt-4 text-2xl md:text-3xl font-black tracking-tight">
                A radically cleaner way to generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300">slide prompts</span>
              </div>
              <div className="mt-2 text-sm text-white/60 max-w-2xl">
                Pick a style. Instantly preview a realistic sample slide. Copy a structured prompt to feed NotebookLM.
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-white/85">Results</div>
              <div className="text-xs text-white/50">{filteredTemplates.length} shown</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map((template) => {
                const s = template.style;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className="group text-left rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <div className="p-4">
                      {/* custom thumbnail */}
                      <div className="rounded-2xl overflow-hidden border border-white/10">
                        <StyleThumbnail template={template} />
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold tracking-tight text-white group-hover:text-white">
                            {template.name}
                          </div>
                          <div className="text-[11px] text-white/55 truncate">{template.category}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: s.accent }} />
                          <span className="text-[11px] text-white/50">{s.accent}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-[12px] text-white/60 line-clamp-2">{template.mood}</div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-[10px] px-2 py-1 rounded-full bg-black/25 border border-white/10 text-white/65">BG {s.bg}</span>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-black/25 border border-white/10 text-white/65">Font {s.font}</span>
                      </div>
                    </div>

                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </button>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <Grid3X3 className="w-10 h-10 text-white/20 mx-auto" />
                <div className="mt-3 text-sm text-white/60">No results. Try another keyword or category.</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-10 pb-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-[12px] text-white/60 leading-relaxed">
                  <div className="font-semibold text-white/80">Cayson Tech</div>
                  <div>© {year} Cayson Tech. All rights reserved.</div>
                </div>

                <a
                  href="https://www.slidedeckcleaner.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-zinc-950 text-xs font-extrabold hover:bg-white/90"
                >
                  <span>🧹</span>
                  Watermark remover
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {selectedTemplate && <PromptPanel template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />}

      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
        .line-clamp-2{
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
      `}</style>
    </div>

);
}
