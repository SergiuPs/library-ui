<!-- Contains image that displays current avatar/new selected avatar and two options for selecting avatars:
	file from computer or a predefined avatar (files hosted on our site) -->
<template>
	<div>
		<div>
			<img :src="displayedAvatar">
		</div>
		<div v-if="buttonsVisible" class="buttons-container">
			<input type="file" @change="computerFileSelected">
			<button @click.prevent="openLocalAvatarsModal">Our Avatars</button>
		</div>
		<base-dialog 
		:show="showLocalAvatarModal" 
		@close="closeLocalAvatarsModal" 
		first-button-text="Confirm Selected">
			<the-avatars @local-avatar-selected="localAvatarSelected"></the-avatars>
		</base-dialog>
	</div>
</template>

<script>
import { ApplicationConstants } from '@/constants/app-constants';
import TheAvatars from '@/components/users/account/TheAvatars.vue';

export default {
	components: { TheAvatars },
	props: {
		buttonsVisible: {
			type: Boolean,
			required: false,
			default: true
		},
		currentAvatar: {
			type: String,
			required: false,
			default: 'local/z-no-avatar.png'
		}
	},
	emits: ['newAvatarSelected'],
	data() {
		return {
			newSelectedAvatar: null,
			showLocalAvatarModal: false,
			path: ''
		};
	},
	computed: {
		displayedAvatar() {
			if (this.newSelectedAvatar) {
				return this.newSelectedAvatar;
			}

			const fileName = this.currentAvatar.substring(this.currentAvatar.indexOf('/'));
			if (this.currentAvatar.startsWith('local')) {
				return require(`@/assets/avatars${fileName}`)
			} else {
				return ApplicationConstants.FILE_STORAGE_AVATARS_PATH + fileName;
			}
		}
	},
	methods: {
		computerFileSelected(event) {
			const file = event.target.files[0];
			this.$emit('newAvatarSelected', file);
			const url = URL.createObjectURL(file);
			this.newSelectedAvatar = url;
		},
		openLocalAvatarsModal() {
			this.showLocalAvatarModal = true;
		},
		localAvatarSelected(pathLong, pathShort) {
			this.path = pathShort;
			this.newSelectedAvatar = pathLong;
		},
		closeLocalAvatarsModal(mode) {
			if (mode === 'Confirm Selected') {
				this.$emit('newAvatarSelected', this.path);
			}
			this.showLocalAvatarModal = false;
		}
	}
};
</script>

<style scoped>
.buttons-container {
	display: grid;
	grid-template-columns: 5fr 5fr;
	gap: 10px;
	margin-top: 15px;
}
input[type=file] {
	width: 111px;
	height: 25px;
	border: none;
	justify-self: end;
}
input[type=file]::file-selector-button, button {
	background-color: #e6f6fe;
	border: 2px solid #9addfb;
	border-radius: 3px;
	transition: 1s;
	width: 110px;
	height: 25px;
	font-size: 14px;
	padding: 0;
}
input[type=file]::file-selector-button:hover, button:hover {
	background-color: #8dd6f8;
	border: 2px solid #B0B0B0;
}
</style>