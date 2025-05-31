import { type StateCreator } from "zustand";

export type AISlice = {
  isGenerating: boolean
}

export const createAISlice : StateCreator<AISlice> = () => ({
  isGenerating: false 
})