<script setup lang="ts">
import TwoPartiesMessageContainer from '../components/TwoPartiesMessageContainer.vue'
import ChatMessage from '../components/Message.vue'
import MicrophoneButton from '../components/MicrophoneButton.vue'
import axios from 'axios'
import RecordRTC from 'recordrtc'
import Skeleton from 'primevue/skeleton'
import ProgressSpinner from 'primevue/progressspinner'

import { computed, ref, watch } from 'vue'
import type { Sender, Message } from '../Types'
import {speakText, translate} from '../helpers'

const messages = ref<Message[]>([
    // {
    //     message: 'I want to go to the cinema',
    //     translation: 'Ich möchte ins Kino gehen',
    //     sender: 'left'
    // }
])

watch(
  () => messages.value,
  async (messages) => {
    let messagesWithoutTranslation = messages.filter((message) => !message.translation)

    for (const message of messagesWithoutTranslation) {
      let translation = await translate(message.message, 'DE', DEEPL_TRANSLATE_API_KEY.value)

      if (translation) {
          message.translation = translation
          speak(message, false)
      }
    }
  },
  { deep: true }
)

const draftMessage = ref('')
const audioPlayer = ref();
const loadingSender = ref<Sender | null>(null)

const messagesLeft = computed(() => {
  return messages.value.filter((message) => message.sender === 'left')
})

const messagesRight = computed(() => {
  return messages.value.filter((message) => message.sender === 'right')
})


function speak(message: Message, readOriginal: boolean) {
    speakText(message, readOriginal, OPENAI_API_KEY.value, audioPlayer.value)
}

function submit() {
  messages.value.push({
    message: draftMessage.value,
    sender: 'left'
  })
  draftMessage.value = ''
}

const OPENAI_API_KEY = ref('')
const DEEPL_TRANSLATE_API_KEY = ref('')

const isTyping = ref(false)

const setupComplete = computed(() => {
  return OPENAI_API_KEY.value && DEEPL_TRANSLATE_API_KEY.value
})

const audioBlob = ref()
let recorder: RecordRTC | null = null
const activeRecorder = ref<'left' | 'right' | null>(null)
let stream

const startRecording = async (sender: 'left' | 'right') => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      recorderType: RecordRTC.StereoAudioRecorder // or any other recorder type
    })
    recorder.startRecording()
    activeRecorder.value = sender
  } catch (error) {
    console.error('Error accessing the microphone', error)
  }
}

const stopRecording = async () => {
  if (!recorder) {
    console.log('No recorder available')
  }

  // @ts-ignore
  recorder.stopRecording(() => {
      // @ts-ignore
    audioBlob.value = recorder.getBlob()
    recorder?.destroy()

    sendAudio()
  })
}

const sendAudio = () => {
  if (!audioBlob.value || !activeRecorder.value) {
    console.log('No audio or sender available')
  }

  loadingSender.value = activeRecorder.value

  const formData = new FormData()
  formData.append('file', audioBlob.value, 'openai.mp3')
  formData.append('model', 'whisper-1')

  axios({
    method: 'post',
    url: 'https://api.openai.com/v1/audio/transcriptions',
    data: formData,
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY.value}`, // Replace with your actual access token
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      if (response.data) {
        addMessage(response.data.text, activeRecorder.value)
        activeRecorder.value = null
      }
    })
    .catch((error) => {
      console.error('Error sending audio', error)
    })
    .finally(() => (loadingSender.value = null))
}

function toggleRecording(sender: 'left' | 'right') {
  if (activeRecorder.value) {
    stopRecording()
  } else {
    startRecording(sender)
  }
}

function addMessage(message: string, sender: Sender) {
  messages.value.push({
    message,
    sender
  })
}
</script>

<template>
    <audio hidden ref="audioPlayer" controls></audio>
  <div v-if="!OPENAI_API_KEY || !DEEPL_TRANSLATE_API_KEY">
    <input v-model="OPENAI_API_KEY" type="password" placeholder="OPENAI API KEY" />
    <input
      v-model="DEEPL_TRANSLATE_API_KEY"
      type="password"
      placeholder="DEEPL TRANSLATE API KEY"
    />
  </div>

  <TwoPartiesMessageContainer>
    <template #messages>
      <!-- Hier werden die Konversationsblöcke eingefügt -->
      <!-- Beispiel für eine Nachricht -->
      <ChatMessage v-for="messageObject in messages" :message="messageObject" @speak="speak"></ChatMessage>

      <div
        v-if="loadingSender"
        :class="['w-full flex', loadingSender === 'left' ? 'justify-start' : 'justify-end']"
      >
        <Skeleton height="6rem" class="!w-1/2 mb-4"></Skeleton>
      </div>
    </template>

    <template #audio>
      <div class="flex p-4 justify-between">
        <MicrophoneButton
          sender="left"
          :activeRecordingSender="activeRecorder"
          @toggle="toggleRecording"
        ></MicrophoneButton>
        <MicrophoneButton
          sender="right"
          :activeRecordingSender="activeRecorder"
          @toggle="toggleRecording"
        ></MicrophoneButton>
      </div>
    </template>

    <!--        <template #tools>-->

    <!--            &lt;!&ndash; Eingabebereich &ndash;&gt;-->
    <!--            <div class="p-4 bg-white border-t-2 border-gray-300">-->
    <!--                <div class="flex items-center">-->
    <!--                    &lt;!&ndash; Eingabefeld &ndash;&gt;-->
    <!--                    <form @submit.prevent="submit" class="w-full">-->
    <!--                        <input v-model="draftMessage" type="text" class="w-full flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Text eingeben...">-->

    <!--                    </form>-->
    <!--                    &lt;!&ndash; Mikrofon-Button &ndash;&gt;-->
    <!--                    <button class="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">-->
    <!--                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
    <!--                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a4 4 0 100-8 4 4 0 000 8zm0 0v4M8 11h8" />-->
    <!--                        </svg>-->
    <!--                    </button>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </template>-->
  </TwoPartiesMessageContainer>
</template>
