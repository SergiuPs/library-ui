<template>
    <div>
      <base-card size="small-card">
        <h2>Register New User</h2>
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
          <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Registering..." fixed>
          <base-spinner></base-spinner>
        </base-dialog>
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" v-model.trim="firstName" />
          </div>
          <div class="form-control">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" v-model.trim="lastName" />
          </div>
          <div class="form-control">
            <label for="email">E-Mail:</label>
            <input type="email" id="email" v-model.trim="email" />
          </div>
          <div class="form-control">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model.trim="userName" />
          </div>
          <div class="form-control">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model.trim="password" />
          </div>
          <div class="form-control">
            <label for="password-confirm">Confirm password:</label>
            <input type="password" id="password-confirm" v-model.trim="passwordConfirm" />
          </div>
          <div>
            <div v-for="child in children" :key="child.name">
              <component :is="child" @save-address="saveAddress"></component>
            </div>
          </div>
          <base-button @click="addAddressComponent()" type="button" mode="image"><img src="../../assets/home-button.png" /><br> Add Address</base-button>
          <hr>
          <div class="terms-conditions">
            <input name="confirmation" id="confirm" type="checkbox" value="confirm" v-model="confirm" />
            <label for="confirm">I agree with the Terms & Conditions</label>
          </div>
          <p v-if="!formIsValid">To implement validation.</p>
          <hr>
          <base-button>Register</base-button>  
        </form>
      </base-card>
    </div>
  </template>

<script>
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import User from '../../model/user';

export default defineComponent( {
  components: { TheAddress: defineAsyncComponent(() => import("../../components/TheAddress.vue")) },
  setup() {
      const children = ref([])

      const addAddressComponent = () => {
        children.value.push('TheAddress')
      }

      return {
        addAddressComponent,
        children        
      }
    },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      passwordConfirm: '',
      roles: [],
      addresses: [],
      confirm: false,
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    saveAddress(address) {
      this.addresses.push(
        address
      );
    },
    async submitForm() {
      
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.password.length < 8) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const user = new User({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        userName: this.userName,
        password: this.password,
        addresses: this.addresses,
        roles: this.roles
      });

      const actionPayload = {
        newUser: user, 
      };

      try {
        await this.$store.dispatch('register', actionPayload);
        const redirectUrl = '/' + (this.$route.query.redirect || 'confirm');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to register, try later.';
      }

      this.isLoading = false;
    },
    async getRoles() {
    let url = 'http://localhost:8080/api/v1/roles';

     await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
     }).then(function(response) {
      return response.json();
     }).then(function(data) {
      console.log(data);
     });
    },
   
    handleError() {
      this.error = null;
    },
  },
  mounted() {
    //this.getRoles();
  }
});
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 2.2fr 5fr;
}

.terms-conditions {
  display: grid;
  grid-template-columns: 2fr 5fr;
}

.terms-conditions > label {
  font-weight: normal;
  margin-right: 0.5rem;
  line-height: 125%;
  text-align: start;
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
  border-color: #e6f6fe;
  background-color: #faf6ff;
  outline: none;
}

</style>