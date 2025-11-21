부산광역시 축제정보시스템 UI 스타일 가이드
====================================================

1. 컬러 팔렛트 (Color Palette)
----------------------------------------------------
주요 색상:
- Primary Blue: #003876 (주 버튼, 제목 강조, 헤더/푸터 배경)
- Secondary Blue: #00509e (호버 상태, 그라데이션)
- White: #ffffff (배경, 버튼 텍스트)
- Gray 50: #f9fafb (섹션 배경)
- Gray 200: #e5e7eb (테두리)
- Gray 300: #d1d5db (입력 필드 테두리)
- Gray 600: #4b5563 (보조 텍스트)
- Gray 700: #374151 (버튼 텍스트)
- Gray 900: #111827 (주요 텍스트)

상태 색상:
- Success Green: #10b981 (성공 메시지)
- Error Red: #ef4444, #dc2626 (오류 메시지, 삭제 버튼)
- Red 50: #fef2f2 (오류 배경)
- Red 300: #fca5a5 (오류 테두리)
- Red 700: #b91c1c (오류 텍스트)

비활성화 상태:
- Gray 100: #f3f4f6 (비활성 버튼 배경)
- Gray 400: #9ca3af (비활성 텍스트)


2. 폰트 (Fonts)
----------------------------------------------------
기본 폰트: 시스템 폰트 스택 (System Font Stack)
- font-family: system-ui, -apple-system, sans-serif

폰트 크기 (Font Sizes):
모바일 우선 (Mobile First) 접근:
- 본문 텍스트: text-sm (0.875rem) → sm:text-base (1rem)
- 작은 텍스트: text-xs (0.75rem) → sm:text-sm (0.875rem)
- 제목 H1: text-2xl (1.5rem) → sm:text-3xl (1.875rem) → md:text-4xl (2.25rem) → lg:text-5xl (3rem)
- 제목 H2: text-lg (1.125rem) → sm:text-xl (1.25rem)
- 제목 H3: text-base (1rem) → sm:text-lg (1.125rem)

폰트 굵기 (Font Weights):
- font-medium: 중간 (500) - 버튼, 라벨
- font-bold: 굵게 (700) - 제목, 강조 텍스트


3. 버튼 (Buttons)
----------------------------------------------------
주요 버튼 (Primary Button):
클래스: bg-[#003876] text-white px-4 sm:px-6 py-2 sm:py-3 font-medium hover:bg-[#00509e] transition-colors
- 배경: #003876
- 텍스트: 흰색
- 패딩: 모바일 16px/8px → 태블릿+ 24px/12px
- 호버: #00509e
- 전환: 부드러운 색상 전환

보조 버튼 (Secondary Button):
클래스: bg-white text-[#003876] px-4 sm:px-6 py-2 sm:py-3 font-medium border border-gray-200 hover:bg-gray-100 transition-colors
- 배경: 흰색
- 텍스트: #003876
- 테두리: 회색 (#e5e7eb)
- 호버: 연한 회색 배경

비활성 버튼 (Disabled Button):
클래스: disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50
- 배경: #9ca3af
- 커서: not-allowed
- 투명도: 50%

삭제 버튼 (Delete Button):
클래스: text-red-600 hover:text-red-800
- 텍스트: #dc2626
- 호버: #991b1b

페이지네이션 버튼 (Pagination Button):
활성 상태: bg-[#003876] text-white border-[#003876]
비활성 상태: bg-white text-gray-700 border-gray-300 hover:bg-gray-50


4. 입력 필드 스타일 (Input Field Styles)
----------------------------------------------------
텍스트 입력 (Text Input):
클래스: w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-[#003876] transition-colors text-sm sm:text-base
- 패딩: 모바일 12px/8px → 태블릿+ 16px/12px
- 테두리: #d1d5db
- 포커스 테두리: #003876
- 너비: 100%

텍스트 영역 (Textarea):
클래스: w-full border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-[#003876] resize-none text-sm sm:text-base
- 리사이즈: 비활성화
- 행 수: 기본 3행

라벨 (Label):
클래스: block text-xs sm:text-sm font-medium text-gray-700 mb-2
- 색상: #374151
- 하단 여백: 8px


5. 레이아웃 및 간격 (Layout & Spacing)
----------------------------------------------------
컨테이너 너비:
- max-w-7xl mx-auto px-4 (최대 1280px, 중앙 정렬, 좌우 패딩 16px)

반응형 그리드 (Responsive Grid):
- 모바일: grid-cols-1 (1열)
- 태블릿: sm:grid-cols-2 (2열)
- 데스크톱: md:grid-cols-3 또는 lg:grid-cols-3 (3열)
- 상세 페이지: lg:grid-cols-3 (좌측 2열, 우측 1열)

간격 (Gaps):
- 모바일: gap-4 (16px)
- 태블릿: sm:gap-6 (24px)
- 데스크톱: md:gap-8 (32px)

섹션 패딩:
- 모바일: py-6 (24px) ~ py-8 (32px)
- 태블릿: sm:py-12 (48px)
- 데스크톱: md:py-16 (64px) ~ md:py-20 (80px)


6. 테두리 및 그림자 (Borders & Shadows)
----------------------------------------------------
카드 테두리:
- border border-gray-300 (1px 실선 테두리)
- border-2 border-gray-300 (2px 테두리 - 중요 요소)

강조 테두리:
- border-b-2 border-[#003876] (하단 2px 파란색 테두리)
- border-t-4 border-[#00509e] (상단 4px 파란색 테두리)

호버 효과:
- hover:border-[#003876] (호버 시 파란색 테두리)


7. 반응형 디자인 브레이크포인트 (Responsive Breakpoints)
----------------------------------------------------
Tailwind CSS 브레이크포인트:
- sm: 640px 이상 (태블릿)
- md: 768px 이상 (작은 데스크톱)
- lg: 1024px 이상 (데스크톱)

모바일 우선 (Mobile First) 전략:
1. 기본 스타일은 모바일용으로 작성
2. sm: 접두사로 태블릿 이상 화면에 적용할 스타일 추가
3. md:, lg: 접두사로 더 큰 화면에 최적화

숨김/표시:
- hidden sm:inline (모바일에서 숨김, 태블릿 이상에서 표시)
- sm:flex-row (모바일 세로 배치, 태블릿 이상 가로 배치)


8. 상태 표시 (State Indicators)
----------------------------------------------------
로딩 스피너:
클래스: animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#003876]
- 크기: 모바일 40px → 태블릿 48px
- 색상: #003876
- 애니메이션: 회전

오류 메시지:
클래스: bg-red-50 border border-red-300 text-red-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm
- 배경: #fef2f2
- 테두리: #fca5a5
- 텍스트: #b91c1c


9. 헤더 및 푸터 (Header & Footer)
----------------------------------------------------
헤더:
- 배경: bg-[#003876]
- 하단 테두리: border-b-4 border-[#00509e]
- 텍스트: 흰색
- 패딩: py-2 sm:py-3

푸터:
- 배경: bg-[#003876]
- 상단 테두리: border-t-4 border-[#00509e]
- 텍스트: 흰색
- 패딩: py-8 sm:py-12


10. 아이콘 및 그래픽 (Icons & Graphics)
----------------------------------------------------
아이콘 크기:
- 작은 아이콘: w-5 h-5 (20px)
- 중간 아이콘: w-6 h-6 (24px)
- 큰 아이콘: w-10 h-10 sm:w-12 sm:h-12 (40px → 48px)

아이콘 색상:
- 주요: text-[#003876]
- 흰색: text-white

이미지:
- aspect-video (16:9 비율)
- object-cover (비율 유지하며 채우기)


11. 애니메이션 및 전환 (Animations & Transitions)
----------------------------------------------------
전환 효과:
- transition-colors (색상 전환)
- transition-all (모든 속성 전환)
- duration-300 (300ms 지속 시간)

호버 효과:
- hover:bg-[#00509e] (배경색 변경)
- hover:text-white (텍스트 색상 변경)
- hover:underline (밑줄 추가)


12. 접근성 (Accessibility)
----------------------------------------------------
- 포커스 가능한 모든 요소에 focus:outline-none focus:border-[#003876] 적용
- 버튼 비활성 상태에 disabled:cursor-not-allowed 적용
- 의미있는 대체 텍스트(alt) 제공
- 충분한 색상 대비 유지 (WCAG AA 기준)


13. 다국어 지원 (Multi-language Support)
----------------------------------------------------
지원 언어:
- 한국어 (ko)
- 영어 (en)

구현 방식:
- React Context API 사용
- useLanguage 훅으로 번역 문자열 접근
- 공공데이터 및 사용자 댓글 제외, UI 텍스트만 번역
