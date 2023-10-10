import { create } from "zustand";

export const useStore = create((set) => ({
  data : "Loading",
  image : null,
  setData: (data) => {
    set((state) => ({ data: data }));
  },
  setImage: (image) => {
    set((state) => ({ image: image }));
  }
}));
