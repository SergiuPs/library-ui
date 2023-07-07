<template>
    <header>
        <nav class="navbar navbar-expand-lg mb-4" style="background-color: #e6f6fe">
            <div class="container-fluid">
                <router-link to="/">
                    <img src="../../assets/logo.png" alt="Logo" width="194" height="32" class="d-inline-block align-text-top">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                </button>
                <div>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2 ms-4" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-dark me-4" type="submit">Search</button>
                    </form>
                </div>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav w-100">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/books" class="nav-link">Books</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/authors" class="nav-link">Authors</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/forum" class="nav-link">Forum</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/chat" class="nav-link">Chat</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav justify-content-end w-100">
                        <li class="nav-item dropdown">
                            <a class="nav-link navbar-brand" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="../../assets/user.png" alt="Logo" width="32" height="32" class="d-inline-block align-text-top">
                            </a>
                            <ul class="dropdown-menu">
                                <li v-if="!isAuth">
                                    <button @click.prevent="openLoginModal" class="dropdown-item">Login</button>
                                </li>
                                <li v-if="!isAuth">
                                    <router-link to="/register" class="dropdown-item">Register</router-link>
                                </li>
                                <li v-if="isAuth">
                                    <router-link to="/my-account" class="dropdown-item">My Account</router-link>
                                </li>
                                <li v-if="isAuth && roleHigherThanUser">
                                    <router-link to="/dashboard" class="dropdown-item">Dashboard</router-link>
                                </li>
                                <li v-if="isAuth" @click="logout">
                                    <div class="dropdown-item">Logout</div>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link navbar-brand" :href="redirectToLogin" role="button" :data-bs-toggle="disableDropDownForFavs" aria-expanded="false">
                                <img src="../../assets/favorite.png" alt="Logo" width="32" height="32" class="d-inline-block align-text-top">
                            </a>
                            <ul v-if="isAuth" class="dropdown-menu">
                                <li>
                                    <router-link to="/" class="dropdown-item">Placeholder</router-link>
                                </li>
                                <li>
                                    <router-link to="/" class="dropdown-item">Placeholder</router-link>
                                </li>
                                <li>
                                    <router-link to="/" class="dropdown-item">Placeholder</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link navbar-brand" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="../../assets/shop.png" alt="Logo" width="32" height="32" class="d-inline-block align-text-top">
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link to="/" class="dropdown-item">Placeholder</router-link>
                                </li>
                                <li>
                                    <router-link to="/" class="dropdown-item">Placeholder</router-link>
                                </li>
                                <li>
                                    <router-link to="/" class="dropdown-item">Placeholder</router-link>
                                </li>
                             </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <base-dialog :first-button="false" :show="loginModalVisible" title="Login" >
            <user-login @logged-in="closeLoginModal"></user-login>
        </base-dialog>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import UserLogin from '@/views/auth/UserLogin.vue';

export default {
    components: { UserLogin },
    data() {
        return {
            loginModalVisible: false
        }
    },
	computed: {
		...mapGetters({
			isLoggedIn: 'auth/isAuthenticated',
			roleHigherThanUser: 'auth/authenticatedHasRoleHigherThanUser'
		}),
		isAuth() {
			return this.isLoggedIn;
		},
		disableDropDownForFavs() { //If user is not authenticated, the drop-down for favorites will be disabled ...
			if (this.isAuth) {
				return 'dropdown';
			}
			return '';
		},
		redirectToLogin() {
			if (this.isAuth) {
				return '#';
			}
			return '/login'; // ... and user redirected to login after clicking on favorites.
		},
	},
	methods: {
        openLoginModal() {
            this.loginModalVisible = true;
        },
        closeLoginModal() {
            this.loginModalVisible = false;
        },
		logout() {
			this.$store.dispatch('auth/logout');
			this.$router.replace('/');
		} 
	}
}
</script>
