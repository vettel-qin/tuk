export interface PageParams {
    keyword?: string;
    pageNum: number;
    pageSize?: number;
    projectId?: number;
  }

  export interface PageItem {
    id: number;
    name: string;
    userName: string;
    userId: number;
    remark: string;
    updatedAt: string;
    createdAt: string;
    stgPublishId: number;
    prePublishId: number;
    prdPublishId: number;
    stgState: number;
    preState: number;
    prdState: number;
    previewImg: string;
    projectId: number;
  }

  export interface PageReqParams {
    id: number;
  }

  export interface CreatePageParams {
    id: number;
    name: string;
    remark?: string;
    projectId: number;
  }

  export interface PublishPageParams {
    id: number;
    env: 'stg' | 'pre' | 'prd'; // 1 stg 2 pre 3 prod;
    previewImg: string;
  }
  
  export interface PublishListParams {
    pageNum: number;
    pageSize: number;
    env: 'stg' | 'pre' | 'prd'; // 1 stg 2 pre 3 prod;
    start?: string;
    end?: string;
    userName?: string;
    pageId: number;
  }

  // 定义页面列表响应的接口
export interface PageListResponse {
    list?: any[]
    total?: number
  }