<template>
	<the-header class="header"></the-header>
	<div style="height: 60px;"></div>
	<router-view class="router"/>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
	components: { TheHeader },
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
.list-clean-hr {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
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
</style>
