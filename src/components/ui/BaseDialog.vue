<template>
	<teleport to="body">
		<div v-if="show" class="backdrop"></div>
		<transition name="dialog">
		<dialog open v-if="show">
			<header>
				<slot name="header">
					<h5>{{ title }}</h5>
				</slot>
				<button class="clean-button" @click="close">
					<font-awesome-icon class="fa-icon" icon="circle-xmark"/>
				</button>
			</header>
			<div class="modalBody">
				<section>
					<slot></slot>
				</section>
			</div>
			<menu v-if="!fixed">
				<slot name="actions">
					<base-button v-if="firstButton" @click="close(firstButtonText)">{{ firstButtonText }}</base-button>
					<base-button v-if="secondButton" @click="close(secondButtonText)">{{ secondButtonText }}</base-button>
				</slot>
			</menu>
        </dialog>
      </transition>
    </teleport>
</template>
  
<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: false,
		},
		fixed: {
			type: Boolean,
			required: false,
			default: false,
		},
        firstButton: {
			type: Boolean,
			required: false,
			default: true,
		},
		firstButtonText: {
			type: String,
			required: false,
			default: 'Close'
		},
        secondButton: {
			type: Boolean,
			required: false,
		},
		secondButtonText: {
			type: String,
			required: false,
		},
    },
    emits: ['close'],
    methods: {
		close(mode) {
			this.$emit('close', mode);
		},
	},
};
</script>
  
<style scoped>
.backdrop {
	position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
} 
dialog {
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: white;
}
.modalBody {
    overflow-y: auto;
    max-height: 600px;
} 
header {
    background-color: #e6f6fe;
    color: black;
    width: 100%;
    padding: 10px 30px;
	display: flex; 
	justify-content: space-between;
} 
header h5 {
    margin: auto 0;
	
	text-align: center;
}
.fa-icon {
	width: 27px;
	height: 27px;
	margin-top: 5px;
} 
section {
    padding: 30px;
} 
menu {
    padding: 30px;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}
.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
.dialog-enter-active {
    transition: all 0.3s ease-out;
}
.dialog-leave-active {
    transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: scale(1);
}
@media (min-width: 768px) {
    dialog {
      left: calc(50% - 20rem);
      width: 40rem;
    }
}
</style>