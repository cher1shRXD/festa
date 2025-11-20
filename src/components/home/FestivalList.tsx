import type { OpenApiItem } from "../../types/open-api-response";
import FestivalCard from "./FestivalCard";
import Pagination from "./Pagination";

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
  return (
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
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
