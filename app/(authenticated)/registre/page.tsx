import { Tabs } from "../components/Tabs";
import TabContent from "../components/Tabs/TabContentex";


export default function Registre() {
    return (
        <>
        <h1>Cadastro</h1>
         <Tabs.Root>
           <Tabs.TabHeader>
            <Tabs.TabHeaderContent label="tabe 1" />
            <Tabs.TabHeaderContent label="tabe 2" />
           </Tabs.TabHeader>
           <Tabs.TabContent>
             <TabContent label='1'/>
             <TabContent label='2'/>
           </Tabs.TabContent>
        
         </Tabs.Root>
        </>
    );
}