<script setup lang="ts">
import { h, markRaw, resolveComponent } from 'vue'
import { GlobeAltIcon } from '@heroicons/vue/24/outline'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { get, indexOf, set, uniq } from 'lodash'
import Input from '~/components/form/Input.vue'
import Select from '~/components/form/Select.vue'
// import CheckboxGroup from '@/components/Form/CheckboxGroup.vue'
import RadioGroup from '~/components/form/RadioGroup.vue'
// import Switch from '@/components/Form/Switch.vue'
import DatePicker from '~/components/form/DatePicker.vue'
import DateTimePicker from '~/components/form/DateTimePicker.vue'
import ImageUpload from '~/components/form/ImageUpload.vue'
import Textarea from '~/components/form/Textarea.vue'
// import Autocomplelete from '@/components/Form/Autocomplelete.vue'
import MultipartUpload from '~/components/form/MultipartUpload.vue'
import HiddenField from '~/components/form/HiddenField.vue'
// import ArticleEditor from '@/components/Form/ArticleEditor.vue'
// import PermissionTable from '@/components/Form/PermissionTable.vue'
// import TabGroup from '@/components/Form/TabGroup.vue'

const props = defineProps<{
  schema: {
    layout?: string
    fields: [
      {
        label: string
        name: string
        is: string
        type: string
        rules: any
        layout?: string
        initialValue?: any
        onClear?: () => void
      },
    ]
    initValues?: Object
    extraValidation?: Object
    withLang?: boolean
    mainLang?: string
    readonly?: boolean
  }
  onSubmit: (values: Object) => void
}>()

const components = {
  Input,
  Select,
  // CheckboxGroup,
  RadioGroup,
  // Switch,
  DatePicker,
  DateTimePicker,
  ImageUpload,
  Textarea,
  // Autocomplelete,
  // ArticleEditor,
  MultipartUpload,
  // PermissionTable,
  // TabGroup,
}
const lookupComponent = (name: keyof typeof components) => {
  const c = components[name] ?? resolveComponent(name)
  return markRaw(c)
}

const readOnly = computed(() => {
  return props.schema.readonly ?? false
})

const formSettings = reactive({
  ready: true,
  fields: ref(props.schema.fields),
  withLang: props.schema.withLang,
  readonly: readOnly,
  initialValues: computed<{ [key: string]: any }>(
    () => {
      console.log('initialValues', props.schema.initValues)
      const values = props.schema.initValues ?? {}
      return isRef(values) ? values.value : values
    }),
})

const mainLanguage = computed(() => {
  return 'en-US'
})

function initSelectedValues() {
  return [...new Set(['en-US'])]
}

const langSettings = reactive({
  main: mainLanguage,
  current: ref(mainLanguage.value),
  options: computed(() => ['en-US']),
  selected: ref<string[]>(initSelectedValues()),
  onlySelected: readOnly,
})

watch(mainLanguage, (main) => {
  // If app opened on form page
  console.log('=== mainLanguage ===', main)
  if (main) {
    langSettings.current = main
    langSettings.selected = initSelectedValues()
  }
})

const langFieldRegex = /\[lang\]\.(\w+)/

const formFields = computed(() => {
  if (formSettings.withLang && langSettings.selected.length === 0)
    return []

  const fields = props.schema.fields.reduce((acc, field) => {
    const name = field.name

    if (name === 'members.0')
      console.log('members.0', field, get(formSettings.initialValues, field.name))

    if (formSettings.withLang && langFieldRegex.exec(name)) {
      langSettings.selected.forEach((lang) => {
        const langfieldName = name.replace('[lang]', lang)

        acc.push({
          ...field,
          name: langfieldName,
          initialValue: get(formSettings.initialValues, langfieldName),
          hidden: lang !== langSettings.current,
          disabled: field.disabled || props.schema.readonly,
          readonly: field.readonly || props.schema.readonly,
        })
      })

      return acc
    }

    acc.push({
      ...field,
      name,
      initialValue:
      ('initialValue' in field)
        ? field.initialValue
        : isRef(get(formSettings.initialValues, field.name))
          ? get(formSettings.initialValues, field.name).value
          : get(formSettings.initialValues, field.name),
      disabled: field.disabled || props.schema.readonly,
      readonly: field.readonly || props.schema.readonly,
    })
    return acc
  }, [])

  return fields
})

const { handleSubmit, setErrors, setValues, setFieldValue, values, errors, resetForm } = useForm({
  initialValues: formSettings.initialValues,
})

const getFieldValue = (name: string) => {
  return get(values, name)
}

function onInvalidSubmit({ values, errors, results }) {
  console.log('=== onInvalidSubmit values ===', values) // current form values
  console.log('=== onInvalidSubmit errors ===', errors) // a map of field names and their first error message
  console.log('=== onInvalidSubmit results ===', results) // a detailed map of field names and their validation results
}

const submit = handleSubmit((values) => {
  props.onSubmit(values)
}, onInvalidSubmit)

defineExpose({
  submit,
  setErrors,
  values,
  resetForm,
  setValues,
  setFieldValue,
  getFieldValue,
})

function onLangChange(lang: string) {
  langSettings.current = lang
}

function onLangAdd(lang: string) {
  langSettings.current = lang
  langSettings.selected.push(lang)
}

function onLangRemove(lang: string) {
  if (langSettings.current === lang)
    langSettings.current = langSettings.main

  langSettings.selected = langSettings.selected.filter(l => l !== lang)
}
</script>

<template>
  <form @submit="submit">
    <div v-if="schema.withLang" class="flex flex-row-reverse">
      <LangSelect
        :current="langSettings.current"
        :selected="langSettings.selected"
        :only-selected="langSettings.onlySelected"
        :errors="errors"
        @select="onLangChange"
        @add="onLangAdd"
        @remove="onLangRemove"
      />
    </div>
    <div v-show="formSettings.ready" :class="props.schema.layout ?? 'grid grid-cols-1 gap-x-4 gap-y-8'">
      <div
        v-for="field in formFields.filter((field) => !field.hidden)"
        :key="field.name"
      >
        <label
          v-if="field.label"
          :for="field.name"
          class="block text-sm font-medium text-gray-500 mb-1"
        >{{ field.label }}</label>
        <component
          v-bind="field"
          :is="lookupComponent(field.is)"
          @change="(values) => field.onChange?.(values)"
          @clear="
            () => {
              field.onClear?.();
            }
          "
        />
      </div>
    </div>
    <template
      v-for="field in formFields.filter((field) => field.hidden)"
      :key="field.name"
    >
      <HiddenField v-bind="field" />
    </template>
  </form>
</template>
