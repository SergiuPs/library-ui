<template>
	<div class="m-se-10"> 
		<div class="user-info-wrapper"> 
			<div class="margin-tb-auto"> 
				<div class="grid-half"> 
					<div class="user-info-block"> 
						<font-awesome-icon class="user-info-icon" icon="user"/>
						<span class="user-info-label">Username:</span>
						<span class="user-info-text">{{ username }}</span>
					</div>
					<div class="user-info-block">
						<font-awesome-icon class="user-info-icon" icon="cake-candles"/>
						<span class="user-info-label">Birth date:</span>
						<span class="user-info-text">{{ formattedBirthDate }}</span> 
					</div>
				</div>
				<div class="grid-half">
					<div class="user-info-block">
						<font-awesome-icon class="user-info-icon" icon="pen"/>
						<span class="user-info-label">First name:</span>
						<span class="user-info-text">{{ firstName }}</span>
					</div>
					<div class="user-info-block">
						<font-awesome-icon class="user-info-icon" icon="pen"/>
						<span class="user-info-label">Last name:</span>
						<span class="user-info-text">{{ lastName }}</span>
					</div>
				</div>
			</div>
			<div class="flex-right"> 
				<base-button class="margin-tb-auto" mode="long" @click="showEditModal">Edit</base-button>
			</div>
		</div>
		<base-dialog :show="isEditModalVisible" :fixed="true" title="Edit Personal Details" @close="closeEditModal">
			<basic-info-edit
			:user-id="userId"
			:username="username"
			:first-name="firstName"
			:last-name="lastName"
			:birth-date="birthDate"
			@close="closeEditModal">
			</basic-info-edit>
		</base-dialog>
	</div>
</template>


<script>
import BasicInfoEdit from '@/components/users/account/BasicInfoEdit.vue';

export default {
	components: { BasicInfoEdit },
	props: ['userId', 'username', 'birthDate', 'firstName', 'lastName'],
	data() {
		return {
			isEditModalVisible: false,
		};
	},
	computed: {
		formattedBirthDate() {
			return this.birthDate ? this.birthDate.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) : '-'; 
		}
	},
	methods: {
		showEditModal() {
			this.isEditModalVisible = true;
		},
		closeEditModal() {
			this.isEditModalVisible = false;
		}
	}
}
</script>
