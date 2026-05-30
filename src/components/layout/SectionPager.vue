<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

function select(index) {
  emit('update:modelValue', index)
}

function previous() {
  if (!props.items.length) {
    return
  }

  emit('update:modelValue', (props.modelValue - 1 + props.items.length) % props.items.length)
}

function next() {
  if (!props.items.length) {
    return
  }

  emit('update:modelValue', (props.modelValue + 1) % props.items.length)
}
</script>

<template>
  <div v-if="items.length > 1" class="flex items-center gap-3 text-wine/75">
    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(84,46,23,0.14)] bg-white/40 transition hover:border-oldGold/40 hover:bg-white/70"
      aria-label="上一張"
      @click="previous"
    >
      ←
    </button>

    <div class="flex items-center gap-2">
      <button
        v-for="(_, index) in items"
        :key="index"
        type="button"
        class="h-2.5 rounded-full transition"
        :class="index === modelValue ? 'w-8 bg-wine' : 'w-2.5 bg-wine/25 hover:bg-wine/45'"
        :aria-label="`切換到第 ${index + 1} 張`"
        @click="select(index)"
      />
    </div>

    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(84,46,23,0.14)] bg-white/40 transition hover:border-oldGold/40 hover:bg-white/70"
      aria-label="下一張"
      @click="next"
    >
      →
    </button>
  </div>
</template>