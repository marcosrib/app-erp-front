'use client'
import { useRouter } from 'next/navigation';
import Users from '../../register/users/page';

export default function TabsCadastro() {
  const router = useRouter();

  const handleTabClick = (tabName) => {
 
    router.push(`/register?tab=${tabName}`);
  };

  return (
    <div>
      <div className="flex">
        <a
          className={'cursor-pointer px-4 py-2'}
          onClick={() => handleTabClick('usuario')}
        >
          Usuário
        </a>
        <a
          className={'cursor-pointer px-4 py-2'}
          onClick={() => handleTabClick('cliente')}
        >
          Cliente
        </a>
      </div>
      <div className="mt-4">
        { 'usuario'=== 'usuario' ? <Users /> : <Users />}
      </div>
    </div>
  );
}

