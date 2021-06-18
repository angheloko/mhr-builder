<template>
  <div class="flex items-center px-2 py-1 space-x-2">
    <slot name="navigation" />
    <NuxtLink to="/">
      <Logo class="inline-block h-6 w-auto" />
    </NuxtLink>
    <h1 class="text-lg inline-block flex-grow hidden md:block">
      <NuxtLink to="/">
        Monster Hunter Rise Set Builder
      </NuxtLink>
    </h1>
    <h1 class="text-lg inline-block flex-grow md:hidden">
      <NuxtLink to="/">
        MHRise Builder
      </NuxtLink>
    </h1>
    <slot />
  </div>
</template>

<script>
import Logo from './Logo'
export default {
  name: 'AppBar',
  components: { Logo }
}
</script>

<style scoped>

</style>
