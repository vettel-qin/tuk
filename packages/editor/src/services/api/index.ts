import request from '@/services/request'
import { UploadResponse } from '@/types'

// 图片上传
export const uploadImg = (params: any): Promise<UploadResponse> => {
  return request.post('/upload/files', params, { showError: false })
}
