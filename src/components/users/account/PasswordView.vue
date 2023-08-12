<template>
	<div class="m-se-10"> 
		<div class="user-info-wrapper"> 
			<div class="user-info-block"> 
				<font-awesome-icon class="user-info-icon" icon="key"/>
				<span class="user-info-label">Password:</span>
				<span class="user-info-password">*************</span> 
			</div>
			<div class="flex-right"> 
				<base-button class="margin-tb-auto" mode="long" @click="showPasswordModal">Edit</base-button>
			</div>
		</div>
		<base-dialog :show="isPasswordModalVisible" :fixed="true" title="Edit password" @close="closePasswordModal">
			<edit-password></edit-password>
		</base-dialog>
	</div>
</template>

<script>
import EditPassword from '@/components/users/account/PasswordEdit.vue';

export default {
	components: { EditPassword },
	data() {
		return {
			isPasswordModalVisible: false
		};
	},
	methods: {
		showPasswordModal() {
			this.isPasswordModalVisible = true;
		},
		closePasswordModal() {
			this.isPasswordModalVisible = false;
		}
	}
}
</script>
