import { create } from 'zustand'

const programStore = create((set) => ({
    currentProgram: null,
    changeProgram: (value) => set({ currentProgram: value }),
    resetProgram: () => set({ currentProgram: null }),
}))

export default programStore