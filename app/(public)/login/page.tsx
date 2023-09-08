'use client';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Input } from '@/app/components/input/';

export default function Signin() {
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(event: any) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    
    await signIn({ email, password });
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignIn}>
         <Input.Root>
          <Input.Laibel label='E-mail'/>
          <Input.Input/>
         </Input.Root>
         <Input.Root>
          <Input.Laibel label='Senha'/>
          <Input.Input type='password'/>
         </Input.Root>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
