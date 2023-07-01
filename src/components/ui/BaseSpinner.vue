<template>
    <div class="spinner"></div>
</template>
  
<style scoped>
.spinner {
	border: 16px solid black;
	border-radius: 50%;
	border-top: 16px solid #c1e1ec;
	border-bottom: 16px solid #c1e1ec;
	width: 120px;
	height: 120px;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
}
  
@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>