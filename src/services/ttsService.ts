import { GoogleGenAI, Modality } from "@google/genai";

// Cache for generated audio to avoid redundant API calls
const audioCache: Record<string, string> = {};

// Persistent AudioContext to avoid state issues and overhead
let globalAudioContext: AudioContext | null = null;
let isAudioUnlocked = false;

async function getAudioContext() {
  if (!globalAudioContext) {
    globalAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  if (globalAudioContext.state === 'suspended') {
    await globalAudioContext.resume();
  }
  return globalAudioContext;
}

/**
 * Helper to unlock audio on iOS/mobile browsers.
 * Should be called on a user interaction.
 */
export async function unlockAudio() {
  if (isAudioUnlocked) return;
  
  try {
    const context = await getAudioContext();
    // Play a silent buffer to unlock
    const buffer = context.createBuffer(1, 1, 24000);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
    isAudioUnlocked = true;
    console.log("Audio unlocked successfully");
  } catch (e) {
    console.error("Failed to unlock audio:", e);
  }
}

/**
 * Creates a WAV header for 16-bit Mono PCM data.
 */
function createWavHeader(pcmLength: number, sampleRate: number): Uint8Array {
  const header = new Uint8Array(44);
  const view = new DataView(header.buffer);

  /* RIFF identifier */
  view.setUint32(0, 0x52494646, false); // "RIFF"
  /* file length */
  view.setUint32(4, 36 + pcmLength, true);
  /* RIFF type */
  view.setUint32(8, 0x57415645, false); // "WAVE"

  /* format chunk identifier */
  view.setUint32(12, 0x666d7420, false); // "fmt "
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true); // PCM
  /* channel count */
  view.setUint16(22, 1, true); // Mono
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);

  /* data chunk identifier */
  view.setUint32(36, 0x64617461, false); // "data"
  /* data chunk length */
  view.setUint32(40, pcmLength, true);

  return header;
}

export async function generateSpeech(text: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("VITE_GEMINI_API_KEY is missing. Please add it to your environment variables.");
      return null;
    }

    // Initialize AI right before use as per guidelines
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Pronounce this Arabic text clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      console.warn("No audio data received from Gemini TTS");
    }
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return null;
  }
}

export async function playArabic(text: string) {
  try {
    console.log(`Attempting to play Arabic: ${text}`);
    
    let base64Data = audioCache[text];
    
    if (!base64Data) {
      base64Data = await generateSpeech(text) || "";
      if (base64Data) {
        audioCache[text] = base64Data;
      }
    }

    if (base64Data) {
      // Unlock audio on the first interaction if needed
      if (!isAudioUnlocked) {
        await unlockAudio();
      }
      await playBase64PCM(base64Data);
    } else {
      console.error("Failed to get audio data for:", text);
    }
  } catch (error) {
    console.error("Error playing Arabic:", error);
  }
}

async function playBase64PCM(base64: string) {
  try {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const pcmData = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      pcmData[i] = binaryString.charCodeAt(i);
    }
    
    // Create WAV blob for better compatibility
    const wavHeader = createWavHeader(len, 24000);
    const wavData = new Uint8Array(wavHeader.length + pcmData.length);
    wavData.set(wavHeader, 0);
    wavData.set(pcmData, wavHeader.length);
    
    const blob = new Blob([wavData], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    
    const audio = new Audio(url);
    
    // Handle cleanup
    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
    
    await audio.play();
    console.log("Audio playback started successfully via WAV Blob");
  } catch (e) {
    console.error("Error in playBase64PCM:", e);
    
    // Fallback to AudioContext if Audio element fails
    try {
      console.log("Attempting fallback to AudioContext...");
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioContext = await getAudioContext();
      const numberOfSamples = len / 2;
      const audioBuffer = audioContext.createBuffer(1, numberOfSamples, 24000);
      const channelData = audioBuffer.getChannelData(0);
      const view = new DataView(bytes.buffer);
      
      for (let i = 0; i < numberOfSamples; i++) {
        if (i * 2 + 1 < len) {
          const sample = view.getInt16(i * 2, true);
          channelData[i] = sample / 32768.0;
        }
      }
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (fallbackError) {
      console.error("Fallback AudioContext also failed:", fallbackError);
    }
  }
}
