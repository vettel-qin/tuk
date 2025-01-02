/* 
* 组件面板
*/

import { Collapse, Tabs, Empty, Input, Divider, Col, Row } from "antd"
import React, { useState, useMemo, useEffect } from "react"
import { UpOutlined, SearchOutlined } from "@ant-design/icons"
import { useDebounceFn } from "ahooks"
import components from "@/config/components"
import DragMenuItem from "../../Menu/DragMenuItem"

const ComponentPanel = () => {
  const [list, setList] = useState<Array<{key: string; label: string; children: React.JSX.Element;}>>([])
  const [activeKeys, setActiveKeys] = useState<string[]>(['system'])
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // 系统自带组件
    const items: Array<{ key: string; label: string; children: React.JSX.Element }> = (keyword ? searchByName(components, keyword) : components)
      .filter((item) => !item.hidden)
      .map((item) => {
        return {
          key: item.type,
          label: item.title,
          children: (
            <Row gutter={[10, 10]}>
              {item.data
                .filter((sub) => !sub.hidden)
                .map((subItem) => {
                  return (
                    <Col span={8} key={subItem.type}>
                      <DragMenuItem {...subItem} />
                    </Col>
                  );
                })}
            </Row>
          ),
        };
      });
    setActiveKeys(items.map((item) => item.key));
    setList(items);
  }, [keyword]);

    // 组件搜索
    function searchByName(data: any, keyword: string) {
      const results: any[] = [];
  
      function searchInArray(arr: any, parent: any) {
        for (const item of arr) {
          if (Array.isArray(item.data)) {
            // 如果当前项有子数组，递归搜索子数组
            searchInArray(item.data, { ...item, data: [] });
          } else if (item.name.includes(keyword)) {
            parent.data.push(item);
            if (results.filter((r) => r.type === parent.type).length > 0) continue;
            results.push({ ...parent });
          }
        }
      }
      if (keyword) {
        searchInArray(data, null);
        return results;
      }
      return data;
    }

  // collapse事件
  const handleCollapse = (keys: string | string[]) => {
    setActiveKeys(typeof keys === 'string' ? [keys] : keys);
  };

  // 页签
  const tabs = useMemo(() => {
    return [
      {
        key: 'system',
        label: '系统组件',
        children: (
          <>
            <Collapse
              expandIconPosition="end"
              onChange={handleCollapse}
              className={`overflow-y-auto ${list.length > 0 ? 'h-[calc(100vh-21px)]' : ''}`}
              ghost
              size="small"
              activeKey={activeKeys} 
              items={list}
              expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 0 : -180} />}
            />
            {list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />}
          </>
        )
      },
      {
        key: 'custom',
        label: '自定义组件',
        children: <div>自定义组件</div>
      }
    ]
  }, [list, activeKeys])

   // 组件搜索
   const { run } = useDebounceFn(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      setKeyword(name);
    },
    { wait: 500 },
  );

  return (
    <Tabs
      size="small"
      tabPosition="top"
      defaultActiveKey={tabs[0].key}
      items={tabs.map((item) => ({
        key: item.key,
        label: item.label,
        children: (
          <>
          {
            item.key === 'system' && (
              <>
                <Input placeholder="请输入组件名称" suffix={<SearchOutlined />} onChange={run} />
                <Divider className="mt-[12px]" />
              </>
            )
          }
          {item.children}
          </>
        )
      }))}
    />
  )
}

export default ComponentPanel