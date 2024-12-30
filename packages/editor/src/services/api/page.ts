  import request from "../request";
  import { PageParams, PageReqParams, CreatePageParams, PublishPageParams, PublishListParams, PageListResponse } from "@/types/page";
  
  // 获取页面列表
  export function getPageList(params: PageParams): Promise<PageListResponse> {
    return request.get('/page/list', params);
  }

  // 获取页面模板列表
  export function getPageTemplateList(params: Omit<PageParams, 'type'>) {
    return request.get('/page/getPageTemplateList', params);
  }
  // 获取页面详情
  export function getPageDetail(id: number) {
    return request.get(`/page/detail/${id}`);
  }

  // 复制页面数据
  export function copyPageData(params: PageReqParams) {
    return request.post('/page/copy', params);
  }

  // 删除页面数据
  export function delPageData(params: { id: number }) {
    return request.post('/page/delete', params);
  }

  // 创建页面数据
  export function createPageData(params: CreatePageParams) {
    return request.post('/page/create', params);
  }

  // 保存页面数据
  export function updatePageData(params: any) {
    return request.post('/page/update', params);
  }

  // 发布
  export function publishPage(params: PublishPageParams) {
    return request.post('/publish/create', params);
  }

  // 发布记录
  export function publishList(params: PublishListParams) {
    return request.post('/publish/list', params);
  }

  // 页面回滚
  export function rollbackPage(params: { pageId: number; env: string; lastPublishId: number }) {
    return request.post('/page/rollback', params);
  }