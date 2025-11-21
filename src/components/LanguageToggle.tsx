import { useLanguage } from "../hooks/useLanguage";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage("ko")}
        className={`px-2 py-1 text-xs transition-colors ${
          language === "ko"
            ? "bg-white text-[#003876] font-bold"
            : "text-white hover:bg-white/10"
        }`}
      >
        한국어
      </button>
      <span className="text-white/50">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs transition-colors ${
          language === "en"
            ? "bg-white text-[#003876] font-bold"
            : "text-white hover:bg-white/10"
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;
