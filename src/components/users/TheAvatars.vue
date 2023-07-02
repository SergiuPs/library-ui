<template>
    <div>
		<button 
		v-for="image in images" 
		:key="image"  
		@click="imageSelected(image.pathLong, image.pathShort)"
		:class="image.pathShort === selectedAvatar ? 'selected' : ''">
			<img :src="image.pathLong">
		</button>
	</div>
</template>

<script>

export default {
	emits: ['imageSelected'],
	data() {
		return {
			images: [],
			selectedAvatar: null
		};
	},
	mounted() {
		this.importAll(require.context('@/assets/avatars/', true, /\.png$/));
	},
	methods: {
		importAll(avatars) {
			avatars.keys().forEach(key => (this.images.push({ pathLong: avatars(key), pathShort: key })));
		},
		imageSelected(pathLong, pathShort) {
			this.selectedAvatar = pathShort;
			this.$emit('image-selected', pathLong, pathShort);
		}
	}
};
</script>

<style scoped>
button {
    background-color: #fff;
    border: none;
    margin: 6px 3.9px;
}
.selected {
	background-color: #e6f6fe;
	border-radius: 20px;
}
</style>