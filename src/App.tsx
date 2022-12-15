import { defineComponent, ref } from "vue";

export const App = defineComponent({
  setup() { 
    const refcount = ref(0)
    const onClick = () => {
      refcount.value +=1
    }
    return () => <>
      <div>
      {refcount.value}
      </div>
      <div>
        <button onClick={onClick}>+1</button>
      </div>
    </>
  }
})