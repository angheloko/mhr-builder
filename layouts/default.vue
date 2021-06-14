<template>
  <div class="text-gray-600 bg-gray-50 min-h-screen">
    <Nuxt />
    <ModalPortal />
    <SnackbarPortal />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ModalPortal from '../components/ModalPortal'
import SnackbarPortal from '../components/SnackbarPortal'

export default {
  components: { SnackbarPortal, ModalPortal },
  mounted () {
    this.loadSkills()
  },
  methods: {
    ...mapActions({
      loadSkills: 'skills/load'
    })
  }
}
</script>
