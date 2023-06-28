<template>
  <div class="header-box">
    <div class="left-header">
				<items-per-page-dropdown></items-per-page-dropdown>
		</div>
    <div class="center-header">
      <search-bar></search-bar>
    </div>
    <div class="right-header">
      <base-button  mode="flat" link :to="buttonLink">{{ buttonText }}</base-button>
    </div>
  </div>    
</template>

<script>
import ItemsPerPageDropdown from './ItemsPerPageDropdown.vue';
import SearchBar from './SearchBar.vue';
export default {
  components: {ItemsPerPageDropdown, SearchBar},
  props: ['buttonText', 'buttonLink']
}
</script>

<style scoped>
.header-box {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding-top: 50px;   
}
.left-header, .center-header, .right-header {
  flex: 100px; 
}
.header-box div:nth-of-type(1) {
  text-align: left;
}
.header-box div:nth-of-type(2) {
  align-self: center;
  text-align: center;
}
.header-box div:nth-of-type(3) {
  text-align: right;
}
</style>
