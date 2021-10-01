import { types, flow } from "mobx-state-tree"
import { Profile } from "./Profile.model"
import { InfiniteScroll } from "../ui-store/models/InfiniteScroll"
import * as api from "../api"
export const ProfileList = types
  .model({
    profiles: types.map(Profile),
    queries: types.maybeNull(types.map(InfiniteScroll)),
  })
  .preProcessSnapshot((snapshot) => {
    return { ...snapshot, queries: snapshot.queries || {} }
  })
  .actions((self) => ({
    getProfiles: flow(function* (apiKey, params) {
      const result = yield api[apiKey](params)
      const users = result.data.data?.users || []
      const resultsMapped = {}
      users.forEach((user) => {
        resultsMapped[user.id] = user
      })
      self.profiles.replace({ ...self.profiles.toJSON(), ...resultsMapped })
      return {
        results: users.map((r) => r.id.toString()),
        pagination: result.data.data?.users_pagination,
      }
    }),
    createQuery(key, totalPages) {
      const newList = InfiniteScroll.create({ api: key, current_page: 1, total_pages: 1 })
      self.queries.set(key, newList)
    },
  }))
