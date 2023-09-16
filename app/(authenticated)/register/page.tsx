import Link from "next/link";
import { Tabs } from "../components/Tabs";
import TabContent from "../components/Tabs/TabContentex";
import TabsCadastro from "../components/Tabs/TabsCadastro";
import Users from "./users/page";


export default function Register() {
  const tabs = [
    {
      title: 'Usuários',
      path: '/register/users',
      content: <Users />,
    },
    {
      title: 'Clientes',
      path: '/register/users',
      content: <Users />,
    },
  ];
    return (
        <>
        <h1>Cadastro</h1>
       <TabsCadastro />
 
        </>
    );
}