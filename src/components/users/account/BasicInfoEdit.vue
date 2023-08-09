<template>
	<div>
		<form @submit.prevent="submitForm">
			<div>
				<label class="input-group-label" for="username">User Name</label>
				<div class="input-group input-group-icon">
					<input type="text" id="username" placeholder="User Name" v-model.trim="newUsername">
					<font-awesome-icon class="input-icon" icon="user" />
				</div>
			</div>
			<div>
				<label class="input-group-label" for="firstname">First Name</label>
				<div class="input-group input-group-icon">
					<input type="text" id="firstname" placeholder="First Name" v-model.trim="newFirstName">
					<font-awesome-icon class="input-icon" icon="pen" />
				</div>
			</div>
			<div>
				<label class="input-group-label" for="lastname">Last Name</label>
				<div class="input-group input-group-icon">
					<input type="text" id="lastname" placeholder="Last Name" v-model.trim="newLastName">
					<font-awesome-icon class="input-icon" icon="pen" />
				</div>
			</div>
			<div>
				<label class="input-group-label" id="birthdate">Birth Date</label>
				<div class="input-group input-group-icon mb-0">
					<input class="date-input" type="text" placeholder="DD" aria-labelledby="birthdate" v-model.trim="newBirthDay">
					<span class="lh-40">-</span>
					<input class="month-input" type="text" placeholder="MM" aria-labelledby="birthdate" v-model.trim="newBirthMonth">
					<span class="lh-40">-</span>
					<input class="year-input" type="text" placeholder="YYYY" aria-labelledby="birthdate" v-model.trim="newBirthYear">
					<font-awesome-icon class="input-icon" icon="cake-candles" />
				</div>
			</div>
			<action-button 
			:isLoading="isLoading" 
			:error="error" 
			:animation="animation"
			mode="medium-center"
			button-name="Save"></action-button>
		</form>
	</div>
</template>

<script>
import { patchUser } from '@/services/web-services-user';
import { createOpsForObject, createOpsForDates } from '@/services/patch-operations';

export default {
	emits: ['close'],
	props: ['userId', 'username', 'birthDate', 'firstName', 'lastName'],
	inject: ['updateBasicInfo'],
	data() {
		return {
			isLoading: false,
			error: null,
			animation: true,
			newUsername: this.username,
			newBirthDay: this.birthDate ? this.birthDate.toLocaleDateString("en-GB", {day: "2-digit",}) : '',
			newBirthMonth: this.birthDate ? this.birthDate.toLocaleDateString("en-GB", {month: "2-digit",}) : '',
			newBirthYear: this.birthDate ? this.birthDate.getFullYear() : '',
			newFirstName: this.firstName,
			newLastName: this.lastName,
		};
	},
	methods: {
		async submitForm() {
			this.animation = false;
			this.error = null;
			this.isLoading = false;
			
			const oldBasicInfo = {
				'username': this.username,
				'firstName': this.firstName,
				'lastName': this.lastName,
			}

			const newBasicInfo = {
				'username': this.newUsername,
				'firstName': this.newFirstName,
				'lastName': this.newLastName,
			}
			
			const operations = createOpsForObject(oldBasicInfo, newBasicInfo);

			const newDate = new Date(this.newBirthYear, this.newBirthMonth-1, this.newBirthDay);
			const oldBirthDate = {
				'birthDate': this.birthDate,
			}

			const newBirthDate = {
				'birthDate': newDate,
			}

			const birthdateOperations = createOpsForDates(oldBirthDate, newBirthDate, true);
			operations.push(...birthdateOperations);

			try {
				this.isLoading = true;
				const updatedUser = await patchUser(this.userId, operations);
				this.updateBasicInfo(updatedUser);
				this.$emit('close');
			} catch (error) {
				this.animation = true;
				this.error = 'Data could not be saved';
				setTimeout(() => {	
					this.error = null;
				}, 4000);
			}
			this.isLoading = false;
		}
	}
};
</script>