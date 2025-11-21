import { useLanguage } from "../../hooks/useLanguage";

const QuickLinks = () => {
  const { t } = useLanguage();

  const links = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: t.quickLinks.yearRound.title,
      description: t.quickLinks.yearRound.description
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t.quickLinks.easyAccess.title,
      description: t.quickLinks.easyAccess.description
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t.quickLinks.detailedInfo.title,
      description: t.quickLinks.detailedInfo.description
    }
  ];

  return (
    <section className="py-8 sm:py-12 px-4 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {links.map((link, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 border border-gray-200 hover:border-[#003876] transition-colors">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#003876] flex items-center justify-center shrink-0">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-gray-900 text-sm sm:text-base">{link.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{link.description}</p>
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
