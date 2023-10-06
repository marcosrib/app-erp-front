import { useEffect, useState } from "react";
import api from "@/app/services/api";

export function useTable(url: string) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState(0);
  
    useEffect(() => {
      fetchData();
    }, [currentPage]);
  
    async function fetchData() {
      try {
        const response = await api.get(url, {
          params: {
            page: currentPage + 1,
            size: 5,
          },
        });
  
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    }
  
    function handlePageChange(selected: number) {
      setCurrentPage(selected);
    }
  
    return {
      data,
      totalPages,
      handlePageChange,
    };
  }