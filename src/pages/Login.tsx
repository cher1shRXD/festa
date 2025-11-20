import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003876] text-white py-3 border-b-4 border-[#00509e]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="font-bold text-lg">부산광역시</div>
              <div className="text-sm opacity-90">|</div>
              <div className="text-sm">축제정보시스템</div>
            </div>
            <div className="text-xs">BUSAN FESTIVAL</div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-gray-300 p-8">
            <div className="mb-8 text-center border-b-2 border-[#003876] pb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {isSignUp ? "회원가입" : "로그인"}
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                부산광역시 축제정보시스템
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#003876] transition-colors"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#003876] transition-colors"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003876] text-white py-3 font-medium hover:bg-[#00509e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-sm text-[#003876] hover:underline"
                >
                  {isSignUp ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 bg-white border border-gray-200 p-4">
            <h3 className="font-bold text-sm mb-2 text-gray-900">안내사항</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 부산광역시 축제정보시스템 이용을 위해 로그인이 필요합니다.</li>
              <li>• 회원가입 시 이메일과 비밀번호를 입력해주세요.</li>
              <li>• 비밀번호는 6자 이상이어야 합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
