<template>
	<div>
		<base-card size="big-card">
			<table-controls 
			:show-message-bar="showMessage" 
			:the-message="messageText"
			:error="error"
			button-text="Add New User" 
			button-link="/register"
			class="table-controls"
			/>
			<table class="table table-striped table-light table-bordered mb-0">
				<thead>
					<tr class="table-dark">
						<th class="clickable-header" @click="sortTable('id')">ID</th>
						<th class="clickable-header" @click="sortTable('firstName')">First Name</th>
						<th class="clickable-header" @click="sortTable('lastName')">Last Name</th>
						<th class="clickable-header" @click="sortTable('email')">Email</th>
						<th class="clickable-header" @click="sortTable('userName')">Username</th>
						<th>Info</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody v-if="dataAvailable">
					<tr v-for="user in users" :key="user.id">
						<td>{{ user.id }}</td>
						<td>{{ user.firstName }}</td>
						<td>{{ user.lastName }}</td>
						<td>{{ user.email }}</td>
						<td>{{ user.userName }}</td>
						<td class="buttons-column">
							<base-button mode="image-small" @click="showInfoModal(user)">
								<img src="../../assets/information.png" />
							</base-button>
						</td>
						<td class="buttons-column">
							<base-button mode="image-small" @click="showDeleteModal(user)">
								<img src="../../assets/trash.png" />
							</base-button>
						</td>
					</tr>
				</tbody>
			</table>
			<vue-awesome-paginate v-if="dataAvailable"
			:total-items="totalItems"
			:items-per-page="itemsPerPage"
			:modelValue="currentPage"
			@click="paginate"
			/>
			<empty-table v-if="!dataAvailable" :is-loading="isLoading" :no-data-message="noDataMessage"></empty-table>
			<base-dialog :show="isInfoModalVisible" @close="closeInfoModal">
				<user-card :user="userToBeDisplayed"></user-card>
			</base-dialog>
			<base-dialog 
			:show="ifDeleteModalVisible" 
			@close="closeDeleteModal" 
			first-button-text="Yes" :second-button="true" second-button-text="Cancel">
				{{ deleteModalMessage }}
			</base-dialog>
		</base-card>
	</div>
</template>

<script>
import { ApplicationConstants } from '@/constants/app-constants.js';
import { RestApiConstants } from '@/constants/api-constants';
import User from '@/model/user/user.js';
import UserCard from './UserCard.vue';

export default {
	components: { UserCard },
	provide() {
		return {
			newValueSelected: this.itemsPerPageChanged,
			search: this.searchUsers,
			clear: this.clearSearch
		}
	},
	data() {
		return {
			users: [],
			isLoading: true,
			itemsPerPage: ApplicationConstants.PAGINATION_ITEMS_PER_PAGE,
			currentPage: 1,
			totalItems: 0,
			searchKeyword: null,
			sortCriteria: null,
			sortDirection: null,
			isInfoModalVisible: false,
			userToBeDisplayed: null,
			ifDeleteModalVisible: false,
			userToBeDeleted: null,
			error: null,
			showMessage: false,
			messageText: ''
		}
	},
	computed: {
		deleteModalMessage() {
			if (!this.error) {
				return "Are you sure you want to delete user " + this.userToBeDeleted.userName +
			" (" +  this.userToBeDeleted.firstName + " " + this.userToBeDeleted.lastName + ")?";
			} else {
				return "User " + this.userToBeDeleted.userName + " could not be deleted - (" + this.error + ")"
			}
			
		},
		dataAvailable() {
			return this.users.length > 0 && !this.isLoading;
		},
		noDataMessage() {
			if (this.error) {
				if (this.error == 'Failed to fetch') {
					return "The Server is unavailable.";
				}
				return "Data could not be loaded (" + this.error + ")";
			}
			return "Nothing found on server."
		}
	},
	methods: {
		async loadUsers(page = 0, size = this.itemsPerPage) {
			this.isLoading = true;
			let url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '?pageNo=' + page + '&pageSize=' + size;

			if (this.searchKeyword) {
				url += '&keyword=' + encodeURI(this.searchKeyword);
			} 

			if (this.sortCriteria) {
				url += '&sortBy=' + this.sortCriteria + ':' + this.sortDirection;
			}

			try {
				const response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem('token')
					},
				});

				if (response.ok) {
					const responseData = await response.json();
					const receivedUsers = [];

					for (let value of responseData.content.values()) {
						receivedUsers.push(new User(value));
					}

					this.users = receivedUsers;
					this.currentPage = responseData.number+1,
					this.totalItems = responseData.totalElements
				} else {
					const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
				}
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
			this.isLoading = false;
		},
		async deleteUser() {
			let url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USER + '/' + this.userToBeDeleted.id;

			try {
				const response = await fetch(url, {
					method: "DELETE",
					headers: {
						"Authorization": localStorage.getItem('token')
					},
				});

				if (!response.ok) {
					const responseData = await response.text();
					throw new Error('"' + response.status + ': ' + responseData + '"')
				} 
				
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}

			this.messageText = "The user " + this.userToBeDeleted.userName + " (" + this.userToBeDeleted.firstName + " "
									+ this.userToBeDeleted.lastName + ") ";
			
			if (!this.error) {
				this.messageText += "was sucessfully deleted." 
				this.loadUsers(this.currentPage-1, this.itemsPerPage);
			} else {
				this.messageText += "could not be deleted. - " + this.error; 
			}
			
			this.showMessage = true;
			
			setTimeout(() => { 
				this.showMessage = false;
				this.messageText = '';
				this.error = null;
				this.userToBeDeleted = null;
			}, 5000);

		},
		paginate(page) {
			window.scroll(0,0);
			this.loadUsers(page - 1, this.itemsPerPage); //Vue Awesome Paginate starts paging from 1, and Spring Framework from 0
		},
		itemsPerPageChanged(value) {
			this.itemsPerPage = +value;
			this.loadUsers(0, value);
		},
		searchUsers(event) {
			this.searchKeyword = event.target[0].value;
			this.loadUsers()
		},
		clearSearch(event) {
			if (!event.target.value && this.searchKeyword) {
				this.searchKeyword = null;
				this.loadUsers();
			}
		},
		sortTable(criteria) {
			if (this.sortCriteria === null || this.sortCriteria != criteria) {
				this.sortCriteria = criteria; //If criteria was just setted or changed, set fields
				this.sortDirection = 'asc';
			} else { //else just toggle direction
				this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
			}
			this.loadUsers();
		},
		showInfoModal(user) {
			this.userToBeDisplayed = user;
			this.isInfoModalVisible = true;
		},
		closeInfoModal() {
			this.userToBeDisplayed = null;
			this.isInfoModalVisible = false;
		},
		showDeleteModal(user) {
			this.userToBeDeleted = user;
			this.ifDeleteModalVisible = true;
		},
		closeDeleteModal(mode) {
			if (mode === 'Yes') {
				this.deleteUser();
			}
			this.ifDeleteModalVisible = false;
		}
	},
	created() {
		this.loadUsers();
	}
}
</script>

<style scoped>
.pagination-container {
	display: flex;
    column-gap: 10px;
}
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}
th, td {
	text-align: left;
}
td.buttons-column {
	text-align: left;
	width: 30px;
}
</style>