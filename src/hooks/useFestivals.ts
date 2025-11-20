import { useEffect, useState } from "react";
import { OpenApi } from "../api/openapi";
import type { OpenApiItem } from "../types/open-api-response";

export const useFestivals = (currentPage: number) => {
  const [festivals, setFestivals] = useState<OpenApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

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

  return { festivals, loading, totalCount };
};
