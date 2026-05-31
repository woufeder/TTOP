<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <div class="route-stage">
      <Transition name="route-dissolve">
        <div :key="route.fullPath" class="route-stage__layer">
          <component :is="Component" />
        </div>
      </Transition>
    </div>
  </RouterView>
</template>
