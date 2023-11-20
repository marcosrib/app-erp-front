'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/app/components/input/';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const loginFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato do e-mali inválido'),
  password: z.string()
    .min(6, 'A senha precisa de no minimo 6 caracteres')
})

type CreateUserFormData = z.infer<typeof loginFormSchema>

export default function Signin() {
   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(loginFormSchema),

  })
  //const { signIn } = useContext(AuthContext);
  const router =  useRouter();
 

  async function handleSignIn({ email, password }: CreateUserFormData) {
    const result = await signIn('credentials', { email, password,redirect: false})
    if(result?.error) {
      return;
    }
    router.replace('/dashboard');
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
         <Input.Root>
          <Input.Label label='E-mail'/>
          <Input.Input 
          type='email'
            {...register('email')}
          />
          <Input.LabelError 
              helperText={errors.email?.message}
            />
         </Input.Root>
         <Input.Root>
          <Input.Label label='Senha'/>
          <Input.Input
            type='password'
            {...register('password')}
            />
            <Input.LabelError 
               helperText={errors.password?.message}
            />
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
