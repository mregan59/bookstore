import { types } from 'mobx-state-tree'
export const Model = types.model('Basic', {
  id: types.identifier,
})
