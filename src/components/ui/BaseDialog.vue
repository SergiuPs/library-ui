<template>
	<teleport to="body">
		<div v-if="show" @click="tryClose" class="backdrop"></div>
		<transition name="dialog">
		<dialog open v-if="show">
			<header>
				<slot name="header">
					<h5>{{ title }}</h5>
				</slot>
			</header>
			<div class="modalBody">
				<section>
					<slot></slot>
				</section>
			</div>
			<menu v-if="!fixed">
				<slot name="actions">
					<base-button v-if="firstButton" @click="tryClose(firstButtonText)">{{ firstButtonText }}</base-button>
					<base-button v-if="secondButton" @click="tryClose(secondButtonText)">{{ secondButtonText }}</base-button>
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
		tryClose(mode) {
			if (this.fixed) {
				return;
			}
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
    padding: 1rem;
} 
header h5 {
    margin: 0;
} 
section {
    padding: 1rem;
} 
menu {
    padding: 1rem;
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