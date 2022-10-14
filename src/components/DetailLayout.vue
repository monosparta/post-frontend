<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
const props = defineProps<{
  tabs: { name: string; to: string; if?: boolean }[]
}>()

const router = useRouter()
const route = useRoute()

const visibleTabs = computed(() => props.tabs.filter(tab => !('if' in tab) || tab.if))
</script>

<template>
  <div class="h-full flex ">
    <main
      class="
            flex-1
            relative
            z-0
            focus:outline-none
            xl:order-last
          "
    >
      <article>
        <!-- Profile header -->

        <div class="w-full">
          <div class="bg-white sm:rounded-lg px-4 py-8 sm:px-6 lg:px-8">
            <slot name="detail" />
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <TabGroup>
              <TabList class="flex space-x-8 px-4 sm:px-6 lg:px-8" aria-label="Tabs">
                <Tab
                  v-for="(tab, idx) in visibleTabs"
                  :key="idx"
                  as="template"
                >
                  <router-link
                    :to="{ name: tab.to, params: { id: route.params.id } }"
                    class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    :class="[
                      route.name === tab.to
                        ? 'border-primary-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    ]"
                  >
                    {{ tab.name }}
                  </router-link>
                </Tab>
              </TabList>

              <TabPanels class="mt-2">
                <TabPanel>
                  <router-view />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>
