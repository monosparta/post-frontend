<script setup lang="ts">
const router = useRouter()
const emit = defineEmits(['click'])
const props = defineProps({
    buttonShow: String,
})
const back = async () => {
    router.go(-1)
}
const confirmClick = async () => {
    emit('click')
}
const buttonName = props.buttonShow!
</script>

<template>
    <div class="relative grid grid-cols-6 gap-4 mt-4">
        <div class="col-start-1 col-end-3">
            <button type="button"
                class="inline-flex items-center rounded-md border  border-gray-300 bg-white px-4 py-2 text-base font-medium text-indigo-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="back()">
                放棄{{buttonName.substring(0,2)}}
            </button>
        </div>
        <div class="col-end-7 col-span-1 absolute inset-y-0 right-0">
            <button type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="confirmClick()">
                {{buttonName}}
            </button>
        </div>
    </div>
</template>