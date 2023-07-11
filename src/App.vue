<template>
	<div>
		<the-header class="header"></the-header>
		<div style="height: 60px;"></div>
		<router-view class="router"/>
		<base-dialog :first-button="false" :show="loginModalVisible" title="Login" >
			<user-login @logged-in="closeModal"></user-login>
		</base-dialog>
	</div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import UserLogin from '@/views/auth/UserLogin.vue';

export default {
	components: { TheHeader, UserLogin },
	provide() {
		return {
			closeLoginModal: this.closeModal,
			showLoginModal: this.showModal
		}
	},
	data() {
		return {
			loginModalVisible: false
		}
	},
	methods: {
		showModal() {
			this.loginModalVisible = true;
		},
		closeModal() {
			this.loginModalVisible = false;
		}
	},
	created() {
		this.$store.dispatch('auth/tryLogin')
	}
}
</script>


<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
nav {
	padding: 30px;
}
nav a {
	font-weight: bold;
	color: #2c3e50;
}
nav a.router-link-exact-active {
	color: #000;
	font-weight: bold;
}
.pagination-container {
	display: flex;
	column-gap: 10px;
	margin: 20px;
}
.paginate-buttons {
	height: 40px;
	width: 40px;
	border-radius: 20px;
	cursor: pointer;
	background-color: rgb(242, 242, 242);
	border: 1px solid rgb(217, 217, 217);
	color: black;
}
.paginate-buttons:hover {
	background-color: #d8d8d8;
}
.active-page {
	background-color: #e6f6fe;
	border: 1px solid #3498db;
	color: black;
}
.active-page:hover {
	background-color: #2988c8;
}
.header {
    position:fixed; 
    left:0; 
    top:0;
    width:100vw;
    z-index:200;
    height:60px;
}
.router {
	position: sticky;
	top: 60px;
	z-index: 2;
	background-color: white;
}
.list-clean-hr {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
.flex-right {
	display: flex;
	justify-content: right;
}
.margin-tb-auto {
	margin-bottom: auto; 
	margin-top: auto;
}
.center-div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.center-spinner {
	position: absolute;
	top: 50%;
	left: 46%;
	transform: translate(-50%, -50%);
}
.clickable-header {
	cursor: pointer;
}
.table-controls {
	position: sticky;
	top: 60px;
	z-index: 2;
	background-color: white;   
	padding-top: 20px;
}
.flex-center {
	display: flex;
	justify-content: center;
}
/*Form inputs with icon*/
.input-group > input {
	width: 100%;
	padding: 13px;
	line-height: 1;
	background-color: #fff;
	border: 2px solid #e6f6fe;
	border-radius: 5px;
	-webkit-transition: 0.35s ease-in-out;
	-moz-transition: 0.35s ease-in-out;
	-o-transition: 0.35s ease-in-out;
	transition: 0.35s ease-in-out;
	transition: all 0.35s ease-in-out;
}
.input-group > input:focus {
	outline: 0;
	border-color: #bd8200;
}
.input-group > input:focus + .input-icon i {
	color: #f0a500;
}
.input-group > input:focus + .input-icon:after {
	border-right-color: #f0a500;
}
.input-group {
	margin-bottom: 20px;
	zoom: 1;
}
.input-group:before,
.input-group:after {
	content: "";
	display: table;
}
.input-group:after {
	clear: both;
}
.input-group-icon {
	position: relative;
}
.input-group-icon input {
	padding-left: 4.4em;
}
.input-group-icon .input-icon {
	top: 0;
	left: 0;
	width: 22px;
	height: 22px;
	padding: 13px;
	text-align: center;
	pointer-events: none;
}
.input-group-icon .input-icon:after {
	position: absolute;
	top: 0.6em;
	bottom: 0.6em;
	left: 3.4em;
	display: block;
	border-right: 1px solid #e5e5e5;
	content: "";
	-webkit-transition: 0.35s ease-in-out;
	-moz-transition: 0.35s ease-in-out;
	-o-transition: 0.35s ease-in-out;
	transition: 0.35s ease-in-out;
	transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
	-webkit-transition: 0.35s ease-in-out;
	-moz-transition: 0.35s ease-in-out;
	-o-transition: 0.35s ease-in-out;
	transition: 0.35s ease-in-out;
	transition: all 0.35s ease-in-out;
} 
</style>
