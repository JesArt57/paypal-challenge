import { ToastMessage } from 'primereact/toast';
import { create } from 'zustand';

interface AppStore {
  isShowToast: boolean;
  toastMessage: ToastMessage;
  showToast: (message: ToastMessage) => void;
  hiddenToast: () => void;
}
export const useAppStore = create<AppStore>()((set) => ({
  isShowToast: false,
  toastMessage: {},
  showToast: (message: ToastMessage) => set(() => ({ isShowToast: true, toastMessage: message })),
  hiddenToast: () => set(() => ({ isShowToast: false }))
}))
