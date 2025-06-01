import { type StateCreator } from "zustand";
import ai from "../lib/ai";
import extractTextFromResponse from "../helpers/extractTextFromResponse";

export type AISlice = {
  chat: string
  generateAsnwer: (prompt : string) => Promise<void> 
  isGenerating: boolean
}

export const createAISlice : StateCreator<AISlice> = (set) => ({
  chat: "",
  isGenerating: false, 
  generateAsnwer: async (prompt) => {
    set({ isGenerating: true, chat: "" })

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres experto en todo, amigable y amable con las personas, buscas siempre hacerles sentir en confianza",
        temperature: 1.0
      }
    })

    for await (const textPart of response) {
      const text = extractTextFromResponse(textPart)
      set((state) => ({
        chat: state.chat + text
      }))
    }
    set({
      isGenerating: false,
    });
    
  }
})