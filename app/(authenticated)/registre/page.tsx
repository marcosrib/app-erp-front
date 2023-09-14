import { Tabs } from "../components/Tabs";
import TabContent from "../components/Tabs/TabContent";


export default function Registre() {
    return (
        <>
        <h1>Cadastro</h1>
         <Tabs.Root>
            <Tabs.Tabs label="testd">
                <TabContent/>
            </Tabs.Tabs>
            <Tabs.Tabs label="test2">
                <TabContent/>
            </Tabs.Tabs>
         </Tabs.Root>
        </>
    );
}