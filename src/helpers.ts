import axios from 'axios'
import type {Message} from "./Types";
import type {RefValue} from "vue/macros";

export async function translate(text: string, language: string = 'DE', authKey: string) {
  const endpoint = 'https://api-free.deepl.com/v2/translate'
  const headers = {
    Authorization: `DeepL-Auth-Key ${authKey}`,
    'Content-Type': 'application/json'
  }
  const data = {
    text: [text],
    target_lang: language
  }

  await sleep(5000);


  return axios
    .post(endpoint, data, { headers })
    .then((response) => {
      return response.data.translations[0].text
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
}


export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}


export async function speakText(message: Message, readOriginal: boolean = false, apiKey: string, audioPlayer: HTMLAudioElement) {
  if(readOriginal && message.audioOriginal) {
    audioPlayer.src = message.audioOriginal;
    audioPlayer.play();
  }

  if(!readOriginal && message.audio) {
    audioPlayer.src = message.audio;
    audioPlayer.play();
  }

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/audio/speech',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      responseType: 'blob', // Wichtig, um den MP3-Stream als Blob zu erhalten
      data: {
        model: "tts-1",
        input: readOriginal ? message.message : message.translation,
        voice: "alloy"
      }
    });

    // Erstellen Sie eine URL für den Blob, damit das <audio>-Element ihn abspielen kann
    if (audioPlayer) {

      const objectUrl = URL.createObjectURL(response.data);

      message[readOriginal ? 'audioOriginal' : 'audio'] = objectUrl;

      audioPlayer.src = message[readOriginal ? 'audioOriginal' : 'audio'];
      audioPlayer.play();
    }
  } catch (error) {
    console.error('Error generating speech', error);
  }
}
