import { getPermissions } from '../actions/permissionsAction';
import PermissionEdit from '../components/PermissionEdit';

export default async function Permission({
  params,
}: {
  params: { permissionid: string };
}) {
  const permissions = await getPermissions(
    `api/ability/${params.permissionid}/profile`
  );
  return (
    <>
      <PermissionEdit
        profileId={Number(params.permissionid)}
        permissions={permissions}
      />
    </>
  );
}
