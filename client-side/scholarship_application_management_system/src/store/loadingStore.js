import { message } from 'antd'
import { create } from 'zustand'

const loadingStore = create((set) => ({
    isShowLoading: false,
    message: 'no message',
    changeLoading: (value, message) => set({ isShowLoading: value, message: message }),
}))

export default loadingStore