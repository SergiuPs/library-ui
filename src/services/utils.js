export  { getRolesAndPermissions, createOpsForPatch, createOpsForAddress }

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
    const operations = [];

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
    
            operations.push(operation);
        }
    }
    return operations
}

function createOpsForAddress(newAddress, addresses, index, defaultBillingChecked, defaultShippingChecked) { 
    const numberOfAddresses = addresses.length;
    const operations = [];

	const opForNewAddress = createOpForNewAddress(newAddress, index, numberOfAddresses);
    operations.push(opForNewAddress);

    let indexOfDefBilling;
    let oldDefaultBillingValue = index ? addresses[index].defaultBillingAddress : false;
	if (defaultChanged(numberOfAddresses, defaultBillingChecked, oldDefaultBillingValue)) {
		indexOfDefBilling = addresses.findIndex(el => el.defaultBillingAddress == true);
        const op = createOpForDefaultAddress(indexOfDefBilling, addresses, "defaultBillingAddress")
        operations.push(op);
	}

    let oldDefaultShippingValue = index ? addresses[index].defaultShippingAddress : false;
    if (defaultChanged(numberOfAddresses, defaultShippingChecked, oldDefaultShippingValue)) {
		const indexOfDefShipping = addresses.findIndex(el => el.defaultShippingAddress == true);
		if (indexOfDefShipping != indexOfDefBilling) {
            const op = createOpForDefaultAddress(indexOfDefShipping, addresses, "defaultShippingAddress")
            operations.push(op);
        } else {
            operations[1].value.defaultShippingAddress = false;
        }
	}

    return operations
}

function createOpForNewAddress(newAddress, index, numberOfAddresses) {
    let opName, path;
    if (index >= 0) {
		opName = "replace";
		path = "/addresses/" + index
	} else {
		opName = "add";
		path = "/addresses/" + numberOfAddresses
	}

	return {
        "op" : opName,
        "path" : path,
        "value" : newAddress
    }
}

function defaultChanged(numberOfAddresses, defaultChecked, oldValue) {
    return numberOfAddresses > 1 && defaultChecked && !oldValue;
}

function createOpForDefaultAddress(indexOfDefault, addresses, type) {
    const oldDefaultAddress = addresses[indexOfDefault];
	oldDefaultAddress[type] = false;
	const operation = {
        "op" : "replace",
        "path" : "/addresses/" + indexOfDefault,
        "value" : oldDefaultAddress
    }
    return operation;
}
