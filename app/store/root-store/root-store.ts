import { Instance, SnapshotOut, types } from "mobx-state-tree"
// import { CampaignStoreModel } from '../campaign-store'
import { TestModel } from "../Test"
import { UIStoreModel } from "../ui-store"
import { ProfileList } from "../models/ProfileList.model"
import { search } from "../api"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
  test: TestModel,
  uiStore: UIStoreModel,
  profileList: ProfileList,
  // exampleStore: QuestionStoreModel,
})
  .actions((self) => ({
    // executeApi(key, params) {
    //     switch (key) {
    //         case 'search':
    //             return self.profileList.getProfiles(search, params)
    //         case 'birthdays':
    //             return self.profileList.getProfiles(search, params)
    //         default:
    //             break
    //     }
    // },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
// export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
