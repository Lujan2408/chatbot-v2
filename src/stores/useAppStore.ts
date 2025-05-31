import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAISlice } from "./aiSlice";
import type { AISlice } from "./aiSlice";

export const useAppStore = create<AISlice>()(
  devtools((...a ) => ({
    ...createAISlice(...a)
})))