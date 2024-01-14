import { redirect } from 'next/navigation';
import { getPerfil, getPermissions } from '../actions/permissionsAction';
import PermissionEdit from '../components/PermissionEdit';
import { hasPermission } from '@/app/(authenticated)/actions/hasPermission';

export default async function Permission({
  params,
}: {
  params: { permissionid: string };
}) {
  
  const isPermission = await hasPermission('PERMISSION', 'UPDATE');
  if(!isPermission) {
    redirect('/unauthorized');
  }

  const  permissions = await getPermissions(
    `api/ability/${params.permissionid}/profile`
  );
  
  const perfil = await getPerfil(`api/profile/${params.permissionid}`);
  
  if(!permissions) {
    return <h1>Perfis não carregado</h1>
  }

  return (
    <>
      <PermissionEdit
        profileId={Number(params.permissionid)}
        permissions={permissions}
        perfil={perfil}
      />
    </>
  );
}
