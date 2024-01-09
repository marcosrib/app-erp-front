import { getPerfil, getPermissions } from '../actions/permissionsAction';
import PermissionCreate from '../components/PermissionCreate';

export default async function Create({
  params,
}: {
  params: { permissionid: string };
}) {

  const permissionsAll = await getPermissions(
    `api/ability`
  );
  
  if(!permissionsAll) {
    return <h1>Perfis não carregado</h1>
  }
  
  const perfil = await getPerfil(`api/profile/${params.permissionid}`);

  return (
    <>
      <PermissionCreate
        permissions={permissionsAll}
      />
    </>
  );
}
