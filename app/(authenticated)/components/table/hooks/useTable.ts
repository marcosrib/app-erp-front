import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/app/services/api";
import { getClientSideApiInstance } from "@/app/services/getClientSideApiInstance";

export function useTable(url: string, filters: {}) {

    const [currentPage, setCurrentPage] = useState<number>(0);

    function handlePageChange(selected: number) {
      setCurrentPage(selected);
    }

    function buildQueryString() {     
     
      const filteredFilters = Object.fromEntries(
        Object.entries(filters)
          .filter(([key, value]) => value != null && value != '')
      ); 
    return filteredFilters ? filteredFilters : '';
    }
    async function getUsers() {
      const api = getClientSideApiInstance();
      const filteredValues = buildQueryString();        
      const response = await api.get(url, {
        params: {
          ...filteredValues,
          page: currentPage + 1,
          size: 5,
        },
      });

      return response.data;
  }

    const { isLoading, data } = useQuery(
      ['table', currentPage, filters],
      () => getUsers(),
      {
          keepPreviousData: true,
          enabled: true,
      }
  );
    
    return {
      data,
      isLoading,
      handlePageChange,
    };
  }