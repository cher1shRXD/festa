import type { OpenApiItem } from "../../types/open-api-response";
import FestivalCard from "./FestivalCard";
import Pagination from "./Pagination";
import { useLanguage } from "../../hooks/useLanguage";

interface FestivalListProps {
  festivals: OpenApiItem[];
  loading: boolean;
  currentPage: number;
  totalCount: number;
  numOfRows: number;
  onPageChange: (page: number) => void;
}

const FestivalList = ({
  festivals,
  loading,
  currentPage,
  totalCount,
  numOfRows,
  onPageChange
}: FestivalListProps) => {
  const { t } = useLanguage();

  return (
    <section id="festivals" className="py-8 sm:py-12 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 border-b-2 border-[#003876] pb-3 sm:pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t.festivalList.title}
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{t.festivalList.description}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 sm:py-20">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#003876]"></div>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {festivals.map((festival) => (
                <FestivalCard key={festival.UC_SEQ} festival={festival} />
              ))}
            </div>

            {totalCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                numOfRows={numOfRows}
                onPageChange={onPageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FestivalList;
