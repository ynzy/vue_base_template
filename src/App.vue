<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {test} from '@/stateFactory'
test()
</script>

<template>
  <!-- <RouterView /> -->
  <Home/>
</template>

<style scoped>

</style>
