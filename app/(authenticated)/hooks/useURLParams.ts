import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useURLParams() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();

    function compareParam(key: string, value: string) {
        return searchParams.get(key) === value
    }

    function setParam(key: string,  value: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`${pathName}/?${params.toString()}`);
    }

    function deleteParam(key: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        router.push(`${pathName}/?${params.toString()}`);
    }
    return {
        deleteParam,
        compareParam,
        setParam,
    }
}