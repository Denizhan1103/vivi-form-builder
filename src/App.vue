<template>
  <div class="layout">
    <div class="text">Vivi Form Builder Test</div>
    <ViviBuilder 
      class="builder" 
      :options="{newItemCreatable: true, formList}"
      @onFormDelete="(formId) => deleteForm(formId)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  setup() {
    const formList = ref([
      {
        id: 1,
        name: 'Alo1',
        nameChangable: true,
        deletable: true,
        canStyleChangable: false,
        canValidationChangable: false,
        itemList: undefined
      },
      {
        id: 2,
        name: 'Alo2',
        description: 'aloooo',
        nameChangable: false,
        deletable: false,
        canStyleChangable: true,
        canValidationChangable: true,
        itemList: [
          {id:0, type: 'Text', properties:{header:'Alooo'}}
        ]
      },
    ])

    const deleteForm = (formId:number) => {
      formList.value.forEach((perForm,index) => {
        if(perForm.id == formId) formList.value.splice(index,1)
      })
    }

    return {
      formList,
      deleteForm
    }
  },
})
</script>

<style lang="scss">
@import "./Global.scss";
</style>