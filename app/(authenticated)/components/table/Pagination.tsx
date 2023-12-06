'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

type Props = {
    totalPages: number,
}

export default function Pagination({ totalPages }: Props) {

    const router = useRouter();
    const pathName = usePathname();
    const searcheParams = useSearchParams();
    const currentPage = Number(searcheParams.get('page')) || 1;

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searcheParams.toString());
        params.set('page', '1');
        params.set('page', page.toString());
        router.push(`${pathName}/?${params.toString()}`);
    }

    return (
        <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        previousLabel={'Anterior'}
        nextLabel={'Próximo'}
        pageRangeDisplayed={7}
        marginPagesDisplayed={0}
        breakLabel={null} 
        breakClassName={'hidden'}
        pageLinkClassName={'px-2 rounded-md'}
        previousLinkClassName={'bg-gray-200 px-2 py-2 mr-2 rounded-md'}
        nextLinkClassName={'bg-gray-200 px-2 py-2 ml-2 rounded-md'}
        activeClassName="bg-slate-500  text-white"
        pageClassName="px-2 py-1.5 rounded-lg"
        containerClassName={'flex justify-center items-center'}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
       />
    )
}