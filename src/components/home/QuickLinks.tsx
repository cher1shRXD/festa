const QuickLinks = () => {
  const links = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "연중 축제",
      description: "사계절 내내 다양한 축제 개최"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "편리한 접근",
      description: "부산 전역 축제 위치 안내"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "상세 정보",
      description: "일정, 장소, 연락처 제공"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <div key={index} className="bg-white p-6 border border-gray-200 hover:border-[#003876] transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#003876] flex items-center justify-center shrink-0">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-gray-900">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
