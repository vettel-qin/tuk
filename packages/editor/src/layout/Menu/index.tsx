/* 
* 菜单
*/
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tabs, Flex, Row, Col, Tooltip, Space } from "antd"
import { AppstoreOutlined, ProjectOutlined, PartitionOutlined, CodeOutlined, ApiOutlined, FunctionOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import { Suspense } from "react";
import SpinLoading from "@/components/SpinLoading";
import ComponentPanel from "@/layout/components/componentPanel";
import styles from './index.module.less'

    /**
 * 左侧面板类型
 */
  const panels = [
      {
        key: 'ComponentPanel',
        icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
        label: '组件',
        title: (
          <Space>
            <span>组件<em className="font-normal text-gray-500 font-sm">（拖拽或直接点击就能添加到画布中）</em></span>
            {/* <Tooltip title="无需拖拽，直接点击就能添加到画布中。">
              <QuestionCircleOutlined />
            </Tooltip> */}
          </Space>
        ),
        children: () => {
          return <ComponentPanel />;
        },
      },
      // {
      //   key: 'home',
      //   icon: <ProjectOutlined style={{ fontSize: 16 }} />,
      //   label: '页面',
      //   title: '页面列表',
      //   children: () => {
      //     return <PageList />;
      //   },
      // },
      // {
      //   key: 'OutlinePanel',
      //   icon: <PartitionOutlined style={{ fontSize: 16 }} />,
      //   label: '大纲',
      //   title: (
      //     <Space>
      //       <span>页面大纲</span>
      //       <Tooltip title="组件支持拖拽排序">
      //         <QuestionCircleOutlined />
      //       </Tooltip>
      //     </Space>
      //   ),
      //   children: () => {
      //     return <OutlinePanel />;
      //   },
      // },
      // {
      //   key: 'CodingPanel',
      //   icon: <CodeOutlined style={{ fontSize: 16 }} />,
      //   label: '代码',
      //   title: '页面JSON',
      //   children: () => {
      //     return <CodingPanel />;
      //   },
      // },
      // {
      //   key: 'ApiList',
      //   icon: <ApiOutlined style={{ fontSize: 16 }} />,
      //   label: '接口',
      //   title: '页面接口',
      //   children: () => {
      //     return <ApiList />;
      //   },
      // },
      // {
      //   key: 'Variable',
      //   icon: <FunctionOutlined style={{ fontSize: 16 }} />,
      //   label: '变量',
      //   title: '页面变量',
      //   children: () => {
      //     return <VariableList />;
      //   },
      // },
      // {
      //   key: 'Member',
      //   icon: <UsergroupAddOutlined style={{ fontSize: 16 }} />,
      //   label: '成员',
      //   title: (
      //     <Space>
      //       <span>页面成员</span>
      //       <Popover
      //         style={{ padding: 0 }}
      //         content={
      //           <>
      //             <p>1. 公开页面，所有人均可访问，但无法编辑。</p>
      //             <p>2. 只有开发者才可修改页面。</p>
      //             <p>3. 私有页面只有添加开发者或体验者才可访问。</p>
      //           </>
      //         }
      //         title="页面权限"
      //         placement="right"
      //       >
      //         <QuestionCircleOutlined />
      //       </Popover>
      //     </Space>
      //   ),
      //   children: () => {
      //     return <MemberList />;
      //   },
      // },
  ];
const Menu = () => {

return (<Tabs
  size={'small'}
  defaultActiveKey={panels[0].key}
  tabPosition="left"
  tabBarStyle={{ width: 50, height: 'calc(100vh - 64px)' }}
  className={styles.menu}
  centered={true}
  items={panels.map((item) => {
    return {
      key: item.key,
      label: (
        <Flex vertical justify="center" align="center" gap={5}>
          {item.icon}
          <span style={{ fontSize: 12 }}>{item.label}</span>
        </Flex>
      ),
      children: (
        <div style={{ marginLeft: -10, marginRight: 10 }}>
          <Row style={{ height: 46 }} align={'middle'} justify={'space-between'}>
            <Col>
              <span style={{ fontWeight: 'bold' }}>{item.title}</span>
            </Col>
          </Row>
          <Suspense fallback={<SpinLoading />}>{item.children?.()}</Suspense>
        </div>
      ),
    };
  })}
/>)
}

export default Menu