import { WELCOMEDATA } from "./constants"
export default function init() {
    const initialData = localStorage.getItem("notes")
    return initialData !== null ?
      JSON.parse(initialData) :
      [WELCOMEDATA]
  }