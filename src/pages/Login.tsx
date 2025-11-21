import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { Header } from "../components/home";
import { useLanguage } from "../hooks/useLanguage";

const Login = () => {
  const { t } = useLanguage();
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
        setError(t.login.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={null} onLogout={() => {}} />

      {/* Login Form */}
      <div className="flex items-center justify-center py-8 sm:py-12 md:py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-gray-300 p-4 sm:p-6 md:p-8">
            <div className="mb-6 sm:mb-8 text-center border-b-2 border-[#003876] pb-3 sm:pb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {isSignUp ? t.login.title.signUp : t.login.title.login}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                {t.login.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  {t.login.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-[#003876] transition-colors text-sm sm:text-base"
                  placeholder={t.login.email.placeholder}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  {t.login.password.label}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-[#003876] transition-colors text-sm sm:text-base"
                  placeholder={t.login.password.placeholder}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003876] text-white py-2 sm:py-3 font-medium hover:bg-[#00509e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? t.login.button.processing : isSignUp ? t.login.button.signUp : t.login.button.login}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-xs sm:text-sm text-[#003876] hover:underline"
                >
                  {isSignUp ? t.login.toggle.toLogin : t.login.toggle.toSignUp}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 sm:mt-6 bg-white border border-gray-200 p-3 sm:p-4">
            <h3 className="font-bold text-xs sm:text-sm mb-2 text-gray-900">{t.login.notice.title}</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              {t.login.notice.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
