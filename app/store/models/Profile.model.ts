import { types } from 'mobx-state-tree'
import { Model } from './Model.model'

export const Profile = Model.props({
  id: types.identifier,
  first_name: types.string,
  age: types.number,
  location: types.string,
  mutual_like: types.boolean,
  photo: types.string,
})
  .preProcessSnapshot((snapshot) => {
    // console.log('PROFILE SNAPSHOT')
    // console.log(snapshot)
    const { age, first_name, location, photo, id, mutual_like } = snapshot
    return {
      id: id.toString(),
      age,
      first_name,
      location,
      photo,
      mutual_like,
    }
  })
  .actions((self) => ({
    like(value = true) {
      self.mutual_like = value
    },
  }))
