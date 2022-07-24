import { createApp, reactive } from 'vue'
import App from './App.vue'
import ViviFormBuilder from "./builder/App"
import { setLocale } from "./builder/App"
import type { Messages } from './builder/interfaces/Messages'

const messages = reactive<Messages>({
    mainPage: {
        headerTitle: 'Form buildere hoşgeldin',
        headerDescription: 'Hayalindeki formu yalnızca sürükleyerek oluşturabilirsin.',
        createFormButton: 'Yeni Bir Tane Oluştur',
        haveZeroForm: 'Hiç Form Yok',
        yourForms: 'Formların',
        notSetFormDescription: 'Herhangi bir açıklama yok.',
        updateFormButton: 'Güncelle',
        deleteFormButton: 'Sil',
        // naming err
        addFormButton: 'Yeni Form Oluştur'
    },
    builderPage: {
        header: {
            formName: 'Form Adı',
            formInputPlaceholder: 'Lütfen form adını girin...',
            saveFormButton: 'Şuanki Formu Kaydet'
        },
        layout: {
            underConstructor: 'Yapım Aşamasında',
            dragDrop: 'Sürükle & Bırak',
            updateButton: 'Güncelle',
            deleteButton: 'Sil',
            addHere: 'Buraya Ekle'
        },
        fieldNames: {
          inputs: 'Girdiler',
          properties: 'Ayarlar',
          styles: 'Stiller',
          validations: 'Validasyonlar'
        },
        inputField: {
            textInput: 'Yazı',
            numberInput: 'Sayı',
            dateInput: 'Tarih',
            timeInput: 'Saat',
            textAreaInput: 'Yazı Alanı',
            selectInput: 'Seçim',
            checkBoxInput: 'Onay Kutusu'
        },
        propertyField: {
            titleTitle: 'Başlık',
            titlePlaceholder: 'Başlık...',
            placeholderTitle: 'Açıklama',
            placeholderPlaceholder: 'Açıklama...',
            startingTextTitle: 'Başlangıç Yazısı',
            startingTextPlaceholder: 'Başlangıç Yazısı...',
            startingItemTitle: 'Başlangıç İtemi',
            startingItemPlaceholder: 'Başlangıç İtemi...',
            inputSizeTitle: 'Girdi Boyutu',
            inputSizeFull: 'Tam',
            inputSizeHalf: 'Yarım',
            inputValuesTitle: 'Input Değerleri',
            inputValuesItemTitle: 'Değer',
            inputValuesItemPlaceholder: 'Değer...',
            inputValuesDeleteButton: 'Sil',
            inputValuesAddButton: 'Yeni Değer Ekle',
            notSelectAnyItem: 'Herhangi Bir Item Seçmedin.'
        },
        styleField: {},
        validationField: {}
    },
    defaultInputs: {
        title: 'Başlık Yazısı',
        placeholder: 'Açıklama...',
        validation: 'Yapım Aşamasında',
        checkboxPlaceholder: 'Herhangi bir opsiyon yok...'
    }
})
  
setLocale(messages)

createApp(App).use(ViviFormBuilder).mount('#app')
