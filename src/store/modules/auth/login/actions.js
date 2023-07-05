let timer;

import { RestApiConstants } from '@/constants/api-constants';
import { getRolesAndPermissions } from '@/services/utils';

export default {
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
		localStorage.setItem('userId', responseData.userId);
		localStorage.setItem('tokenExpiration', expirationDate);

		timer = setTimeout(function() {
			context.dispatch('autoLogout');
		}, expiresIn);

		context.commit('setUser', {
			token: responseData.accessToken,
			userId: responseData.userId,
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
		const userId = localStorage.getItem('userId');
		const tokenExpiration = localStorage.getItem('tokenExpiration');
		const expiresIn = Date.parse(tokenExpiration) - Date.now();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(function() {
					context.dispatch('autoLogout');
				}, expiresIn);

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId,
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