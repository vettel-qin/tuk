/**
 * 加载用户信息，生成token
 */
import { storage } from '@/utils/storage'

export default async function AuthLoader() {
  try {
    if (!storage.get('token')) {
      window.location.replace(`/login?callback=${window.location.href}`)
      return ''
    }

    // TODO: 获取用户信息
    // const res = await getUserInfo()
    // 模拟数据
    const userInfo = {
      userId: 1,
      userName: 'tuk',
    }

    return userInfo
  } catch (error) {
    return ''
  }
}
