import { create } from 'zustand'
import { produce } from 'immer'

export interface UserInfoStore {
  userId: number
  userName: string
  nickName: string
  avatar: string
}

export interface UserState {
  userInfo: UserInfoStore
}

export interface UserAction {
  setUserInfo: (userInfo: UserInfoStore) => void
}
export const useUserStore = create<UserState & UserAction>()((set) => ({
  userInfo: {
    userId: 0,
    userName: '',
    nickName: '',
    avatar: '',
  },
  setUserInfo: (userInfo: UserInfoStore) =>
    set(
      produce((state) => {
        state.userInfo = userInfo
      }),
    ),
}))
export const useUserInfoStore = () => useUserStore((state) => state.userInfo)
export const useUserActionStore = () =>
  useUserStore((state) => state.setUserInfo)
export const useUserStoreReset = () =>
  useUserStore.setState({
    userInfo: { userId: 0, userName: '', nickName: '', avatar: '' },
  })
