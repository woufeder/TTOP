<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
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
  reveal: {
    type: String,
    default: 'side',
  },
  widthMode: {
    type: String,
    default: 'container',
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const panelRef = ref(null)
const closeButtonRef = ref(null)
const prevFocused = ref(null)
const setBodyLocked = useBodyLock()

function getFocusable() {
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

function handlePointerDown(event) {
  if (!props.modelValue || !panelRef.value) {
    return
  }

  if (panelRef.value.contains(event.target)) {
    return
  }

  requestClose()
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

  const focusable = getFocusable()

  if (!focusable.length) {
    event.preventDefault()
    panelRef.value?.focus()
    return
  }

  const firstElement = focusable[0]
  const lastElement = focusable[focusable.length - 1]

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

const isScrollReveal = computed(() => props.reveal === 'scroll')

const transitionName = computed(() => (isScrollReveal.value ? 'scroll-lightbox' : 'folio-lightbox'))

const shellClass = computed(() =>
  props.widthMode === 'fit'
    ? ['lightbox-shell', 'lightbox-shell--fit']
    : ['container', 'lightbox-shell', 'lightbox-shell--container'],
)

const panelClass = computed(() => [
  'paper-panel lightbox-panel relative z-10 flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-[28px] text-ink',
  props.widthMode === 'fit' ? getSizeClass() : 'max-w-none',
  isScrollReveal.value ? 'lightbox-panel--scroll' : 'lightbox-panel--side',
])

const rollerClasses = computed(() =>
  isScrollReveal.value
    ? ['lightbox-roller-top', 'lightbox-roller-bottom']
    : ['lightbox-roller-left', 'lightbox-roller-right'],
)

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (typeof document === 'undefined') {
      return
    }

    if (isOpen) {
      prevFocused.value = document.activeElement
      setBodyLocked(true)
      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('pointerdown', handlePointerDown, true)
      await nextTick()
      closeButtonRef.value?.focus()
      return
    }

    setBodyLocked(false)
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('pointerdown', handlePointerDown, true)
    prevFocused.value?.focus?.()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('pointerdown', handlePointerDown, true)
  }

  setBodyLocked(false)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="lightbox-root fixed inset-0 z-[90]"
      :class="modelValue ? 'pointer-events-auto' : 'pointer-events-none'"
      @click.self="requestClose"
    >
      <Transition name="lightbox-overlay" appear>
        <div
          v-if="modelValue"
          class="absolute inset-0 bg-[rgba(6,8,12,0.76)] backdrop-blur-sm"
          aria-hidden="true"
        />
      </Transition>

      <div class="relative flex h-full items-center justify-center" @click="requestClose">
        <div :class="shellClass">
          <Transition :name="transitionName" appear>
            <section
              v-if="modelValue"
              ref="panelRef"
              :class="panelClass"
              role="dialog"
              aria-modal="true"
              :aria-label="title"
              tabindex="-1"
              @click.stop
            >
              <div :class="['lightbox-roller', rollerClasses[0]]" aria-hidden="true" />
              <div :class="['lightbox-roller', rollerClasses[1]]" aria-hidden="true" />

              <header class="lightbox-scroll-header relative z-10 flex items-start justify-between gap-4 border-b border-[rgba(84,46,23,0.1)] px-5 py-4 sm:px-7">
                <div>
                  <p class="text-xs uppercase tracking-[0.42em] text-wine/55">Lightbox</p>
                  <h2 class="mt-2 font-display text-2xl text-ink">{{ title }}</h2>
                </div>

                <button
                  ref="closeButtonRef"
                  type="button"
                  class="keep-round flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(84,46,23,0.14)] bg-white/45 text-xl transition hover:border-oldGold/35 hover:bg-white/75"
                  aria-label="關閉視窗"
                  @click="requestClose"
                >
                  ×
                </button>
              </header>

              <div class="lightbox-scroll-body paper-scroll relative z-10 min-h-0 flex-1 px-5 py-5 sm:px-7 sm:py-6">
                <slot />
              </div>
            </section>
          </Transition>
        </div>
      </div>
    </div>
  </Teleport>
</template>