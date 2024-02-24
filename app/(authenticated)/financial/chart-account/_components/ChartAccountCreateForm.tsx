'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ChartAccountCreateForm() {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

  return <></>;
}
