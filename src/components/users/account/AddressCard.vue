<template>
    <div class="wrapper">
        <h4>{{ displayedAddress.recipient.firstName + ' ' + displayedAddress.recipient.lastName }}</h4>
        <div class="mt-3">
            <div>{{ displayedAddress.street}}</div>
            <div>{{ displayedAddress.zip }}</div>
            <div>{{ displayedAddress.city.name }}</div>
            <div>Germany</div>
        </div>
        <div class="checkboxes-wrapper">
            <div v-show="displayedAddress.defaultBillingAddress" class="flex-center">
                <img src="../../../assets/icons/check.png" />
                <p>Default Billing Address</p>
            </div>
            <div v-show="displayedAddress.defaultShippingAddress" class="flex-center">
                <img src="../../../assets/icons/check.png" />
                <p>Default Delivery Address</p>
            </div>
        </div>
        <div class="flex-center"> 
            <base-button class="flex-stretch" @click="showEditModal">Edit</base-button>
            <base-button class="flex-stretch" mode="danger" @click="showDeleteModal">Delete</base-button>
        </div>
        <div> 
            <base-dialog :show="isEditModalVisible" :fixed="true" title="Edit address" @close="closeEditModal">
                <address-form :addresses="addresses" :index="index" @address-saved="addressEdited"></address-form>
            </base-dialog>
        </div>
        <div> 
            <base-dialog 
			:show="isDeleteModalVisible" 
			@close="closeDeleteModal" 
			first-button-text="Yes" :second-button="true" second-button-text="Cancel">
            Are you sure you want to delete Address: {{ displayedAddress.street }} {{ displayedAddress.city.name }}?
			</base-dialog>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { RestApiConstants } from '@/constants/api-constants';
import AddressForm from '@/components/users/account/AddressForm.vue';
import Address from '@/model/user/address';

export default {
    components: { AddressForm },
    props: ['addresses', 'index'],
    emits: ['address-edited'],
    data() {
        return {
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            displayedAddress: this.addresses[this.index],
            error: null,
            isLoading: false
        }
    },
    computed: {
		...mapGetters({
			userId: 'auth/userId'
		})
	}, 
    methods: {
        showEditModal() {
            this.isEditModalVisible = true;
        },
        addressEdited(receivedAddresses) {
            this.$emit('address-edited', receivedAddresses);
            this.closeEditModal();
        },
        closeEditModal() {
            this.isEditModalVisible = false;
        },
        showDeleteModal() {
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal(mode) {
            if (mode === 'Yes') {
				this.deleteAddress();
			}
            this.isDeleteModalVisible = false;
        },
        async deleteAddress() {
            const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + this.userId;

            const removeOp = {
                "op" : "remove",
                "path" : "/addresses/" + this.index
            }

			try {
				const response = await fetch(url, {
					method: 'PATCH',
					body: JSON.stringify([removeOp]),
					headers: {
						"Content-Type": "application/json-patch+json",
						"Authorization": localStorage.getItem('token')
					},
				});
				
				if (response.ok) {
					const responseData = await response.json();
					const receivedAddresses = [];

					for (let value of responseData.addresses) {
						receivedAddresses.push(
                            new Address(value.id,
                                    value.version,
                                    value.recipient, 
                                    value.street,
                                    value.zip,
                                    value.city,
                                    value.defaultBillingAddress,
                                    value.defaultShippingAddress));
					}
                    
					this.$emit('save-address', receivedAddresses);
				} else {
					const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
				}
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
			this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.wrapper {
    border: 1px solid #9addfb;
	border-radius: 7px;
    margin: 10px;
    padding: 20px 10px;
    width: 280px;
    height: 320px;
}
.checkboxes-wrapper {
    margin-top: 20px;
    height: 75px;
}
p {
    text-align: left;
    margin-left: 10px;
    font-size: 12px;
}
img {
    width: 10px;
    height: 10px;
}
</style>
