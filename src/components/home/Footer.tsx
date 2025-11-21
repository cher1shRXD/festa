import { useLanguage } from "../../hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: t.footer.mainTitle,
      subtitle: t.footer.mainSubtitle,
      isMain: true
    },
    {
      title: t.footer.guide.title,
      links: [
        { text: t.footer.guide.festivalInfo, href: "#" },
        { text: t.footer.guide.howToParticipate, href: "#" },
        { text: t.footer.guide.notice, href: "#" }
      ]
    },
    {
      title: t.footer.policy.title,
      links: [
        { text: t.footer.policy.terms, href: "#" },
        { text: t.footer.policy.privacy, href: "#" },
        { text: t.footer.policy.copyright, href: "#" }
      ]
    },
    {
      title: t.footer.contact.title,
      contacts: [
        t.footer.contact.office,
        t.footer.contact.phone,
        t.footer.contact.hours
      ]
    }
  ];

  return (
    <footer className="bg-[#003876] text-white py-8 sm:py-12 px-4 border-t-4 border-[#00509e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className={`font-bold mb-2 sm:mb-3 ${section.isMain ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                {section.title}
              </h3>
              {section.subtitle && (
                <p className="text-xs sm:text-sm text-gray-300">{section.subtitle}</p>
              )}
              {section.links && (
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
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
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                  {section.contacts.map((contact, contactIndex) => (
                    <li key={contactIndex}>{contact}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[#00509e] pt-4 sm:pt-6 text-xs sm:text-sm text-gray-300">
          <p>{t.footer.copyright}</p>
          <p className="mt-2">{t.footer.notice}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
