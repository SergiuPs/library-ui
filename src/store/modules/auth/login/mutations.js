export default {
    setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
		state.didAutoLogout = false;
		state.roles = payload.roles;
		state.permissions = payload.permissions;
    },
    setAutoLogout(state) {
		state.didAutoLogout = true;
    }
};