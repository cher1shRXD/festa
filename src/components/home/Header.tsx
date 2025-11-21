import { useNavigate } from "react-router";
import type { User } from "firebase/auth";
import LanguageToggle from "../LanguageToggle";
import { useLanguage } from "../../hooks/useLanguage";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="bg-[#003876] text-white py-2 sm:py-3 border-b-4 border-[#00509e]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="font-bold text-base sm:text-lg">FESTA</div>
            <div className="text-xs sm:text-sm opacity-90 hidden sm:inline">|</div>
            <div className="text-xs sm:text-sm">{t.header.system}</div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-xs hidden sm:inline">{t.header.subtitle}</div>
            <LanguageToggle />
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs hidden sm:inline">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="text-xs bg-white text-[#003876] px-2 sm:px-3 py-1 hover:bg-gray-100 transition-colors"
                >
                  {t.header.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-xs bg-white text-[#003876] px-2 sm:px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                {t.header.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
