import { ReactNode } from "react";
import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";

type Props = {
    children: ReactNode;
}
export default function AppProviders({children} : Props) {
    return (
        <QueryClientProviderWrapper>
            {children}
        </QueryClientProviderWrapper>
    )
}