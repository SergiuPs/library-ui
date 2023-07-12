<template>
	<button v-if="!link" :class="mode" :disabled="disabled">
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
		},
        disabled: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>
  
<style scoped>
button,
a {
	text-decoration: none;
    padding: 3px 15px;
    font: inherit;
    font-size: 15px;
    background-color: #e6f6fe;
    border: 2px solid #9addfb;
    color: black;
    cursor: pointer;
    border-radius: 5px;
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
    border-color: #000;
} 
.image {
    background-color: #fff;
    border: 3px solid #9addfb;
}
.image-small {
    background-color: #fff;
    border: 2px solid #9addfb;
    border-radius: 20px;
    margin: 0;
    padding: 10px 20px;
}
.image:hover,
.image:active {
    background-color: #e6f6fe;
    border: 3px solid #000;
}
.image-small:hover,
.image-small:active {
    background-color: #e6f6fe;
    border-color: #9addfb;
}
.flat {
    margin: 0px 0px 15px 0px;
    padding: 0.5rem 3rem;
}
.flat:active, .flat:hover {
    color: red;
}
</style>