import SearchBar from "@/components/SearchBar"
import { Layout, Form, Spin, Empty, Button } from "antd"
import { useRef } from "react"
import { useAntdTable } from "ahooks"
import { useSearchParams } from "react-router-dom"
import { getPageList } from "@/services/api/page"
import { PlusOutlined } from "@ant-design/icons"
import PageCard from "@/components/PageCard"
import { PageItem } from "@/types/page"


interface TableParams {
    current: number
    pageSize: number
  }
  
  interface FilterParams {
    keyword?: string
  }
const Pages = () => {
  const [form] = Form.useForm()
  const createPageRef = useRef<any>()
  const [searchParams] = useSearchParams()

   // 获取列表数据
   const getTableData = ({ current, pageSize }: TableParams, { keyword }: FilterParams) => {
    return getPageList({
        pageNum: current,
        pageSize: pageSize,
        keyword,
        projectId: Number(searchParams.get('projectId')),
      })
      .then((res) => {
        return {
          total: res?.total || 0,
          list: res?.list || [],
        };
      });
  };

  const { tableProps, loading, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  });

  // 新建页面
  const handleCreate = () => {
    createPageRef.current?.open('create');
  };

   // 复制页面
   const handleCopy = (item: PageItem) => {
    createPageRef.current?.open('copy', item);
  };

  return (
    <Layout.Content className="h-[calc(100vh - 64px)] flex flex-col overflow-auto px-5 py-7">
      <SearchBar form={form} from="页面" submit={search.submit} onCreate={handleCreate} refresh={search.submit} />

      <div>
          <Spin spinning={loading} size="large" tip="加载中...">
            {tableProps.dataSource.length > 0 ? (
              <PageCard list={tableProps.dataSource} copy={handleCopy} refresh={search.submit} />
            ) : (
              <Empty style={{ marginTop: 100 }}>
                <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                  创建页面
                </Button>
              </Empty>
            )}
          </Spin>
        </div>

    </Layout.Content>
  )
}

export default Pages
