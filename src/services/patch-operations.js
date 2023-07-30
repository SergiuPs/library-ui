export  { createOpsForObject, createOpsForAddress }

/**
 * Create patch operations for simple object (containing no object/array values).
 * @param {*} oldValues Object before was modified (inserted in form)
 * @param {*} newValues Object with new values from form
 * @returns 
 */
function createOpsForObject(oldValues, newValues) {
	const operations = [];

	for (const [key, value] of Object.entries(newValues)) {
		let op;
		if (!oldValues[key] && value) {
			op = "add"
		} else if (oldValues[key] && !value) {
			op = "remove"
		} else if (oldValues[key] != value) {
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
/**
 * Create patch operations for a new added or modified address.
 * Will check if the address was marked as default billing/shipping and will also modify
 * the old addresses that were marked as default billing and default shipping.
 * @param {*} address Address that's been added or modified
 * @param {*} addresses The array with all addresses of the entity that's been updated
 * @param {*} index The index where in array is the address that's been updated (if undefined - new address)
 * @param {*} defaultBillingIsChecked Default billing address checkbox has been checked
 * @param {*} defaultShippingIsChecked Default shipping address checkbox has been checked
 * @returns 
 */
function createOpsForAddress(address, addresses, index, defaultBillingIsChecked, defaultShippingIsChecked) { 
	const operations = [];

	let opForNewAddress;
	if (index !== undefined) {
		opForNewAddress = createOpForModifiedAddress(address, index);
	} else {
		opForNewAddress = createOpForNewAddress(address, addresses.length);
	}
	operations.push(opForNewAddress);

	//If not first address, check for default billing/shipping (first will be saved with both true)
	if (addresses.length !== 0 && (defaultBillingIsChecked || defaultShippingIsChecked)) { 
		const operationsForOldDefaultAddreses = createOpsForOldDefaultAddresses(addresses, index, defaultBillingIsChecked, defaultShippingIsChecked);
		operations.push(...operationsForOldDefaultAddreses);
	}

	return operations
}

function createOpForNewAddress(address, index) {
	return {
		"op" : "add",
		"path" : "/addresses/" + index,
		"value" : address
	}
}

function createOpForModifiedAddress(address, index) {
	return {
		"op" : "replace",
		"path" : "/addresses/" + index,
		"value" : address
	}
}

function createOpsForOldDefaultAddresses(addresses, index, defaultBillingIsChecked, defaultShippingIsChecked) {
	let operations = [];
	let indexOfOldDefBilling;
	let defaultBillingWasChecked = index !== undefined ? addresses[index].defaultBillingAddress : false;
	if (defaultChanged(defaultBillingIsChecked, defaultBillingWasChecked)) {
		indexOfOldDefBilling = addresses.findIndex(el => el.defaultBillingAddress == true);
		const op = createOpForDefaultAddress(indexOfOldDefBilling, addresses, "defaultBillingAddress")
		operations.push(op);
	}

	let defaultShippingWasChecked = index !== undefined ? addresses[index].defaultShippingAddress : false;
	if (defaultChanged(defaultShippingIsChecked, defaultShippingWasChecked)) {
		const indexOfDefShipping = addresses.findIndex(el => el.defaultShippingAddress == true);
		if (indexOfDefShipping != indexOfOldDefBilling) {
			const op = createOpForDefaultAddress(indexOfDefShipping, addresses, "defaultShippingAddress")
			operations.push(op);
		} else {
			operations[0].value.defaultShippingAddress = false;
		}
	}
	return operations;
}

/**
 * Check if default shipping or default billing was modified. 
 * @param {*} isChecked
 * @param {*} wasChecked
 * @returns 
 */
function defaultChanged(isChecked, wasChecked) {
	return isChecked && !wasChecked;
}

/**
 * Create patch operation for old default shipping/billing address,
 * by setting default to false and passing new object to patch operation.
 * @param {*} indexOfOldDefault 
 * @param {*} addresses 
 * @param {*} type billing or shipping
 * @returns 
 */
function createOpForDefaultAddress(indexOfOldDefault, addresses, type) {
	const oldDefaultAddress = addresses[indexOfOldDefault];
	oldDefaultAddress[type] = false;
	const operation = {
		"op" : "replace",
		"path" : "/addresses/" + indexOfOldDefault,
		"value" : oldDefaultAddress
	}
	return operation;
}