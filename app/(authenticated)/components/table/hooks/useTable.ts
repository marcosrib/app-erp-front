import { useState } from "react";
import api from "@/app/services/api";
import { useQuery } from "@tanstack/react-query";


export function useTable(url: string) {

    const [currentPage, setCurrentPage] = useState<number>(0);


    function handlePageChange(selected: number) {
      setCurrentPage(selected);
    }

    async function getUsers() {
        const response = await api.get(url, {
          params: {
            page: currentPage + 1,
            size: 5,
          },
        });
        return response.data;
    }

    const {
      isLoading,
      data,
    } = useQuery({
      queryKey: ['table', currentPage],
      queryFn: () => getUsers(),
      keepPreviousData : true,
      enabled: true
    })

    return {
      data,
      isLoading,
      handlePageChange,
    };
  }