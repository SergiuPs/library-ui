<template>
    <button v-if="!link" :class="mode">
      <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
      <slot></slot>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      mode: {
        type: String,
        required: false,
        default: null
      },
      link: {
        type: Boolean,
        required: false,
        default: false
      },
      to: {
        type: String,
        required: false,
        default: '/'
      }
    }
  }
  </script>
  
  <style scoped>
  button,
  a {
    text-decoration: none;
    padding: 0.5rem 1rem;
    font: inherit;
    background-color: #9addfb;
    border: 1px solid #9addfb;
    color: black;
    cursor: pointer;
    border-radius: 20px;
    margin: 0.5rem;
    display: inline-block;
  }

  :disabled, :disabled:hover {
    background-color: #e8e9eb;
    cursor: default;
    border: 0px;
  }
  
  a:hover,
  a:active,
  button:hover,
  button:active {
    background-color: #e6f6fe;
    border-color: #9addfb;
  }
  
  .image {
    background-color: #fff;
    border: 3px solid #9addfb;
  }

  .image-small {
    background-color: #fff;
    border: 2px solid #9addfb;
    margin: 0;
  }
  
  .image:hover,
  .image:active {
    background-color: #e6f6fe;
    border: 3px solid #000;
  }

  .flat {
    border-radius: 10px;
    background-color: #e6f6fe;
    margin: 0px 0px 15px 0px;
    padding: 0.5rem 3rem;
  }
  .flat:active, .flat:hover {
    color: red;
    font-size: 20px;
    padding: 0.3rem 2.2rem;
  }
  </style>