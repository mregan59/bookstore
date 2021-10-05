import { types, flow, getRoot, getSnapshot } from "mobx-state-tree"
import { Profile } from "../Profile/Profile"
import { withEnvironment } from "../extensions/with-environment"

export const ProfileReference = types.maybeNull(
  types.reference(
    types.late(() => Profile),
    {
      get(identifier, parent) {
        console.log("HERERE")
        console.log(identifier)
        console.log(parent)
        const root = getRoot(parent)
        return root.profileList.profiles.get(identifier) || null
      },
      set(value) {
        return value.id
      },
    },
  ),
)

export const ProfileList = types
  .model({
    profiles: types.map(Profile),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProfiles: (users = [], shouldAppend: boolean) => {
      const resultsMapped = {}
      users.forEach((user) => {
        resultsMapped[user.id] = user
      })
      if (shouldAppend) {
        console.log("appending")
        self.profiles.replace({ ...self.profiles.toJSON(), ...resultsMapped })
      } else {
        console.log("replacing")
        self.profiles.replace(resultsMapped)
      }
    },
    addTaskToTaskList: (profile) => {
      self.profiles.replace({ ...self.profiles.toJSON(), profile })
    },
  }))
  .actions((self) => ({
    getProfiles: flow(function* (page, apiKey) {
      const result = yield self.environment.api.getProfiles(page, apiKey)
      if (result.kind === "ok") {
        self.saveProfiles(result.profiles, true)
        // return for useQuery
        console.log("result")
        console.log(result)
        return {
          profiles: result.profiles.map((r) => r.id.toString()),
          nextPage: result.nextPage,
          totalPages: result.totalPages,
        }
      }
    }),
  }))
