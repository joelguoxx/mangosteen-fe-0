import { ref } from "vue"

export const useBool = (initialValue: boolean) => {
  const bool = ref(initialValue)
  return {
    bool,
    toggle: () => bool.value = !bool.value,
    on: () => bool.value = true,
    off: () => bool.value = false
  }
}