import { create } from 'zustand'

const renderStore = create((set) => ({
    currentRender: 'homepage',
    changeRender: (value) => set({ currentRender: value}),
}))


export default renderStore