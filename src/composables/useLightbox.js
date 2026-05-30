import { ref } from 'vue'

export function useLightbox(initialValue = null) {
  const isOpen = ref(false)
  const payload = ref(initialValue)

  function open(value) {
    payload.value = value
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    payload,
    open,
    close,
  }
}