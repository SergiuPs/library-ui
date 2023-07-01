<template>
	<div>
		<h2>The Users</h2>
		<div class="transition-wrapper">
			<transition>
				<div v-show="showMessageBar" :class="error ? 'message-error' : 'message-ok'">{{ theMessage }}</div>
			</transition>
		</div>
		<div> 
			<div class="flex-box">
				<div class="left-child">
					<items-per-page-dropdown></items-per-page-dropdown>
				</div>
				<div class="center-child">
					<search-bar></search-bar>
				</div>
				<div class="right-child">
					<base-button  mode="flat" link :to="buttonLink">{{ buttonText }}</base-button>
				</div>
			</div> 
		</div>
	</div>   
</template>

<script>
import ItemsPerPageDropdown from './ItemsPerPageDropdown.vue';
import SearchBar from './SearchBar.vue';

export default {
	components: {ItemsPerPageDropdown, SearchBar},
	props: ['buttonText', 'buttonLink', 'showMessageBar', 'theMessage', 'error']
}
</script>

<style scoped>
.flex-box {
	width: 100%;
	display: flex;
	flex-flow: row wrap;  
}
.left-child, .center-child, .right-child {
	flex: 100px; 
}
.flex-box div:nth-of-type(1) {
	text-align: left;
}
.flex-box div:nth-of-type(2) {
	align-self: center;
	text-align: center;
}
.flex-box div:nth-of-type(3) {
	text-align: right;
}
.v-leave-active {
	transition: opacity 2s ease;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.message-ok {
	background-color: #E0FFD2;
}
.message-error {
	background-color: #FFE1E1;
}
.transition-wrapper {
	height: 30px;
}
h2 {
	margin: 0;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
}
</style>
