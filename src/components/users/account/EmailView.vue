<template>
	<div class="m-se-10"> 
		<div class="user-info-wrapper"> 
			<div class="user-info-block"> 
				<font-awesome-icon class="user-info-icon" icon="at"/>
				<span class="user-info-label">E-Mail:</span>
				<span class="user-info-text">{{ email }}</span> 
			</div>
			<div class="flex-right"> 
				<base-button class="margin-tb-auto" mode="long" @click="showEditModal">Edit</base-button>
			</div>
		</div>
		<base-dialog :show="isEditModalVisible" :fixed="true" title="Edit email" @close="closeEditModal">
			<email-edit :userId="userId" :username="username" :email="email" :self-edit="selfEdit" @close="closeEditModal"></email-edit>
		</base-dialog>
	</div>
</template>

<script>
import EmailEdit from '@/components/users/account/EmailEdit.vue';

export default {
	components: { EmailEdit },
	props: ['userId', 'username', 'email'],
	data() {
		return {
			isEditModalVisible: false,
			selfEdit: true
		};
	},
	methods: {
		showEditModal() {
			this.isEditModalVisible = true;
		},
		closeEditModal() {
			this.isEditModalVisible = false;
		}
	},
	created() {
		if (this.$route.params.id) {
			this.selfEdit = false;
		}
	}
}
</script>