import { initGlobalState } from 'qiankun'
import Vue from 'vue'

const initialState = Vue.observable({
  user: {
    name: 'Berat İnceçam'
  }
})

const actions = initGlobalState(initialState)
actions.onGlobalStateChange((newState, prev) => {
  for (const key in newState) {
    initialState[key] = newState[key]
  }
})

actions.getGlobalState = (key) => {
  return key ? initialState[key] : initialState
}

export default actions
