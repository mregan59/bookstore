import { types, getRoot } from 'mobx-state-tree'
import { withEnvironment } from '../extensions'
import { InfiniteScroll } from './models/InfiniteScroll'

export const UIStoreModel = types
  .model('UIStore')
  .props({
    //infiniteScrolls: types.maybeNull(types.map(InfiniteScroll)),
  })
  .preProcessSnapshot((snapshot) => {
    return {
      ...snapshot,
      // infiniteScrolls: {}
    }
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({}))
