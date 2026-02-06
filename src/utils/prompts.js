export const generatePrompt = (template) => {
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
