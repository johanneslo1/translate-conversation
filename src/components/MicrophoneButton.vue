<script setup lang="ts">
import {MicrophoneIcon} from "@heroicons/vue/24/solid";
import type {Sender} from "../Types";

const props  = defineProps<{
    activeRecordingSender: Sender|null
    sender: Sender
}>()

const emit = defineEmits<{
    (e: 'toggle', sender: Sender): void
}>();


</script>

<template>
    <button @click="emit('toggle', sender)" :class="[activeRecordingSender === sender ? 'bg-green-500 hover:bg-green-600' : '',  'border-2 border-green-500 hover:border-green-600 rounded-full p-3']">
        <MicrophoneIcon :class="[activeRecordingSender === sender ? 'text-white' : '', 'w-12 h-12 text-green-500 hover:text-green-600']"></MicrophoneIcon>
    </button>
</template>

<style scoped>

</style>