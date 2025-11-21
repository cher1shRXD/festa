import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { OpenApi } from "../api/openapi";
import type { OpenApiItem } from "../types/open-api-response";
import CommentSection from "../components/CommentSection";
import { Header, Footer } from "../components/home";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const { t } = useLanguage();
  const [festival, setFestival] = useState<OpenApiItem | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchFestival();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header user={user} onLogout={handleLogout} />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003876]"></div>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen bg-white">
        <Header user={user} onLogout={handleLogout} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 text-lg mb-4">
            {t.detail.notFound}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#003876] text-white px-6 py-3 font-medium hover:bg-[#00509e] transition-colors">
            {t.detail.backToList}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onLogout={handleLogout} />

      <section className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-[#003876] hover:text-[#00509e] font-medium transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.detail.backToList}
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              <span className="bg-[#003876] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
                {festival.GUGUN_NM}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              {festival.MAIN_TITLE}
            </h1>
            {festival.SUBTITLE && (
              <p className="text-base sm:text-lg text-gray-600">{festival.SUBTITLE}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column - Image and Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Main Image */}
              {festival.MAIN_IMG_NORMAL && (
                <div className="w-full aspect-video bg-gray-200 overflow-hidden border border-gray-300">
                  <img
                    src={festival.MAIN_IMG_NORMAL}
                    alt={festival.MAIN_TITLE}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Description */}
              {festival.ITEMCNTNTS && (
                <div className="bg-white border border-gray-300 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
                    {t.detail.sections.introduction}
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: festival.ITEMCNTNTS }}
                  />
                </div>
              )}

              {/* Traffic Info */}
              {festival.TRFC_INFO && (
                <div className="bg-white border border-gray-300 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
                    {t.detail.sections.traffic}
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {festival.TRFC_INFO}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-300 p-4 sm:p-6 sticky top-4">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
                  {t.detail.sections.detailInfo}
                </h2>

                <div className="space-y-4">
                  {/* Period */}
                  {festival.USAGE_DAY && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.period}
                          </div>
                          <div className="text-sm text-gray-700">
                            {festival.USAGE_DAY}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time */}
                  {festival.USAGE_DAY_WEEK_AND_TIME && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.time}
                          </div>
                          <div className="text-sm text-gray-700">
                            {festival.USAGE_DAY_WEEK_AND_TIME}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {festival.PLACE && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.location}
                          </div>
                          <div className="text-sm text-gray-700">
                            {festival.PLACE}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {festival.ADDR1 && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.address}
                          </div>
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
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.fee}
                          </div>
                          <div className="text-sm text-gray-700">
                            {festival.USAGE_AMOUNT}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  {festival.CNTCT_TEL && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.contact}
                          </div>
                          <div className="text-sm text-gray-700">
                            {festival.CNTCT_TEL}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Homepage */}
                  {festival.HOMEPAGE_URL && (
                    <div>
                      <div className="flex items-start mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-[#003876] shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <div>
                          <div className="font-bold text-sm text-gray-900 mb-1">
                            {t.detail.fields.homepage}
                          </div>
                          <a
                            href={festival.HOMEPAGE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#003876] hover:text-[#00509e] underline break-all">
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

      <Footer />
    </div>
  );
};

export default Detail;
