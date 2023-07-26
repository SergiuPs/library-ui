let timer;

import { RestApiConstants } from '@/constants/api-constants';
import { getRolesAndPermissions } from '@/services/utils';

export default {
	async register(context, payload) {

		const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.REGISTER;

		let headers = {
			"Content-Type": "application/json",
		};
   
		if (context.getters['auth/isAuthenticated']) {
			headers['Authorization'] = localStorage.getItem('token');
		}

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(payload.newUser),
			headers: headers
		});

		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to register.');
			throw error;
		}
	},
	async login(context, payload) {
		let url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.LOGIN;

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				username: payload.username,
				password: payload.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		
		const responseData = await response.json();
		if (!response.ok) {
			throw new Error(
				responseData.message || 'Failed to authenticate. Check your login data.'
			);
		}

		const jwtPayload = JSON.parse(window.atob(responseData.accessToken.split('.')[1]));
		const rolesAndPermissions = getRolesAndPermissions(jwtPayload.authorities);
		const expirationDate = new Date(jwtPayload.exp*1000);
		const expiresIn = expirationDate - Date.now();

		localStorage.setItem('token', responseData.accessToken);
		localStorage.setItem('tokenExpiration', expirationDate);

		timer = setTimeout(function() {
			context.dispatch('autoLogout');
		}, expiresIn);

		context.commit('setUser', {
			token: responseData.accessToken,
			userId: jwtPayload.userId,
			roles: rolesAndPermissions[0],
			permissions: rolesAndPermissions[1]
		});
	},
	async tryLogin(context) {
		const token = localStorage.getItem('token');
		if (token == null) {
			return;
		}

		const jwtPayload = JSON.parse(window.atob(token.split('.')[1]));
		const rolesAndPermissions = getRolesAndPermissions(jwtPayload.authorities);
		const tokenExpiration = localStorage.getItem('tokenExpiration');
		const expiresIn = Date.parse(tokenExpiration) - Date.now();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(function() {
					context.dispatch('autoLogout');
				}, expiresIn);

		if (token) {
			context.commit('setUser', {
				token: token,
				userId: jwtPayload.userId,
				roles: rolesAndPermissions[0],
				permissions: rolesAndPermissions[1]
			});
		}
	},
	logout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');

		clearTimeout(timer);

		context.commit('setUser', {
			token: null,
			userId: null,
			roles: null,
			permissions: null
		});
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	},
};