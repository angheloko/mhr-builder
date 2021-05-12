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
          You can use the <span class="inline-block h-full text-sm p-1 rounded bg-blue-600 text-white">Generate</span>
          button to generate sets base on the skills that you need. Of course, you can add and remove any equipment as
          you see fit.
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
