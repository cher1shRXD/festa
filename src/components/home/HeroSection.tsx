import { useLanguage } from "../../hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-linear-to-r from-[#003876] to-[#00509e]">
      <img src="/banner.jpg" alt="hero image" className="w-full h-full" />
      <div className="w-full mx-auto px-4 absolute top-0 left-0 flex flex-col justify-center h-full py-12 sm:py-16 md:py-32">
        <div className="text-white flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 text-center px-4">
            {t.hero.description}
          </p>
          <button
            onClick={() => document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#003876] px-4 sm:px-6 py-2 sm:py-3 font-medium hover:bg-gray-100 transition-colors border border-gray-200 text-sm sm:text-base"
          >
            {t.hero.button}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
