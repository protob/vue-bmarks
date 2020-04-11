// import { ADD_USER, GET_USER_BY_ID } from '@/queries/userQueries.js'

import addUser from '@/apollo/queries/addUser.gql'
import getUserById from '@/apollo/queries/getUserById.gql'

import { log } from '@/utils'
import * as jwt_decode from 'jwt-decode'
const uuidv4 = require('uuid/v4')
const UserService = {
  async setUserUuid(store, apollo) {
    const userId = localStorage.userId

    if (userId) {
      store.dispatch('changeCurrentUserId', userId)

      const { data, error } = await apollo.query({
        $loadingKey: 'loading',
        query: getUserById,
        variables: {
          userId: userId
        }
      })
      if (error) {
        log(error)
      } else {
        if (data.users.length) {
          const userUuid = data.users[0].uuid
          store.dispatch('changeCurrentUserUuid', userUuid)
          localStorage.userUuid = userUuid
        }
      }
    }
  },

  async syncUser(store, apollo, token) {
    if (token) {
      const obj = jwt_decode(token)
      const userUuid = uuidv4()
      store.dispatch('changeCurrentUserUuid', userUuid)
      store.dispatch('changeCurrentUserId', obj.sub)
      localStorage.userUuid = userUuid
      localStorage.userId = obj.sub
      const dataObj = {
        uuid: userUuid, //,
        email: obj.email,
        name: obj.nickname,
        userId: obj.sub,
        id: obj.sub,
        slug: obj.nickname,
        username: obj.nickname
      }

      const { data, error } = await apollo.query({
        $loadingKey: 'loading',
        query: getUserById,
        variables: {
          userId: obj.sub
        }
      })

      if (error) {
        log(error)
      } else {
        if (data.users.length === 0) {
          const { data, error } = await apollo.mutate({
            $loadingKey: 'loading',
            mutation: addUser,
            variables: {
              data: dataObj
            }
          })
          log(error ? error : data)
        } else {
          this.setUserUuid()
        }
      }
    }
  }
}

export default UserService
