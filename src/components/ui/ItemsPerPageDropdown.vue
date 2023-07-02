<template>
	<div>
		<select id="items" name="items" v-model="item" @change="newValueSelected(item)">
			<option value="10">10</option>
			<option value="20">20</option>
			<option value="50">50</option>
			<option value="100">100</option>
		</select>
		<label for="items">items/page</label>
	</div>
</template>

<script>
import { ApplicationConstants } from '@/constants/app-constants';
export default {
	inject: [
		'newValueSelected'
	],
	data() {
		return {
			item: ApplicationConstants.PAGINATION_ITEMS_PER_PAGE
		}
	},
}
</script>

<style scoped>
select {
	display: inline-block;
	box-sizing: border-box;
	padding: 0.5em 2em 0.5em 0.5em;
	border: 1px solid #9addfb;
	border-radius: 10px;
	font: inherit;
	line-height: inherit;
	-webkit-appearance: none;
	-moz-appearance: none;
	-ms-appearance: none;
	appearance: none;
	background-repeat: no-repeat;
	background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
	background-position: right 15px top 1em, right 10px top 1em;
	background-size: 5px 5px, 5px 5px;
}
label {
	padding: 5px;
	text-align: bottom;
}
</style>
