import { useNavigate } from "react-router";
import type { OpenApiItem } from "../../types/open-api-response";

interface FestivalCardProps {
  festival: OpenApiItem;
}

const FestivalCard = ({ festival }: FestivalCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-300 hover:border-[#003876] transition-colors cursor-pointer overflow-hidden"
      onClick={() => navigate(`/festivals/${festival.UC_SEQ}`)}
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
  );
};

export default FestivalCard;
