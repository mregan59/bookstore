import { types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const Book = types
  .model({
    id: types.identifier,
    title: types.string,
    subtitle: types.string,
    description: types.string,
    thumbnail: types.string,
  })

  //   .preProcessSnapshot((snapshot) => {
  //     // console.log('PROFILE SNAPSHOT')
  //     // console.log(snapshot)
  //     const { iidsbn, title, subtitle, description } = snapshot
  //     return {
  //       id: isbn,
  //       title,
  //       subtitle,
  //       description,
  //     }
  //   })
  .actions((self) => ({}))

export const BookList = types
  .model({
    books: types.map(Book),
    scannedBook: types.maybe(Book),
  })
  .extend(withEnvironment)
  //   .preProcessSnapshot((snapshot) => {
  //     return { ...snapshot, queries: snapshot.queries || {} }
  //   })
  .actions((self) => ({
    getBook: flow(function* (isbn) {
      const result = yield self.environment.api.getBook(isbn)
      console.log("RESULT HERE")
      console.log(result)
      //   const users = result.data.data?.users || []
    //   const resultsMapped = {}
    //   resultsMapped[isbn] = result.book
        self.scannedBook = result.book
    //   self.books.replace({ ...self.books.toJSON(), ...resultsMapped })
      //   return {
      //     results: users.map((r) => r.id.toString()),
      //     pagination: result.data.data?.users_pagination,
      //   }
    }),
  }))
