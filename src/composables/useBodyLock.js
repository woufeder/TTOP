let lockCount = 0
let previousOverflow = ''
let previousTouchAction = ''

export function useBodyLock() {
  return function setBodyLocked(shouldLock) {
    if (typeof document === 'undefined') {
      return
    }

    if (shouldLock) {
      if (lockCount === 0) {
        previousOverflow = document.body.style.overflow
        previousTouchAction = document.body.style.touchAction
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
      }

      lockCount += 1
      return
    }

    if (lockCount === 0) {
      return
    }

    lockCount -= 1

    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
    }
  }
}