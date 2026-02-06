import React from 'react';
import SlideExample from './SlideExample';

const ThumbnailSlide = ({ template }) => {
  // 실제 슬라이드(SlideExample)를 3배 크기(300%)의 컨테이너에 렌더링한 뒤,
  // CSS transform을 사용해 1/3(0.333...) 크기로 축소하여 보여줍니다.
  // 이렇게 하면 SlideExample 내부의 큰 폰트와 여백이 비율을 유지한 채 작게 보입니다.
  const scale = 0.25; // 4배 확대 후 1/4 축소 (더 작은 텍스트 대응)
  const percent = 100 / scale; // 400%

  return (
    <div className="w-full aspect-video relative overflow-hidden rounded-2xl bg-zinc-900 pointer-events-none select-none">
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: `${percent}%`, 
          height: `${percent}%`, 
          transform: `scale(${scale})` 
        }}
      >
        <SlideExample template={template} />
      </div>
    </div>
  );
};

export default ThumbnailSlide;
