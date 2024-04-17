'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/app/components/input/';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Spinner from '@/app/components/loading/Spinner';
import { useState } from 'react';

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato do e-mali inválido'),
  password: z.string().min(6, 'A senha precisa de no minimo 6 caracteres'),
});

type CreateUserFormData = z.infer<typeof loginFormSchema>;

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  async function handleSignIn({ email, password }: CreateUserFormData) {
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      if (result?.status === 401) {
        toast.error('Usuário ou senha inválidos');
      } else {
        toast.error('Erro ao realizar login');
      }
      setIsLoading(false);
      return;
    }
    router.replace('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 dark:bg-gray-800 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
          Login
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <Input.Root>
            <Input.Label label="E-mail" />
            <Input.Input type="email" {...register('email')} />
            <Input.LabelError helperText={errors.email?.message} />
          </Input.Root>
          <Input.Root>
            <Input.Label label="Senha" />
            <Input.Input type="password" {...register('password')} />
            <Input.LabelError helperText={errors.password?.message} />
          </Input.Root>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
