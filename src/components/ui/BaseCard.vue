<template>
  <div :class="size">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: {
    type: String,
    required: false,
    default: null
  }}
}
</script>


<style scoped>
.small-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 700px;
}

.big-card {
  padding: 1rem;
  margin: 2rem auto;
  max-width: 1200px;
}
</style>