<template>
  <div class="layout">
    <div class="text">Vivi Form Builder Test</div>
    <div @click="parserExpanse = true" class="parsers__active">
      Active Parser
    </div>
    <ViviBuilder
      class="builder"
      :options="{ newItemCreatable: true, formList }"
      @onFormDelete="(formId) => deleteForm(formId)"
      @onFormAdd="(newForm) => addForm(newForm)"
      @onFormUpdate="(updatedForm) => updateForm(updatedForm)"
    />
  </div>
  <div v-if="parserExpanse" class="parsers">
    <div @click="parserExpanse = false" class="parsers__btn">X</div>
    <div class="parsers__area">
      <ViviParser
        :form="formList[1]"
        :startValues="{ 0: 'deneme', 1: 'deneme2', 2: 1, 3: 2 }"
        renderType="form"
        @onInputsUpdated="(newValue) => updateParserItems(newValue)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { Messages } from "./builder/interfaces/Messages";

export default defineComponent({
  setup() {
    const parserExpanse = ref<boolean>(false);
    const parserItems = ref<any>({});

    const formList = ref([
      {
        id: 1,
        name: "Alo1",
        nameChangable: true,
        deletable: true,
        canStyleChangable: false,
        canValidationChangable: false,
        itemList: undefined,
        fieldHeaderRequired: true,
      },
      {
        id: 2,
        name: "Alo2",
        description: "aloooo",
        nameChangable: false,
        deletable: false,
        canStyleChangable: true,
        canValidationChangable: true,
        itemList: [
          {
            id: 1,
            queue: 1,
            type: "TextArea",
            properties: {
              header: "Alooo1",
            },
          },
          {
            id: 0,
            queue: 0,
            type: "Text",
            properties: {
              header: "Alooo",
            },
          },
          {
            id: 2,
            queue: 2,
            type: "Select",
            properties: {
              header: "Alooo2",
              values: [
                {
                  id: 1,
                  value: "f",
                },
                {
                  id: 2,
                  value: "f",
                },
              ],
              size: "Full",
            },
          },
          {
            id: 3,
            queue: 3,
            type: "CheckBox",
            properties: {
              header: "Alooo3",
              values: [
                {
                  id: 1,
                  value: "s",
                },
                {
                  id: 2,
                  value: "g",
                },
                {
                  id: 3,
                  value: "e",
                },
              ],
              activeValue: 1,
              size: "Full",
            },
          },
        ],
      },
    ]);

    const deleteForm = (formId: number) => {
      formList.value.forEach((perForm, index) => {
        if (perForm.id == formId) formList.value.splice(index, 1);
      });
    };

    const addForm = (newForm: any) => {
      let availableId = 1;
      formList.value.forEach((item) =>
        item.id >= availableId ? (availableId = item.id + 1) : null
      );
      formList.value.push({ ...newForm, id: availableId });
    };

    const updateForm = (updatedForm: any) => {
      formList.value.forEach((item, index) => {
        if (item.id == updatedForm.id) {
          formList.value[index] = updatedForm;
        }
      });
    };

    const updateParserItems = (newValues: any) => {
      parserItems.value = newValues;
    };

    return {
      formList,
      deleteForm,
      addForm,
      updateForm,
      parserExpanse,
      parserItems,
      updateParserItems,
    };
  },
});
</script>

<style lang="scss">
@import "./Global.scss";
</style>
