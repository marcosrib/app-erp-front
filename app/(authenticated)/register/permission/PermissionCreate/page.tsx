import { getPerfil, getPermissions } from '../actions/permissionsAction';
import PermissionCreate from '../components/PermissionCreate';
import PermissionEdit from '../components/PermissionEdit';

export default async function Create({
  params,
}: {
  params: { permissionid: string };
}) {

  const permissions = await getPermissions(
    `api/ability/${params.permissionid}/profile`
  );
  
  const perfil = await getPerfil(`api/profile/${params.permissionid}`);

  return (
    <>
      <PermissionCreate
        profileId={Number(params.permissionid)}
        permissions={permissions}
        perfil={perfil}
      />
    </>
  );
}
