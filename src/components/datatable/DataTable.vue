<script setup lang="ts">
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid'
import { EyeIcon } from '@heroicons/vue/24/outline'
import { get, has, snakeCase } from 'lodash'
import { useForm } from 'vee-validate'
import * as Yup from 'yup'
import { useRouter } from 'vue-router'
import TableRowMenu from '../../components/reservation/TableRowMenu.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { useModelIndex } from '~/api/datatable'
import DynamicForm from '~/components/form/DynamicForm.vue'
import Select from '~/components/form/Select.vue'

const props = defineProps<{
  apiUrl: string
  fields: { label: string; prop: string; searchable?: boolean ; index?: number ;if?: boolean }[]
  tableActions?: { action: () => void; icon?: any; label: string }[]
  rowActions?: { action: (item: any) => void; icon: any; name: string }[]
  fieldFormat?: { [key: string]: (value: any) => string }
  withSearch?: boolean
  defaultFilter?: { field: string; method: string; value: string }[]
  defaultSort?: { field: string; order: string }[]
}>()

const withSearch = props.withSearch ?? false
const router = useRouter()
const page = ref(1)
const pageSize = ref(15)
const sorts = ref<{ field: string; order: string }[]>(props.defaultSort ?? [])
const filters = ref<{ field: string; value: string }[]>(
  props.defaultFilter ?? [],
)
const searchFormRef = ref<InstanceType<typeof DynamicForm> | null>(null)
const { data: response, mutate } = useModelIndex(
  props.apiUrl ?? '',
  page,
  pageSize,
  sorts,
  filters,
)

const tableProps = computed(() => {
  const columns = []
  if (props.fields) {
    props.fields.forEach((column) => {
      if ('if' in column && !column.if)
        return

      if (column.index)
        columns.splice(column.index, 0, column)
      else
        columns.push(column)
    })
  }
  return columns
})

const data = computed(() => {
  return response.value
    ? response.value.items
    : []
})

const total = computed(() => {
  return response.value ? response.value.total : 0
})

const totalPages = computed(() => Math.floor(total.value / pageSize.value) + 1)

function setPage(newPage: number) {
  if (newPage === page.value)
    return
  page.value = newPage
  mutate()
}

function setSort(field: string, order: string) {
  console.log('== =setSort ===', field, order)
  const index = sorts.value.findIndex(item => item.field === field)
  if (index === -1)
    sorts.value.push({ field, order })

  else
    sorts.value.splice(index, 1, { field, order })

  mutate()
}

function removeSort(field: string) {
  const index = sorts.value.findIndex(item => item.field === field)
  if (index !== -1)
    sorts.value.splice(index, 1)

  mutate()
}

function findSort(field: string) {
  const index = sorts.value.findIndex(item => item.field === field)
  if (index === -1)
    return ''

  else
    return sorts.value[index].order
}

function setFilter(field: string, value: string) {
  const index = filters.value.findIndex(item => item.field === field)
  if (index === -1)
    filters.value.push({ field, value })

  else
    filters.value.splice(index, 1, { field, value })

  page.value = 1
  mutate()
}

function removeFilter() {
  filters.value.pop()
  mutate()
}

const filterOptions = computed(() => {
  console.log('=== filterOptions ====', tableProps)
  return tableProps.value
    .filter(item => item.searchable)
    .map((item) => {
      return {
        label: item.label,
        value: item.prop,
      }
    })
})

const { handleSubmit, setFieldValue, resetForm } = useForm()
const filterSchema = computed(() => {
  return {
    layout: 'flex items-end space-x-4',
    fields: [
      {
        label: '欄位',
        name: 'field',
        is: 'Select',
        rules: Yup.string(),
        options: filterOptions.value,
        clearable: true,
        onClear: () => {
          removeFilter()
        },
        class: 'min-w-[200px]',
      },
      {
        label: '搜尋',
        name: 'value',
        is: 'Input',
        rules: Yup.string(),
        clearable: true,
        onClear: () => {
          removeFilter()
        },
      },
    ],
  }
})

function onSubmit(values: { field: string; value: string }) {
  console.log('=== onSubmit ===', values)
  if (values.field)
    setFilter(values.field, values.value ?? '')

  else
    removeFilter()
}
function onClickSearch() {
  console.log('=== onClickSearch ===')
  searchFormRef.value.submit()
}

const pageSizeSchmema = {
  name: 'pageSize',
  is: 'Select',
  rules: Yup.number(),
  options: [
    {
      label: '10/頁',
      value: 10,
    },
    {
      label: '15/頁',
      value: 15,
    },
  ],
  initialValue: pageSize.value,
}

function onPageSizeChange(newSize: number) {
  pageSize.value = newSize
  mutate()
}

function onClickEdit(item: any) {
  console.log('=== onClickEdit ===', item.id)
  router.push({
    name: 'MemberDetailAccount',
    params: {
      id: item.id,
    },
  })
}

function fieldFormat(prop: string) {
  return props.fieldFormat && has(props.fieldFormat, prop)
    ? props.fieldFormat[prop]
    : undefined
}

const checked = ref([])
const checkedId = computed(() => checked.value.map(item => item.id))
const indeterminate = computed(() => checked.value.length > 0 && data.value.map(item => item.id).some(id => !checkedId.value.includes(id)))
const allChecked = computed(() => indeterminate.value || data.value.map((item: any) => item.id).every((id: number) => checkedId.value.includes(id)))
function toggleCheckAll(event: any) {
  checked.value = event.target.checked
    ? checked.value.concat(data.value)
    : checked.value.filter(item => data.value.findIndex(d => d.id === item.id) === -1)
}
function resetChecked() {
  checked.value = []
}

defineExpose({
  checked,
  resetChecked,
  mutate,
})
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="space-x-4 sm:flex sm:items-end justify-between">
    <div v-if="withSearch" class="space-x-4 mb-8 sm:flex sm:items-end">
      <DynamicForm
        ref="searchFormRef"
        :schema="filterSchema"
        :on-submit="onSubmit"
      />
      <button
        type="button"
        class="
          rounded-md
          border border-transparent
          bg-indigo-600
          px-4
          py-2
          text-sm
          font-medium
          text-white
          shadow-sm
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
          sm:w-auto
        "
        @click="onClickSearch"
      >
        搜尋
      </button>
    </div>
    <div v-else />
    <div v-if="props.tableActions && props.tableActions.length" class="space-x-4 mb-8 md:flex sm:flex-none">
      <template
        v-for="(item, index) in props.tableActions"
        :key="index"
      >
        <template
          v-if="!('if' in item) || item.if"
        >
          <component
            :is="item.is"
            v-if="('is' in item)"
          />
          <button
            v-else
            type="button"
            class="
                  items-center
                  justify-center
                  rounded-md
                  border border-transparent
                  bg-indigo-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  sm:w-auto
                "
            @click="item.action"
          >
            {{ item.label }}
          </button>
        </template>
      </template>
    </div>
    <div v-else />
  </div>
  <div class="flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div
          class="
            overflow-hidden
            shadow
            ring-1 ring-black ring-opacity-5
            md:rounded-lg
          "
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  key="checkbox"
                  scope="col"
                  class="
                    py-3.5
                    pl-4
                    pr-3
                    text-left text-sm
                    font-semibold
                    text-gray-900
                    sm:pl-6
                  "
                >
                  <input
                    type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="allChecked"
                    :indeterminate="indeterminate"
                    @change="toggleCheckAll"
                  >
                </th>
                <th
                  v-for="(columnProp, index) in tableProps"
                  :key="index"
                  scope="col"
                  class="
                    py-3.5
                    pl-4
                    pr-3
                    text-left text-sm
                    font-semibold
                    text-gray-900
                    sm:pl-6
                  "
                >
                  <a
                    class="group inline-flex"
                    @click="
                      () => {
                        if (findSort(columnProp.prop) === '') {
                          setSort(columnProp.prop, 'asc');
                        }
                        else if (findSort(columnProp.prop) === 'asc') {
                          setSort(columnProp.prop, 'desc');
                        }
                        else {
                          removeSort(columnProp.prop);
                        }
                      }
                    "
                  >
                    {{ columnProp.label }}
                    <span
                      class="ml-2 flex-none rounded text-gray-400 hover:text-gray-600 group-hover:visible group-focus:visible" :class="[
                        { invisible: !findSort(columnProp.prop) },
                      ]"
                    >
                      <ChevronDownIcon
                        class="h-5 w-5 h-5 w-5 transform"
                        :class="[
                          ['', 'asc'].includes(findSort(columnProp.prop))
                            ? '-rotate-180'
                            : 'rotate-0',
                        ]"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </th>
                <th
                  v-if="props.rowActions"
                  :key="actions"
                  scope="col"
                  class="
                    py-3.5
                    pl-4
                    pr-3
                    text-left text-sm
                    font-semibold
                    text-gray-900
                    sm:pl-6
                  "
                >
                  <a class="group inline-flex"> 動作 </a>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(item, index) in data" :key="index">
                <td
                  class="
                    whitespace-nowrap
                    py-4
                    pl-4
                    pr-3
                    text-sm
                    font-medium
                    text-gray-900
                    sm:pl-6
                  "
                >
                  <input
                    v-model="checked"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :value="item"
                  >
                </td>
                <td
                  v-for="(columnProp, index) in tableProps"
                  :key="index"
                  class="
                    whitespace-nowrap
                    py-8
                    pl-4
                    pr-3
                    text-sm
                    font-medium
                    text-gray-900
                    sm:pl-6
                  "
                >
                  <template v-if="fieldFormat(columnProp.prop)">
                    <template
                      v-if="
                        typeof fieldFormat(columnProp.prop)(
                          get(item, columnProp.prop),
                        ) === 'object'
                      "
                    >
                      <component
                        :is="
                          fieldFormat(columnProp.prop)(
                            get(item, columnProp.prop),
                          ).is
                        "
                        v-if="'is' in fieldFormat(columnProp.prop)(
                          get(item, columnProp.prop),
                        )"
                        v-bind="
                          fieldFormat(columnProp.prop)(
                            get(item, columnProp.prop),
                          ).props
                        "
                      />
                    </template>
                    <template v-else>
                      {{
                        fieldFormat(columnProp.prop)(get(item, columnProp.prop))
                      }}
                    </template>
                  </template>
                  <template v-else>
                    {{ get(item, columnProp.prop) }}
                  </template>
                </td>
                <td
                  v-if="props.rowActions"
                  class="
                    whitespace-nowrap
                    py-4
                    pl-4
                    pr-3
                    text-sm
                    font-medium
                    text-gray-900
                    sm:pl-6
                  "
                >
                  <DataTableRowActions
                    :actions="props.rowActions"
                    :item="item"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="
              bg-white
              px-4
              py-3
              flex
              items-center
              justify-between
              border-t border-gray-200
              sm:px-6
            "
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                class="
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-indigo-500 hover:text-white
                "
              >
                Previous
              </a>
              <a
                href="#"
                class="
                  ml-3
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-indigo-500 hover:text-white
                "
              >
                Next
              </a>
            </div>

            <div
              class="
                hidden
                sm:flex-1 sm:flex sm:items-center sm:justify-between
              "
            >
              <div>
                <p class="text-sm text-gray-700">
                  顯示
                  {{ " " }}
                  <span class="font-medium">{{ total }}</span>
                  {{ " " }}
                  筆資料中的第
                  {{ " " }}
                  <span class="font-medium">{{
                    pageSize * (page - 1) + 1
                  }}</span>
                  {{ " " }}
                  筆到第
                  {{ " " }}
                  <span class="font-medium">{{
                    pageSize * page < total ? pageSize * page : total
                  }}</span>
                  {{ " " }}
                  筆
                </p>
              </div>

              <div>
                <Select v-bind="pageSizeSchmema" direction="top" @change="onPageSizeChange" />
              </div>

              <div>
                <nav
                  class="
                    relative
                    inline-flex
                    rounded-md
                    shadow-sm
                    -space-x-px
                  "
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    class="
                      relative
                      inline-flex
                      items-center
                      px-2
                      py-2
                      rounded-l-md
                      border border-gray-300
                      bg-white
                      text-sm
                      font-medium
                      text-gray-500
                      hover:bg-indigo-500 hover:text-white
                    "
                    @click="setPage(page - 1 > 0 ? page - 1 : 1)"
                  >
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                  <template
                    v-for="pageLabel in [...Array(totalPages).keys()].map(
                      (i) => i + 1,
                    )"
                    :key="pageLabel"
                  >
                    <a
                      v-if="
                        pageLabel === 1
                          || pageLabel === totalPages
                          || (page <= 5 && pageLabel <= 5)
                          || (page >= totalPages - 3
                            && pageLabel >= totalPages - 3)
                          || (page > 5
                            && page < totalPages - 3
                            && pageLabel >= page - 1
                            && pageLabel <= page + 1)
                      "
                      aria-current="page"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      :class="[
                        page === pageLabel
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 hover:bg-indigo-500 hover:text-white',
                      ]" @click="setPage(pageLabel)"
                    >
                      {{ pageLabel }}
                    </a>
                    <a
                      v-if="totalPages > 5 && page > 5 && pageLabel === 2"
                      aria-current="page"
                      class="
                        z-10
                        border-gray-300
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-2
                        border
                        text-sm
                        font-medium
                      "
                    >
                      ...
                    </a>
                    <a
                      v-if="
                        totalPages > 5
                          && page < totalPages - 3
                          && pageLabel === totalPages - 1
                      "
                      aria-current="page"
                      class="
                        border-gray-300
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-2
                        border
                        text-sm
                        font-medium
                      "
                    >
                      ...
                    </a>
                  </template>
                  <a
                    href="#"
                    class="
                      relative
                      inline-flex
                      items-center
                      px-2
                      py-2
                      rounded-r-md
                      border border-gray-300
                      bg-white
                      text-sm
                      font-medium
                      text-gray-500
                      hover:bg-indigo-500 hover:text-white
                    "
                    @click="
                      setPage(page + 1 > totalPages ? totalPages : page + 1)
                    "
                  >
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
