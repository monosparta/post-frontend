<script setup lang="ts">
const router = useRouter()
const emit = defineEmits(['check'])

const props = defineProps({
    titleHeader: String,
})

const back = async () => {
    router.go(-1)
}

const confirmClick = async () => {
    emit('check')
}

</script>

<template>
    <div v-if="props.titleHeader==='新增文章'" class="relative grid grid-cols-3 gap-4 mt-4">
        <div class="col-start-1 col-end-3">
            <button type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="back()">
                捨棄
            </button>
        </div>
        <div class="col-end-4 col-span-1 absolute inset-y-0 right-0">
            <button type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="confirmClick()">
                新增文章
            </button>
        </div>
    </div>
    <div v-else-if="props.titleHeader==='編輯文章'" class="relative grid grid-cols-6 gap-4 mt-4">
        <div class="col-start-1 col-end-3">
            <button type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="back()">
                放棄修改
            </button>
        </div>
        <div class="col-end-7 col-span-1 absolute inset-y-0 right-0">
            <button type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="confirmClick()">
                修改文章
            </button>
        </div>
    </div>
</template>