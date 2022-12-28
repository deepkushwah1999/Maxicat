import { store, persistor } from './store'

const storeState = store.getState

const dispatch = store.dispatch

export { store, storeState, persistor, dispatch }
