import { Input } from 'antd'
import { useEffect, useState } from 'react'

interface BackgroundImageProps {
  value?: string
  onChange?: (value: string) => void
}

const BackgroundImage = (props: BackgroundImageProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.value?.startsWith('url')) {
      setValue(props.value.replace('url(', '').replace(')', ''))
    }
  }, [props.value])

  const handleChange = (val: string) => {
    if (val === '') {
      setValue('')
      props.onChange('')
      return
    }

    if (val.startsWith('url')) {
      setValue(val)
      props.onChange(`url(${val})`)
    } else {
      setValue(val)
      props.onChange(val)
    }
  }

  return <Input value={value} onChange={(e) => handleChange(e.target.value)} placeholder="请输入背景图片地址，eg:http(s)://xxx.png" />
}

export default BackgroundImage
