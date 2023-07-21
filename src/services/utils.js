export  { getRolesAndPermissions, createOpsForPatch }

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

function createOpsForPatch(object, array) {
    const ops = [];

    for (const [key, value] of array) {
        let op;
        if (!object[key] && value) {
            op = "add"
        } else if (object[key] && !value) {
            op = "remove"
        } else if (object[key] != value) {
            op = "replace"
        }

        if (op) {
            const operation = {
                "op": op,
                "path": "/" + key,
            }

            if (op != "remove") {
                operation.value = value;
            }
    
            ops.push(operation);
        }
    }
    return ops;
}
