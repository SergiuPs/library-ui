<template>
    <div class="no-data">
		<base-spinner type="spinner big" class="center-spinner" v-if="isLoading"></base-spinner>
		<div v-else class="center-div">{{ noDataMessage }}</div>
	</div>
</template>

<script>
export default {
    props: ['isLoading', 'noDataMessage']
}
</script>

<style scoped>
.no-data {
	max-width: 1200px;
	height: 500px;
	background-color: #f1f1f1;
	border-radius: 5px;
	margin: auto;
	font-size: 30px;
	margin-bottom: 30px;
}
</style>