import { useNavigate } from "react-router";
import type { User } from "firebase/auth";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#003876] text-white py-3 border-b-4 border-[#00509e]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-lg">부산광역시</div>
            <div className="text-sm opacity-90">|</div>
            <div className="text-sm">축제정보시스템</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs">BUSAN FESTIVAL</div>
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="text-xs bg-white text-[#003876] px-3 py-1 hover:bg-gray-100 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-xs bg-white text-[#003876] px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
