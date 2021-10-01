import { onSnapshot, onPatch } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import { Environment } from "../environment"
// import * as storage from '../mobx-storage';
// import { CampaignStoreModel } from '../campaign-store'
import { TestModel } from "../Test"
import { UIStoreModel } from "../ui-store"
import { ProfileList } from "../models/ProfileList.model"
import Reactotron from "reactotron-react-native"
import { mst } from "reactotron-mst"
import { persist } from "mst-persist"
import AsyncStorage from "@react-native-community/async-storage"
/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore
  let data

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  // try {
  //     // load data from storage
  //     data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
  //     rootStore = RootStoreModel.create(data, env);
  // } catch (e) {
  // if there's any problems loading, then let's at least fallback to an empty state
  // instead of crashing.
  const test = TestModel.create()
  const uiStoreModel = UIStoreModel.create()
  const profileList = ProfileList.create()
  rootStore = RootStoreModel.create({ test, uiStoreModel, profileList }, env)

  // but please inform us what happened
  // __DEV__ && console.tron.error(e.message, null)
  // __DEV__ && console.error(e.message, null);
  //  }

  // reactotron logging
  //   if (__DEV__) {
  //     env.reactotron.setRootStore(rootStore, data)
  //   }
  Reactotron.use(mst())
  Reactotron.trackMstNode(test)

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => {
    Reactotron.display({
      name: "SNAPSHOT",
      preview: "snapshot",
      value: snapshot,
    })
  })

  onPatch(rootStore, (patch) => {
    Reactotron.display({
      name: patch.op.toUpperCase(),
      preview: patch.path,
      value: patch.value,
    })
  })

  persist("root", rootStore, {
    storage: AsyncStorage, // or AsyncStorage in react-native.
    // default: localStorage
    // jsonify: false, // if you use AsyncStorage, this shoud be true
    // default: true
    whitelist: ["profileList"], // only these keys will be persisted
  }).then(() => console.log("someStore has been hydrated"))

  // return persistedStore
  return rootStore
}
