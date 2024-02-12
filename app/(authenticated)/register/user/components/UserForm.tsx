'use client';
import { useUserStore } from '../store/useUserStore';
import UserCreateForm from './UserCreateForm';
import UserEditForm from './UserEditForm';
import { getProfiles } from '../actions/userAction';
import { useQuery } from '@tanstack/react-query';

export default function UserForm() {
  const { userEdit } = useUserStore();

  const { data } = useQuery({
    queryKey: ['getProfiles'],
    queryFn: () => handleGetProfiles(),
  });
  async function handleGetProfiles() {
    return await getProfiles();
  }

  return (
    <>
      {userEdit.id != undefined ? (
        <UserEditForm profile={data} />
      ) : (
        <UserCreateForm profile={data} />
      )}
    </>
  );
}
