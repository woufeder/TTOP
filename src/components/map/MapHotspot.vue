<script setup>
defineProps({
  point: {
    type: Object,
    required: true,
  },
})

defineEmits(['select'])
</script>

<template>
  <button
    type="button"
    class="group absolute -translate-x-1/2 -translate-y-1/2"
    :style="{ left: `${point.x}%`, top: `${point.y}%` }"
    :aria-label="`查看 ${point.name}`"
    @click="$emit('select', point)"
  >
    <span class="keep-round absolute inset-0 h-5 w-5 animate-ping rounded-full bg-oldGold/30" />
    <span class="keep-round relative flex h-5 w-5 items-center justify-center rounded-full border border-parchment/80 bg-wine text-[0.6rem] text-parchment shadow-halo">
      •
    </span>
    <span
      class="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[rgba(10,12,20,0.78)] px-3 py-1 text-[0.7rem] tracking-[0.18em] text-parchment/80 shadow-lg lg:block"
    >
      {{ point.name }}
    </span>
  </button>
</template>