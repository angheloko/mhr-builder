<template>
  <portal to="snackbar">
    <div class="absolute z-10 mx-auto inset-x-0 bottom-4 rounded shadow-md bg-gray-600 text-white w-80 p-2 text-center text-sm">
      <slot />
    </div>
  </portal>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.show = true
    setTimeout(() => {
      this.show = false
      this.$emit('close')
    }, 3000)
  }
}
</script>

<style scoped>

</style>
