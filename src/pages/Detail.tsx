import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { OpenApi } from "../api/openapi";
import type { OpenApiItem } from "../types/open-api-response";
import CommentSection from "../components/CommentSection";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [festival, setFestival] = useState<OpenApiItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestival = async () => {
      if (!id) return;
      
      try {
        const response = await OpenApi.fetchOne(Number(id));
        const festivalData = response.data.getFestivalKr.item[0];
        setFestival(festivalData);
      } catch (error) {
        console.error("Failed to fetch festival:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestival();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-[#003876] text-white py-3 border-b-4 border-[#00509e]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="font-bold text-lg">부산광역시</div>
                <div className="text-sm opacity-90">|</div>
                <div className="text-sm">축제정보시스템</div>
              </div>
              <div className="text-xs">BUSAN FESTIVAL</div>
            </div>
          </div>
        </header>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003876]"></div>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-[#003876] text-white py-3 border-b-4 border-[#00509e]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="font-bold text-lg">부산광역시</div>
                <div className="text-sm opacity-90">|</div>
                <div className="text-sm">축제정보시스템</div>
              </div>
              <div className="text-xs">BUSAN FESTIVAL</div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 text-lg mb-4">축제 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#003876] text-white px-6 py-3 font-medium hover:bg-[#00509e] transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

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
            <div className="text-xs">BUSAN FESTIVAL</div>
          </div>
        </div>
      </header>

      {/* Back Button Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-[#003876] hover:text-[#00509e] font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로 돌아가기
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="bg-[#003876] text-white px-3 py-1 text-sm font-medium">
                {festival.GUGUN_NM}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {festival.MAIN_TITLE}
            </h1>
            {festival.SUBTITLE && (
              <p className="text-lg text-gray-600">{festival.SUBTITLE}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              {festival.MAIN_IMG_NORMAL && (
                <div className="w-full aspect-video bg-gray-200 overflow-hidden border border-gray-300">
                  <img
                    src={festival.MAIN_IMG_NORMAL}
                    alt={festival.MAIN_TITLE}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Description */}
              {festival.ITEMCNTNTS && (
                <div className="bg-white border border-gray-300 p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
                    축제 소개
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: festival.ITEMCNTNTS }}
                  />
                </div>
              )}

              {/* Traffic Info */}
              {festival.TRFC_INFO && (
                <div className="bg-white border border-gray-300 p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
                    교통 정보
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {festival.TRFC_INFO}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-300 p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
                  상세 정보
                </h2>

                <div className="space-y-4">
                  {/* Period */}
                  {festival.USAGE_DAY && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">기간</div>
                          <div className="text-sm text-gray-700">{festival.USAGE_DAY}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time */}
                  {festival.USAGE_DAY_WEEK_AND_TIME && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">운영시간</div>
                          <div className="text-sm text-gray-700">{festival.USAGE_DAY_WEEK_AND_TIME}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {festival.PLACE && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">장소</div>
                          <div className="text-sm text-gray-700">{festival.PLACE}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {festival.ADDR1 && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">주소</div>
                          <div className="text-sm text-gray-700">
                            {festival.ADDR1}
                            {festival.ADDR2 && ` ${festival.ADDR2}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fee */}
                  {festival.USAGE_AMOUNT && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">이용요금</div>
                          <div className="text-sm text-gray-700">{festival.USAGE_AMOUNT}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  {festival.CNTCT_TEL && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">문의전화</div>
                          <div className="text-sm text-gray-700">{festival.CNTCT_TEL}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Homepage */}
                  {festival.HOMEPAGE_URL && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">홈페이지</div>
                          <a
                            href={festival.HOMEPAGE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#003876] hover:text-[#00509e] underline break-all"
                          >
                            {festival.HOMEPAGE_URL}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="lg:col-span-2">
            <CommentSection festivalId={Number(id)} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003876] text-white py-12 px-4 border-t-4 border-[#00509e] mt-12">
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

export default Detail;
