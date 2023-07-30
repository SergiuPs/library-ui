export	{ getRolesAndPermissions }

function getRolesAndPermissions(authorities) {
	const authoritiesArray = authorities.split(',');
	const roles = [];
	const permissions = [];

	for (const authority of authoritiesArray) {
		if (authority.startsWith('ROLE')) {
			roles.push(authority);
		} else {
			permissions.push(authority)
		}
	}
	return [roles, permissions];
}