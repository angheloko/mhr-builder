import Vue from 'vue'

Vue.directive('click-outside', {
  bind (el, binding) {
    const ourClickEventHandler = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event)
      }
    }
    el.__vueClickEventHandler__ = ourClickEventHandler
    document.addEventListener('click', ourClickEventHandler)
  },
  unbind (el) {
    document.removeEventListener('click', el.__vueClickEventHandler__)
  }
})
