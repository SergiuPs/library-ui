export { requestSecurityCode, validateCode }
import { RestApiConstants } from '@/constants/api-constants';

async function requestSecurityCode() {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.REQUEST_SECURITY_CODE;

	const response = await fetch(url, {
		method: 'POST',
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

async function validateCode(code) {
	const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.VALIDATE_SECURITY_CODE;

	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			"code": code
		}),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem('token')
		},
	});

	if (response.ok) {
		return true;
	} else {
		const responseBody = await response.json();
		throw new Error(responseBody.message);
	}
}