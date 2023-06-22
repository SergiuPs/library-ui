<template>
    <base-card>
        <h4>Add New Address</h4>
        <div class="form-control">
            <label for="street">Street:</label>
            <input type="text" id="street" v-model.trim="street" />
        </div>
        <div class="form-control">
            <label for="city">City:</label>
            <input type="text" id="city" v-model.trim="cityName" />
        </div>
        <div class="form-control">
            <label for="zip">PLZ:</label>
            <input type="text" id="zip" v-model.trim="zip" />
        </div>
        <div class="form-control">
            <label for="region">Region:</label>
            <select id="region" value="select" v-model="selectedRegion">
                <option v-for="region in regions" :key="region">{{ region }}</option>
            </select>
        </div>
        <base-button v-bind:disabled="dataSaved" @click.prevent="save()" type="button">Save Address</base-button>
    </base-card>
</template>

<script>
import { Region } from '../constants/regions';
import City from '../model/city';
import Address from '../model/address';

export default {
   data() {
    return {
        street: '',
        cityName: '',
        zip: '',
        regions: Region,
        selectedRegion: '',
        dataSaved: false
    }
   },
   methods: {
    save() {
       const regionCode = Object.keys(this.regions).find(key => this.regions[key] === this.selectedRegion);
       const city = new City(this.cityName, regionCode);
       const newAddress = new Address(this.street, this.zip, city)
       this.$emit('save-address', newAddress);
       this.dataSaved = true;
    }
   }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 1.2fr 5fr;
}

label {
  font-weight: bold;
  margin-right: 0.5rem;
  line-height: 200%;
  text-align: end;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
