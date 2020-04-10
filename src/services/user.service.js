import { ADD_USER, GET_USER_BY_ID } from '@/queries/userQueries.js'
import { log } from '@/utils'
import * as jwt_decode from 'jwt-decode'
const uuidv4 = require('uuid/v4')
const UserService = {
  setUserUuid(store, apollo) {
    const userId = localStorage.userId

    if (userId) {
      store.dispatch('changeCurrentUserId', userId)
      apollo
        .query({
          query: GET_USER_BY_ID,
          variables: {
            userId: userId
          }
        })
        .then(result => {
          if (result.data.users.length) {
            const userUuid = result.data.users[0].uuid
            store.dispatch('changeCurrentUserUuid', userUuid)
            localStorage.userUuid = userUuid
          }
        })
        .catch(error => log(error))
    }
  },

  syncUser(store, apollo, token) {
    if (token) {
      const obj = jwt_decode(token)
      const userUuid = uuidv4()
      store.dispatch('changeCurrentUserUuid', userUuid)
      store.dispatch('changeCurrentUserId', obj.sub)
      localStorage.userUuid = userUuid
      localStorage.userId = obj.sub
      const data = {
        uuid: userUuid, //,
        email: obj.email,
        name: obj.nickname,
        userId: obj.sub,
        id: obj.sub,
        slug: obj.nickname,
        username: obj.nickname
      }

      apollo
        .query({
          query: GET_USER_BY_ID,
          variables: {
            userId: obj.sub
          }
        })
        .then(result => {
          if (result.data.users.length === 0) {
            apollo
              .mutate({
                mutation: ADD_USER,
                variables: data
                // refetchQueries: [query]
              })
              .then(data => log(data))
              .catch(error => log(error))
          } else {
            this.setUserUuid()
          }
        })
        .catch(error => log(error))
    }
  }
}

export default UserService
