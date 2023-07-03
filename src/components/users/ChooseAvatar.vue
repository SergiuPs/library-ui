<template>
    <div>
		<div>
			<img :src="displayedAvatar" />
		</div>
		<div class="buttons-container">
			<input type="file" @change="computerFileSelected">
			<button @click.prevent="openAvatarsModal">Our Avatars</button>
		</div>
		<base-dialog 
        :show="showAvatarModal" 
        @close="closeAvatarsModal" 
        first-button-text="Confirm Selected"
        :second-button="true"
        second-button-text="Cancel">
			<the-avatars @image-selected="imageSelected"></the-avatars>
		</base-dialog>
	</div>
</template>

<script>
import TheAvatars from '@/components/users/TheAvatars.vue';

export default {
	components: { TheAvatars },
    emits: ['fileSelected'],
	data() {
		return {
			displayedAvatar: require(`../../assets/avatars/zno-avatar.png`),
			showAvatarModal: false,
            path: ''
		};
	},
	methods: {
		computerFileSelected(event) {
            const file = event.target.files[0];
            this.$emit('fileSelected', null, file);
			const url = URL.createObjectURL(file);
			this.displayedAvatar = url;
		},
        imageSelected(pathLong, pathShort) {
            this.path = pathShort;
			this.displayedAvatar = pathLong;
		},
		openAvatarsModal() {
			this.showAvatarModal = true;
		},
		closeAvatarsModal(mode) {
            if (mode === 'Confirm Selected') {
                this.$emit('fileSelected', this.path, null);
            }
			this.showAvatarModal = false;
		}
	}
};
</script>

<style scoped>
.buttons-container {
	display: grid;
	grid-template-columns: 5fr 5fr;
    gap: 10px;
	margin: 15px;
}
input[type=file] {
	width: 111px;
	height: 31px;
	border: none;
    justify-self: end;
}
input[type=file]::file-selector-button, button {
    border: 1px solid black;
    border-radius: 3px;
    background-color: #e6f6fe;
    transition: 1s;
    width: 110px;
    height: 30px;
    padding: 0;
}
input[type=file]::file-selector-button:hover, button:hover {
    background-color: #8dd6f8;
    border: 2px solid black;
}
</style>