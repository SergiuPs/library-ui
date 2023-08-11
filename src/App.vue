<template>
	<div> 
		<the-header class="header"></the-header>
		<div style="height: 60px;"></div>
		<router-view class="router"/>
		<base-dialog :first-button="false" :fixed="true" :show="loginModalVisible" :title="title" @close="closeLoginModal">
			<login-modal></login-modal>
		</base-dialog>
	</div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import LoginModal from '@/views/auth/LoginModal.vue';

export default {
	components: { TheHeader, LoginModal },
	provide() {
		return {
			closeLoginModal: this.closeLoginModal,
			showLoginModal: this.showLoginModal,
			changeModalTitle: this.changeModalTitle
		}
	},
	data() {
		return {
			loginModalVisible: false,
			title: "Welcome"
		}
	},
	methods: {
		showLoginModal() {
			this.loginModalVisible = true;
		},
		closeLoginModal() {
			this.loginModalVisible = false;
		},
		changeModalTitle(title) {
			this.title = title;
		}
	},
	created() {
		this.$store.dispatch('auth/tryLogin')
	},
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
html {
    overflow-y: scroll;
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
.flex-right {
	display: flex;
	justify-content: right;
}
.flex-left {
	display: flex;
	justify-content: left;
}
.flex-stretch {
	flex-basis: 100%;
}
.grid-half {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
.lh-40 {
	line-height: 40px;
}
.m-se-10 {
	margin: 0 10px;
}
.m-30-10 {
	margin: 30px 10px;
}
.clean-button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
/*Form inputs with icon*/
.input-group ,
.input-group > select,
.input-group > select option {
	width: 100%;
	line-height: 1;
	background-color: #F5F5F5;
	border: 3px solid #e6f6fe;
	-webkit-transition: 0.35s ease-in-out;
	-moz-transition: 0.35s ease-in-out;
	-o-transition: 0.35s ease-in-out;
	transition: 0.35s ease-in-out;
	transition: all 0.35s ease-in-out;
}
.input-group > input {
	width: 100%;
	height: 100%;
	padding: 11px;
	border: none;
	background-color: #F5F5F5;
}
.input-group > input:focus  {
	outline: 2px solid #add8e6;	
}
.input-group > .date-input {
	width: 95px;
	text-align: center;
	padding: 11px 2px 11px 60px;
}
.input-group > .month-input {
	width: 40px;
	padding: 11px 2px;
	text-align: center;
}
.input-group > .year-input {
	width: 60px;
	padding: 11px 2px;
	text-align: center;
}
.input-group > .date-input:focus,
.input-group > .month-input:focus,
.input-group > .year-input:focus {
	background-color: #e6f6fe;
	background-clip: content-box;
	outline: none;
}
.input-group > input:focus ~ .input-icon {
	color: #add8e6;
}
.input-group > input:focus + .input-icon:after {
	border-right-color: #87cefa;
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
	padding-left: 70px;
}
.input-group-icon .input-icon {
	position: absolute;
	top: 0;
	left: 0;
	width: 15px;
	height: 15px;
	padding: 15px 28px;
	text-align: center;
	pointer-events: none;
	color: grey;
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
.input-group-label {
	border: 2px solid #e6f6fe;
	border-bottom: none;
	padding: 2px 10px;
	font-size: 12px;
}
.security-code {
	width: 250px;
}
.security-code-wrapper {
	display: flex;
	justify-content: center;
	width: 255px;
}
/*PersonalDetails/EditUser subcomponents*/
.user-info-wrapper {
	margin-top: 20 px;
	display: grid;
	grid-template-columns: 7fr 2fr;
}
.user-info-block {
	text-align: left;
	margin: 15px 0px;
}
.user-info-icon {
	width: 20px;
	height: 20px;
	pointer-events: none;
	color: #888888;
}
.user-info-label {
	margin-left: 10px;
	font-size: 13px;
}
.address-card-wrapper {
	background-color: #F8F8F8;
	border: 2px solid #e6f6fe;
	border-radius: 5px;
	margin: 10px;
	padding: 20px 10px;
	width: 280px;
	height: 320px;
}
</style>
