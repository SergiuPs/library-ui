export default {
    userId(state) {
		return state.userId;
    },
    token(state) {
		return state.token;
    },
    isAuthenticated(state) {
		return !!state.token;
    },
    didAutoLogout(state) {
		return state.didAutoLogout;
    },
    authenticatedHasRoleHigherThanUser(state) {
		return state.roles.length > 1;
    },
    authenticatedHasPermission(state) {
		return (value) => {
			if (state.permissions.includes(value)) {
				return true;
			} 
			return false;	
		}
    }
};