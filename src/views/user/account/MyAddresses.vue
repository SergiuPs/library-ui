<template>
    <div class="account-section">
        <h3>My Addresses</h3>
        <div> 
            <ul class="list-clean-hr">
                <li v-for="(adress, index) in addresses" :key="adress" style="float: left">
                    <address-card :addresses="addresses" :index="index" @address-edited="addressEdited"></address-card>
                </li>
                <li>
                    <base-button  type="button" mode="image" @click="openNewAddressModal">
                        <img src="@/assets/home-button.png" />
                        <br> Add Address
                    </base-button>
                </li>
            </ul>
        </div>
        <base-dialog :show="isNewAddressModalVisible" :fixed="true" title="Add New Address" @close="closeNewAddressModal">
            <address-form :addresses="addresses" @address-saved="addressSaved"></address-form>
        </base-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { RestApiConstants } from '@/constants/api-constants';
import Address from '@/model/user/address.js';
import AddressCard from '@/components/users/account/AddressCard.vue';
import AddressForm from '@/components/users/account/AddressForm.vue';

export default {
    components: { AddressCard, AddressForm },
    data() {
		return {
            isLoading: true,
			addresses: [],
            isNewAddressModalVisible: false
		};
	},
    computed: {
		...mapGetters({
			userId: 'auth/userId'
		})
	},
    methods: {
        async loadAddresses() {
            const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + this.userId + '/addresses';

			try {
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                });
            
                if (response.ok) {
                    const responseData = await response.json();
                    const receivedAddresses = [];

					for (let value of responseData) {
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
                    this.addresses = receivedAddresses;
                } else {
                    const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
                }
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        openNewAddressModal() {
            this.isNewAddressModalVisible = true;
        },
        addressSaved(receivedAddresses) {
            this.addresses = receivedAddresses;
            this.closeNewAddressModal();
        },
        closeNewAddressModal() {
            this.isNewAdressModalVisible = false;
        },
        addressEdited(receivedAddresses) {
            this.addresses = receivedAddresses;
        }
    },
    created() {
        this.loadAddresses();
    }
}
</script>
