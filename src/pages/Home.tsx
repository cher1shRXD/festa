import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { OpenApi } from "../api/openapi";
import type { OpenApiItem } from "../types/open-api-response";

const Home = () => {
  const [festivals, setFestivals] = useState<OpenApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [numOfRows] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      try {
        const response = await OpenApi.fetchData(currentPage);
        setFestivals(response.data.getFestivalKr.item);
        setTotalCount(response.data.getFestivalKr.totalCount);
      } catch (error) {
        console.error("Failed to fetch festivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, [currentPage]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
                    onClick={handleLogout}
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

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-[#003876] to-[#00509e] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              부산광역시 축제 안내
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              부산에서 개최되는 다양한 축제 정보를 한눈에 확인하세요
            </p>
            <button
              onClick={() => document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#003876] px-6 py-3 font-medium hover:bg-gray-100 transition-colors border border-gray-200"
            >
              축제 정보 보기
            </button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-gray-200 hover:border-[#003876] transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#003876] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-gray-900">연중 축제</h3>
                  <p className="text-sm text-gray-600">사계절 내내 다양한 축제 개최</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 hover:border-[#003876] transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#003876] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-gray-900">편리한 접근</h3>
                  <p className="text-sm text-gray-600">부산 전역 축제 위치 안내</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 hover:border-[#003876] transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#003876] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-gray-900">상세 정보</h3>
                  <p className="text-sm text-gray-600">일정, 장소, 연락처 제공</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section id="festivals" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 border-b-2 border-[#003876] pb-4">
            <h2 className="text-3xl font-bold text-gray-900">
              축제 목록
            </h2>
            <p className="text-gray-600 mt-2">부산에서 진행 중인 축제를 확인하세요</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003876]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivals.map((festival) => (
                <div
                  key={festival.UC_SEQ}
                  className="bg-white border border-gray-300 hover:border-[#003876] transition-colors cursor-pointer overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {festival.MAIN_IMG_NORMAL ? (
                      <img
                        src={festival.MAIN_IMG_NORMAL}
                        alt={festival.MAIN_TITLE}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                        축제
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-[#003876] text-white px-3 py-1 text-xs font-medium">
                      {festival.GUGUN_NM}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2">
                      {festival.MAIN_TITLE}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {festival.ITEMCNTNTS?.replace(/<[^>]*>/g, '') || festival.SUBTITLE}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
                      {festival.PLACE && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span className="line-clamp-1">{festival.PLACE}</span>
                        </div>
                      )}
                      {festival.USAGE_DAY && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="line-clamp-1">{festival.USAGE_DAY}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalCount > 0 && (
            <div className="mt-12 flex justify-center items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                처음
              </button>
              <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                이전
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, Math.ceil(totalCount / numOfRows)) }, (_, i) => {
                  const totalPages = Math.ceil(totalCount / numOfRows);
                  let pageNum;

                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'bg-[#003876] text-white border-[#003876]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage >= Math.ceil(totalCount / numOfRows)}
                className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                다음
              </button>
              <button
                onClick={() => {
                  setCurrentPage(Math.ceil(totalCount / numOfRows));
                  document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage >= Math.ceil(totalCount / numOfRows)}
                className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                마지막
              </button>
            </div>
          )}

          {/* Page Info */}
          {!loading && totalCount > 0 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              전체 {totalCount}개 중 {((currentPage - 1) * numOfRows) + 1}~{Math.min(currentPage * numOfRows, totalCount)}개 표시 (페이지 {currentPage}/{Math.ceil(totalCount / numOfRows)})
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003876] text-white py-12 px-4 border-t-4 border-[#00509e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-3 text-lg">부산광역시</h3>
              <p className="text-sm text-gray-300">
                축제정보시스템
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">이용안내</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">축제 정보</a></li>
                <li><a href="#" className="hover:text-white">참여 방법</a></li>
                <li><a href="#" className="hover:text-white">공지사항</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">정책정보</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white">저작권정책</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">문의처</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>부산광역시청</li>
                <li>전화: 051-120</li>
                <li>평일 09:00~18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#00509e] pt-6 text-sm text-gray-300">
            <p>© 2025 부산광역시. All Rights Reserved.</p>
            <p className="mt-2">본 사이트는 부산광역시 공공데이터를 활용하여 제작되었습니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;