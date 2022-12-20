import { computed, onMounted, onUnmounted, ref, Ref } from "vue"
type Point = { x: number; y: number }

export const useSwipe = (element: Ref<HTMLElement | null>) => {
  const start = ref<Point>()
  const end = ref<Point>()
  const swiping = ref(false)
  const distance = computed(() => {
    if (!start.value || !end.value) { return undefined }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })
  const direction = computed(() => {
    if (!swiping) { return undefined }
    if (!distance.value) { return undefined }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : "left"
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
    swiping.value = false
    start.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    end.value = undefined
    swiping.value = true
  }
  const onMove = ((e: TouchEvent) => {
    if (!start.value) { return undefined }
    end.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  })
  const onEnd = (() => {
    swiping.value = false
  })
  onMounted(() => {
    if (!element.value) { return undefined }
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) { return undefined }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchstart', onMove)
    element.value.removeEventListener('touchstart', onEnd)
  })
  return {
    swiping, distance, direction, start, end
  }
}