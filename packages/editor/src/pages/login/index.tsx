import { Button, Form, Input } from 'antd'
import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons'
import { useUserInfoStore, useUserActionStore } from '@/stores/userStore'
import { useState } from 'react'
import { storage } from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import { login } from '@/services/api/user'
import { LoginFormValues, LoginResponse } from '@/types/user'

export default function Login() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const setUserInfo = useUserActionStore()
  // 登录
  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      const res: LoginResponse = await login({
        userName: values.userName,
        userPwd: values.userPwd,
      })
      console.log(res)
      if (res.token) {
        storage.set('token', res.token)
        setUserInfo(res)
        navigate('/projects')
      }
    } catch (error) {
      console.log(error)
    }
    // setTimeout(() => {
    //   setLoading(false)
    //   setUserInfo({ userId: 1, userName: 'tuk' })
    //   console.log(values)
    //   storage.set('token', 'tester')
    //   navigate('/projects')
    // }, 3000)
  }

  console.log(useUserInfoStore(), 4444)

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#f2f2f9]">
      <div className="flex h-[540px] w-[1200px] items-center justify-center rounded-2xl bg-white">
        <div className="h-[540px] w-[727px]"></div>
        <div className="mx-auto my-0 w-[350px]">
          <div>
            <span>登录</span>
          </div>
          <Form
            name="basic"
            layout="vertical"
            className=""
            onFinish={onFinish}
            size="large"
            form={form}
          >
            <Form.Item
              label="用户名"
              name="userName"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
                autoComplete="off"
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="userPwd"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                autoComplete="off"
                allowClear
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item className="mt-10">
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
          {useUserInfoStore().userName}
        </div>
      </div>
    </div>
  )
}
