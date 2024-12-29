/**
 * 加载用户信息，生成token
 */
import { storage } from '@/utils/storage'
import { getUserInfo } from '../services/api/user'

export default async function AuthLoader() {
  try {
    if (!storage.get('token')) {
      window.location.replace(`/login?callback=${window.location.href}`)
      return ''
    }

    // TODO: 获取用户信息
    const userInfo = await getUserInfo()

    return userInfo
  } catch (error) {
    return ''
  }
}
