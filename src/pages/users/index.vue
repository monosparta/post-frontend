<script setup lang="ts">
import { ChevronDownIcon, DotsVerticalIcon, PencilIcon } from '@heroicons/vue/solid'
const member = useMemberStore()
const dropdown = useDropdownStore()
const selectedPeople = ref([])
onMounted(async () => {
  await dropdown.getCountryCallingCode()
  await member.getMembers()
})
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < member.meta.per_page)
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <MemberSectionHeader />
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :checked="indeterminate || selectedPeople.length === member.list.length"
                      :indeterminate="indeterminate"
                      @change="selectedPeople = $event.target.checked ? member.list.map((p) => p.email) : []"
                    >
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" class="group inline-flex">
                      No.
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" class="group inline-flex">
                      Name
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" class="group inline-flex">
                      Status
                      <span class="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" class="group inline-flex">
                      Type
                      <span class="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" class="group inline-flex">
                      Email
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" class="group inline-flex">
                      Phone
                      <span
                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>

                  <th scope="col" class="relative py-3.5 w-20 text-left text-sm font-semibold text-gray-900">
                    <div class="group inline-flex">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in member.list" :key="person.email">
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div
                      v-if="selectedPeople.includes(person.email as never)"
                      class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                    />
                    <input
                      v-model="selectedPeople" type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      :value="person.email"
                    >
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ person.custom_id }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ person.username }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.status }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ (person.categories) ? person.categories.name : '' }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.phone }}
                  </td>
                  <td class="relative flex justify-end whitespace-nowrap py-4 text-right text-sm font-medium">
                    <button
                      class="flex justify-center flex-1 text-indigo-600 hover:text-indigo-900"
                      @click="$router.push(`/users/${person.id}`)"
                    >
                      <PencilIcon class="h-5 w-5 mx-2" aria-hidden="true" /><span class="sr-only">, {{ person.username
                      }}</span>
                    </button>
                    <a href="#" class="flex justify-center flex-1 text-indigo-600 hover:text-indigo-900">
                      <DotsVerticalIcon class="h-5 w-5 mx-2" aria-hidden="true" /><span class="sr-only">, {{
                        person.username
                      }}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              :total-pages="member.meta.total_pages" :total="member.meta.total"
              :per-page="member.meta.per_page" :current-page="member.meta.current_page" :from="member.meta.from"
              :to="member.meta.to" @click-page="(data:number) => { member.setPage(data); selectedPeople = []; }"
              @click-left="() => { member.setPage(member.meta.current_page - 1); selectedPeople = []; }"
              @click-right="() => { member.setPage(member.meta.current_page + 1); selectedPeople = []; }"
              @change-paginate="(data:any) => { member.setPaginate(data.name); selectedPeople = []; }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
  activeMenu: users
</route>
