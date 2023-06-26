<template>
  <form role="search" @submit.prevent="search">
    <input class="search-bar" type="search" placeholder="Search" aria-label="Search" @input="clear">
    <button class="search-button" type="submit"><img src="../../assets/find.png" /></button>
  </form>
</template>

<script>
export default {
	inject: [
		'search',
		'clear'
	],
}
</script>

<style scoped>
.search-bar {
	padding: 0.5em 2em 0.55em 0.5em;
  border: 1px solid #9addfb;
	border-radius: 10px 0px 0px 10px;
  margin-bottom: 15px;
}
.search-button {
  padding: 0.5em;
  border: 1px solid #9addfb;
	border-radius: 0px 10px 10px 0px;
  margin-bottom: 15px;
}
.search-bar:focus {
	outline-color: #9addfb;
}
</style>