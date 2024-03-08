import { usePathname, useRouter, useSearchParams } from "next/navigation";
type ParamsProps = {
    key: string;
    value: string | number | undefined;
}


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
    function setMultipleParam(params: ParamsProps[]) {
        const paramsUrl = new URLSearchParams(searchParams.toString());
        if(params.length > 0){
            params.forEach(param => {
                paramsUrl.set(param.key, param.value.toString());
            });
            router.push(`${pathName}/?${paramsUrl.toString()}`);
        }
        
    }

    function deleteParam(key: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        router.push(`${pathName}/?${params.toString()}`);
    }


    function deleteMultipleParam(keys: string[]) {
        const paramsUrl = new URLSearchParams(searchParams.toString());
        if(keys.length > 0){
            keys.forEach(key => {
                paramsUrl.delete(key);
            });
            router.push(`${pathName}/?${paramsUrl.toString()}`);
        }
    }
    return {
        deleteParam,
        compareParam,
        setParam,
        setMultipleParam,
        deleteMultipleParam
    }
}