<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useBodyLock } from '../../composables/useBodyLock'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'normal',
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const panelRef = ref(null)
const closeButtonRef = ref(null)
const lastFocusedElement = ref(null)
const setBodyLocked = useBodyLock()

function getFocusableElements() {
  return panelRef.value
    ? [
        ...panelRef.value.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ]
    : []
}

function requestClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleKeydown(event) {
  if (!props.modelValue) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    requestClose()
    return
  }

  if (event.key !== 'Tab') {
    return
  }

  const focusableElements = getFocusableElements()

  if (!focusableElements.length) {
    event.preventDefault()
    panelRef.value?.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

function getSizeClass() {
  const sizes = {
    normal: 'max-w-2xl',
    wide: 'max-w-5xl',
    compact: 'max-w-xl',
  }

  return sizes[props.size] || sizes.normal
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (typeof document === 'undefined') {
      return
    }

    if (isOpen) {
      lastFocusedElement.value = document.activeElement
      setBodyLocked(true)
      document.addEventListener('keydown', handleKeydown)
      await nextTick()
      closeButtonRef.value?.focus()
      return
    }

    setBodyLocked(false)
    document.removeEventListener('keydown', handleKeydown)
    lastFocusedElement.value?.focus?.()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeydown)
  }

  setBodyLocked(false)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        class="absolute inset-0 bg-[rgba(6,8,12,0.76)] backdrop-blur-sm"
        aria-label="關閉 lightbox"
        @click="requestClose"
      />

      <section
        ref="panelRef"
        :class="[
          'paper-panel relative z-10 flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-[28px] text-ink',
          getSizeClass(),
        ]"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
      >
        <header class="relative z-10 flex items-start justify-between gap-4 border-b border-[rgba(84,46,23,0.1)] px-5 py-4 sm:px-7">
          <div>
            <p class="text-xs uppercase tracking-[0.42em] text-wine/55">Lightbox</p>
            <h2 class="mt-2 font-display text-2xl text-ink">{{ title }}</h2>
          </div>

          <button
            ref="closeButtonRef"
            type="button"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(84,46,23,0.14)] bg-white/45 text-xl transition hover:border-oldGold/35 hover:bg-white/75"
            aria-label="關閉視窗"
            @click="requestClose"
          >
            ×
          </button>
        </header>

        <div class="paper-scroll relative z-10 min-h-0 flex-1 px-5 py-5 sm:px-7 sm:py-6">
          <slot />
        </div>
      </section>
    </div>
  </Teleport>
</template>