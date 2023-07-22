<template>
    <form class="ms-3 me-3" @submit.prevent="submitForm">
		<div class="input-group">
			<select addressId="title" value="select" v-model="selectedTitle">
                <option v-for="title in titles" :key="title">{{ title }}</option>
            </select>
		</div>
		<div class="input-group input-group-icon">
			<input type="text" placeholder="First name" v-model.trim="firstName">
			<font-awesome-icon class="input-icon" icon="pen" />
		</div>
		<div class="input-group input-group-icon">
			<input type="text" placeholder="Last Name" v-model.trim="lastName">
			<font-awesome-icon class="input-icon" icon="pen" />
		</div>
		<div class="input-group input-group-icon">
			<input type="text" placeholder="Street" v-model.trim="street">
			<font-awesome-icon class="input-icon" icon="pen" />
		</div>
		<div class="input-group input-group-icon">
			<input type="text" placeholder="City" v-model.trim="cityName">
			<font-awesome-icon class="input-icon" icon="pen" />
		</div>
		<div class="input-group input-group-icon">
			<input type="text" placeholder="Zip" v-model.trim="zip">
			<font-awesome-icon class="input-icon" icon="pen" />
		</div>
		<div class="input-group">
			<select id="region" value="select" v-model="selectedRegion">
                <option v-for="region in regions" :key="region">{{ region }}</option>
            </select>
		</div>
        <div class="mt-4" v-if="addresses.length > 1">
			<div class="checkbox-wrapper">
				<input name="billing-default"
				id="billing" type="checkbox"
				value="defaultBillingChecked"
				:disabled="disableDefaultBilling"
				v-model="defaultBillingChecked" />
				<label for="billing">Set as default Billing Address</label>
			</div>
			<div class="checkbox-wrapper">
				<input name="shipping-default"
				id="shipping" type="checkbox"
				value="defaultShippingChecked"
				:disabled="disableDefaultShipping"
				v-model="defaultShippingChecked" />
				<label for="shipping">Set as default Shipping Address</label>
			</div>
		</div>
		<action-button 
		:error="error" 
		:isLoading="isLoading" 
		:animation="animation" 
		button-name="Save">
		</action-button>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { RestApiConstants } from '@/constants/api-constants';
import { createOpsForAddress } from '@/services/utils';
import { Region } from '@/model/user/region';
import { RecipientTitle } from '@/model/user/recipient-title';
import City from '@/model/user/city';
import Address from '@/model/user/address';
import Recipient from '@/model/user/recipient';


export default {
	props: ['addresses', 'index'], //index undefined - adding new address, else - editing address
	emits: ['address-saved'],
	data() {
		return {
			addressId: null,
			addressVersion: null,
			recipientId: null,
			recipientVersion: null,
			selectedTitle: '',
			firstName: '',
			lastName: '',
			street: '',
			cityId: null,
			cityVersion: null,
			cityName: '',
			zip: '',
			selectedRegion: '',
			defaultBillingChecked: this.addresses.length == 0 ? true : false,
			defaultShippingChecked: this.addresses.length == 0 ? true : false,	
			error: null,
			isLoading: false,
			animation: true,
			titles: RecipientTitle,
			regions: Region
		}
	},
	computed: {
		...mapGetters({
			userId: 'auth/userId'
		}),
		disableDefaultBilling() {
			return this.index >= 0 && this.addresses[this.index].defaultBillingAddress;
		},
		disableDefaultShipping() {
			return this.index >= 0 && this.addresses[this.index].defaultShippingAddress;
		}
	},
	methods: {
		async submitForm() {
			const regionCode = Object.keys(this.regions).find(key => this.regions[key] === this.selectedRegion);
			const city = new City(this.cityId, this.cityVersion, this.cityName, regionCode);
			const titleCode = Object.keys(this.titles).find(key => this.titles[key] === this.selectedTitle);
			const recipient = new Recipient(this.recipientId, this.recipientVersion, titleCode, this.firstName, this.lastName);
			
			const newAddress = new Address(this.addressId,
										this.addressVersion,
										recipient,
										this.street,
										this.zip,
										city,
										this.defaultBillingChecked,
										this.defaultShippingChecked);

			const patchOperations = createOpsForAddress(newAddress, this.addresses, this.index, this.defaultBillingChecked, this.defaultShippingChecked);
			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + this.userId;

			try {
				const response = await fetch(url, {
					method: 'PATCH',
					body: JSON.stringify(patchOperations),
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
                    
					this.$emit('address-saved', receivedAddresses);
				} else {
					const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
				}
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
			this.isLoading = false;
		},
		close() {
			this.$emit('close-modal', this);
		}
	},
	created() {
		if (this.index >= 0) {
			const {id, version, recipient, street, city, zip, defaultBillingAddress, defaultShippingAddress} = this.addresses[this.index];

			this.addressId = id;
			this.addressVersion = version;

			switch(recipient.title) {
				case 'MR': this.selectedTitle = this.titles.MR; break;
				case 'MS': this.selectedTitle = this.titles.MS; break;
			}
			this.recipientId = recipient.id;
			this.recipientVersion = recipient.version;
			this.firstName = recipient.firstName;
			this.lastName = recipient.lastName;

			this.street = street;
			this.zip = zip;

			this.cityId = city.id;
			this.cityVersion = city.version;
			this.cityName = city.name;
			switch (city.region) { //Fix this
				case 'BW' : this.selectedRegion = this.regions.BW; break;
				case 'BY' : this.selectedRegion = this.regions.BY; break;
				case 'BE' : this.selectedRegion = this.regions.BE; break;
				case 'BB' : this.selectedRegion = this.regions.BB; break;
				case 'HB' : this.selectedRegion = this.regions.HB; break;
				case 'HH' : this.selectedRegion = this.regions.HH; break;
				case 'HE' : this.selectedRegion = this.regions.HE; break;
				case 'MV' : this.selectedRegion = this.regions.MV; break;
				case 'NI' : this.selectedRegion = this.regions.NI; break;
				case 'NW' : this.selectedRegion = this.regions.NW; break;
				case 'RP' : this.selectedRegion = this.regions.RP; break;
				case 'SL' : this.selectedRegion = this.regions.SL; break;
				case 'SN' : this.selectedRegion = this.regions.SN; break;
				case 'ST' : this.selectedRegion = this.regions.ST; break;
				case 'SH' : this.selectedRegion = this.regions.SH; break;
				case 'TH' : this.selectedRegion = this.regions.TH; break;
			}
			this.defaultBillingChecked = defaultBillingAddress;
			this.defaultShippingChecked = defaultShippingAddress;
			
		}
	}
}
</script>

<style scoped>
.checkbox-wrapper {
	display: grid;
	grid-template-columns: 1fr 20fr;
	margin-top: 15px;
}
.checkbox-wrapper > label {
	font-weight: normal;
	margin-left: 20px;
	line-height: 125%;
	text-align: start;
}
</style>
