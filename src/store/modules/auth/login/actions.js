let timer;
import User from '../../../../model/user';
import { RestApiConstants } from '@/constants/api-constants';

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
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    const user = new User(responseData.userCommand);
    const jwtPayload = JSON.parse(window.atob(responseData.accessToken.split('.')[1]));
    const expirationDate = new Date(jwtPayload.exp*1000);
    const expiresIn = expirationDate - Date.now();
    
    localStorage.setItem('token', responseData.accessToken);
    localStorage.setItem('userId', user.getId());
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.accessToken,
      userId: user.getId(),
      user: user
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
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
        userId: userId
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
      user: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};