<template>
  <div class="flex items-center px-2 py-1 space-x-2">
    <slot name="navigation" />
    <NuxtLink to="/">
      <Logo class="inline-block h-6 w-auto" />
    </NuxtLink>
    <div class="flex-grow hidden md:flex items-center gap-3">
      <h1 class="text-lg">
        <NuxtLink to="/">
          Monster Hunter Rise Set Builder
        </NuxtLink>
      </h1>
      <div class="text-xs tracking-wider bg-yellow-500 text-white font-bold px-2 py-1 rounded-full">
        Sunbreak
      </div>
    </div>
    <div class="flex-grow md:hidden flex items-center gap-2">
      <div class="text-xs tracking-wider bg-yellow-500 text-white font-bold px-2 py-1 rounded-full">
        Sunbreak
      </div>
    </div>
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
