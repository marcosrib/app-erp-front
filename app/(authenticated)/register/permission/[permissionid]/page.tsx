import { getPerfil, getPermissions } from '../actions/permissionsAction';
import PermissionEdit from '../components/PermissionEdit';

export default async function Permission({
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
      <PermissionEdit
        profileId={Number(params.permissionid)}
        permissions={permissions}
        perfil={perfil}
      />
    </>
  );
}
