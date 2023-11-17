<script setup lang="ts">
import type { Message } from '../Types'
import Skeleton from 'primevue/skeleton'
import { Sender } from '../Types'
import { SpeakerWaveIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  message: Message
}>()

const emit = defineEmits<{
  (e: 'speak', message: Message, readOriginal: boolean): void
}>()
</script>

<template>
  <div :class="['w-full flex', message.sender === 'left' ? 'justify-start' : 'justify-end']">
    <div :class="['mb-4 relative p-4 bg-white rounded-lg shadow w-1/2']">
      <Skeleton v-if="!message.translation" class="mb-2 w-full"></Skeleton>
      <div v-else class="flex">
        <p class="text-gray-800">{{ message.translation }}</p>
        <button @click.prevent="emit('speak', message, false)" class="ml-2">
          <SpeakerWaveIcon class="w-4 h-4 text-gray-900"></SpeakerWaveIcon>
        </button>
      </div>
      <div class="flex">
        <p class="text-gray-400 text-sm">{{ message.message }}</p>
        <button @click.prevent="emit('speak', message, true)" class="ml-2">
          <SpeakerWaveIcon class="w-4 h-4 text-gray-400"></SpeakerWaveIcon>
        </button>
      </div>

      <div
        :class="[
          'absolute top-4 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent',
          message.sender === 'left'
            ? '-left-3  border-r-[10px] border-r-white'
            : '-right-3 border-l-[10px] border-l-white'
        ]"
      ></div>
    </div>
  </div>
</template>
