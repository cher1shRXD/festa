const Footer = () => {
  const footerSections = [
    {
      title: "부산광역시",
      subtitle: "축제정보시스템",
      isMain: true
    },
    {
      title: "이용안내",
      links: [
        { text: "축제 정보", href: "#" },
        { text: "참여 방법", href: "#" },
        { text: "공지사항", href: "#" }
      ]
    },
    {
      title: "정책정보",
      links: [
        { text: "이용약관", href: "#" },
        { text: "개인정보처리방침", href: "#" },
        { text: "저작권정책", href: "#" }
      ]
    },
    {
      title: "문의처",
      contacts: [
        "부산광역시청",
        "전화: 051-120",
        "평일 09:00~18:00"
      ]
    }
  ];

  return (
    <footer className="bg-[#003876] text-white py-12 px-4 border-t-4 border-[#00509e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className={`font-bold mb-3 ${section.isMain ? 'text-lg' : ''}`}>
                {section.title}
              </h3>
              {section.subtitle && (
                <p className="text-sm text-gray-300">{section.subtitle}</p>
              )}
              {section.links && (
                <ul className="space-y-2 text-sm text-gray-300">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="hover:text-white">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {section.contacts && (
                <ul className="space-y-2 text-sm text-gray-300">
                  {section.contacts.map((contact, contactIndex) => (
                    <li key={contactIndex}>{contact}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[#00509e] pt-6 text-sm text-gray-300">
          <p>© 2025 부산광역시. All Rights Reserved.</p>
          <p className="mt-2">본 사이트는 부산광역시 공공데이터를 활용하여 제작되었습니다.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
