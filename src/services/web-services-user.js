export { getUser, getPersonalDetails, getUserAddresses, patchUser, editEmail }
import { RestApiConstants } from '@/constants/api-constants';
import User from '@/model/user/user.js';
import Address from '@/model/user/address.js';
import PersonalDetailsInfo from '@/model/user/personal-details.js';

async function getUser(userId) {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + userId;

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem('token')
		},
	});

	const responseBody = await response.json();
	if (response.ok) {
		return new User(responseBody);
	} else {
		throw new Error(responseBody.message);
	}
}

async function getPersonalDetails(userId) {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + userId + RestApiConstants.PERSONAL_DETAILS;

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem('token')
		},
	});

	const responseBody = await response.json();
	if (response.ok) {
		return new PersonalDetailsInfo(responseBody);
	} else {
		throw new Error(responseBody.message);
	}
}

async function getUserAddresses(userId) {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + userId + RestApiConstants.USER_ADDRESSES;

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem('token')
		},
	});

	const responseBody = await response.json();
	if (response.ok) {
		const receivedAddresses = [];

		for (let value of responseBody) {
			receivedAddresses.push(
				new Address(value.id,
						value.version,
						value.recipient, 
						value.street,
						value.zip,
						value.city,
						value.defaultBillingAddress,
						value.defaultShippingAddress));
		}
		return receivedAddresses;
	} else {
		throw new Error(responseBody.message);
	}
}

async function patchUser(userId, operations) {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + userId;

	const response = await fetch(url, {
		method: 'PATCH',
		body: JSON.stringify(operations),
		headers: {
			"Content-Type": "application/json-patch+json",
			"Authorization": localStorage.getItem('token')
		},
	});

	const responseBody = await response.json();
	if (response.ok) {
		return new User(responseBody)
	} else {
		throw new Error(responseBody.message);
	}
}

async function editEmail(userId, newEmail, editorId, password) {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + userId + RestApiConstants.EMAIL;

	const response = await fetch(url, {
		method: 'PATCH',
		body: JSON.stringify({
			"newEmail": newEmail,
			"editorId": editorId,
			"password": password
		}),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem('token')
		},
	});

	if (!response.ok) {
		const responseBody = await response.json();
		throw new Error(responseBody.message);
	}
}