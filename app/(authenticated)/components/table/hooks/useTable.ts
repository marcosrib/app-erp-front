import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/app/services/api";


export function useTable(url: string) {

    const [currentPage, setCurrentPage] = useState<number>(0);


    function handlePageChange(selected: number) {
      setCurrentPage(selected);
    }

    async function getUsers() {
      const api = apiInstance();
    
      
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
      queryFn: async () => { 
      const data =  await getUsers() 
      return data;
      },
      keepPreviousData : true,
      enabled: true
    })

    return {
      data,
      isLoading,
      handlePageChange,
    };
  }