// 定义登录响应的接口
export interface LoginResponse {
  token?: string
  // 如果有其他字段，也一并添加
}

// 定义表单值的接口
export interface LoginFormValues {
  userName: string
  code?: number
  userPwd: string
}
