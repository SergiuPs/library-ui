import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import RegistrationForm from "@/views/auth/RegistrationForm.vue";
import RegistrationComplete from '@/views/auth/RegistrationComplete.vue';
import RegistrationConfirmation from '@/views/auth/RegistrationConfirmation.vue';
import PasswordReset from '@/views/auth/PasswordReset.vue';
import PasswordResetComplete from '@/views/auth/PasswordResetComplete.vue';
import TheDashboard from '@/views/TheDashboard.vue';
import TheUsers from '@/views/user/TheUsers.vue';
import UserEdit from '@/views/user/UserEdit.vue';
import UserCard from '@/views/user/UserCard.vue';
import MyAccount from '@/views/user/account/MyAccount.vue';
import MyAddresses from '@/views/user/account/MyAddresses.vue';
import TheOverview from '@/views/user/account/TheOverview.vue';
import PersonalDetails from '@/views/user/account/PersonalDetails.vue';

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/register",
		name: "register",
		component: RegistrationForm,
	},
	{
		path: "/registration-complete",
		name: "registeration-complete",
		component: RegistrationComplete,
	},
	{
		path: "/registration-confirmation",
		name: "registration-confirmation",
		component: RegistrationConfirmation,
	},
	{
		path: "/password-reset",
		name: "password-reset",
		component: PasswordReset,
	},
	{
		path: "/password-reset-complete",
		name: "password-reset-complete",
		component: PasswordResetComplete,
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: TheDashboard,
		meta: {requiresAuth: true}
	},
	{
		path: "/users",
		name: "users",
		component: TheUsers,
		meta: {requiresAuth: true}
	},
	{
		path: "/users/:id",
		name: "user",
		component: UserCard,
		meta: {requiresAuth: true}
	},
	{
		path: "/users/:id/edit",
		name: "user-edit",
		component: UserEdit,
		meta: {requiresAuth: true}
	},
	{
		path: "/my-account",
		name: "account",
		component: MyAccount,
		meta: {requiresAuth: true},
		children: [
			{
				path: "overview",
				alias: "",
				name: "overview",
				component: TheOverview
			},
			{
				path: "personal-details",
				name: "personal-details",
				component: PersonalDetails,
				meta: {header: 'Personal Details'},
			},
			{
				path: "addresses",
				name: "addresses",
				component: MyAddresses,
				meta: {header: 'My Addresses'},
			}
		]
	},
	{
		path: "/authors",
		name: "authors",
		component: NotFound,
		meta: {requiresAuth: false}
	},
	{
		path: "/books",
		name: "books",
		component: NotFound,
		meta: {requiresAuth: false}
	},
	{
		path: "/chat",
		name: "chat",
		component: NotFound,
		meta: {requiresAuth: false}
	},
	{
		path: "/forum",
		name: "forum",
		component: NotFound,
		meta: {requiresAuth: false}
	},
];

const router = createRouter({history: createWebHistory(process.env.BASE_URL), routes});

router.beforeEach(function(to, from, next) {
	if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
		next('/'); //Show modal
	} else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
		next('/')
	} else {
		next();
	}
});

export default router;
