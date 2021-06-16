<template>
  <Modal
    @close="$emit('close')"
  >
    <div class="h-full px-4 pb-4">
      <div class="w-full">
        <p class="mb-4">
          <a href="https://github.com/angheloko/mhr-builder" class="text-blue-600 font-bold">mhr-builder</a> is an
          <strong class="font-bold">open-source</strong> web app that lets you plan, compare, and generate sets for
          Monster Hunter Rise.
        </p>
        <p class="mb-4">
          If you see any problems with the data, found any bugs, or would like to suggest a new feature, please
          <a href="https://github.com/angheloko/mhr-builder/issues" class="text-blue-600 font-bold">submit an issue</a> or
          <a href="mailto:angheloko@gmail.com" class="text-blue-600 font-bold">drop me an email</a>.
        </p>
        <p>
          Happy hunting!
        </p>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'AboutModal',
  components: { Modal }
}
</script>

<style scoped>

</style>
