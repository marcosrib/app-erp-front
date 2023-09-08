'use client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AuthContext } from '../contexts/AuthContext';
import { Input } from '@/app/components/input/';

const createUserFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato do e-mail inválido'),
  password: z.string()
    .min(6, 'A senha precisa de no minimo 6 caracteres')
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function Signin() {
   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),

  })
  const { signIn } = useContext(AuthContext);

 

  async function handleSignIn(data: any) {
  console.log(data);
  
    
   // await signIn({ data., dada.password });
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
          <Input.Laibel label='E-mail'/>
          <Input.Input 
          type='email'
            {...register('email')}
          />
          <Input.LabelError 
              helperText={errors.email?.message}
            />
         </Input.Root>
         <Input.Root>
          <Input.Laibel label='Senha'/>
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
