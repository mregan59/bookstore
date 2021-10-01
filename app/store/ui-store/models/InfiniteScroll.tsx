import { types, getRoot, flow } from 'mobx-state-tree'
import { apiMethods } from '../../api'
import { Model } from '../../models/Model.model'
import { Profile } from '../../models/Profile.model'
import Reactotron from 'reactotron-react-native'

// export const ModelReference = types.maybeNull(
//     types.reference(
//         types.late(() => Model),
//         {
//             get(identifier, parent) {
//                 const root = getRoot(parent)
//                 return root.profileList.profiles.get(identifier) || null
//             },
//             set(value) {
//                 return value.id
//             },
//         },
//     ),
// )

// change this to a PaginationModel

export const InfiniteScroll = types
    .model('Test', {
        api: types.string,
        loading: types.maybe(types.boolean),
        current_page: types.integer,
        total_pages: types.integer,
        total: types.integer,
        count: types.integer,
        results: types.optional(types.array(types.maybeNull(types.reference(Profile))), []),
    })
    .preProcessSnapshot((snapshot) => {
        return {
            api: 'search',
            loading: false,
            current_page: 1,
            total: 0,
            count: 0,
            total_pages: 10,
            completed: false,
            ...snapshot,
        }
    })
    .actions((self) => ({
        getResults: flow(function* (page = 0) {
            if (self.current_page > self.total_pages) {
                return null
            }
            const root = getRoot(self)
            self.loading = true
            const data = yield root.profileList.getProfiles(self.api, { page: self.current_page }) // just keys passed back to make referene
            self.results = [...self.results, ...data.results]
            self.current_page = data.pagination.current_page + 1
            self.total_pages = data.pagination.total_pages
            if (self.current_page === self.total_pages + 1) {
                self.completed = true
            }
            self.loading = false
        }),
    }))
