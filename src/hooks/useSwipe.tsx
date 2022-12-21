import { computed, onMounted, onUnmounted, ref, Ref } from "vue"
type Point = { x: number; y: number }

interface Options {
  beforeStart?: (e: TouchEvent) => void
  afterStart?: (e: TouchEvent) => void
  beforeMove?: (e: TouchEvent) => void
  afterMove?: (e: TouchEvent) => void
  beforeEnd?: (e: TouchEvent) => void
  afterEnd?: (e: TouchEvent) => void
}
export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
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
    options?.beforeStart?.(e)
    swiping.value = true
    end.value = start.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    options?.afterStart?.(e)
  }
  const onMove = ((e: TouchEvent) => {
    options?.beforeMove?.(e)
    if (!start.value) { return undefined }
    end.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    options?.afterMove?.(e)
  })
  const onEnd = ((e: TouchEvent) => {
    options?.beforeEnd?.(e)
    swiping.value = false
    options?.afterEnd?.(e)
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