<template>
  <Modal @close="$emit('close')">
    <div class="h-full p-5">
      <div class="w-full">
        <h1 class="mb-6">
          Welcome, hunters!
        </h1>
        <p class="mb-4">
          This simple tool is to help you plan and craft the perfect armor for you.
        </p>
        <p class="mb-4">
          You can start by creating a new empty set or by automatically generating sets base on the skills that you need.
        </p>
        <p class="mb-4">
          To automatically generate a set base on the skills that you need, just click the <span class="inline-block text-sm p-1 rounded bg-blue-600 text-white">Generate</span>
          button.
        </p>
        <p class="mb-6">
          If you have any feedback or would like to report an issue, feel free to drop me a message at
          <a href="https://twitter.com/DonOrDoNot" class="text-blue-600 font-medium">@DonOrDoNot</a>!
        </p>
        <p class="mb-4">
          Don
        </p>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'WelcomeModal',
  components: { Modal }
}
</script>

<style scoped>

</style>
