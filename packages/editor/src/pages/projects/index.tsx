import { Layout, Spin } from 'antd'
import styles from './index.module.less'

export default function Projects() {
  return (
    <Layout.Content className={styles.pageList}>
      <div>
        <Spin spinning={} size="large" tip="加载中..."></Spin>
      </div>
    </Layout.Content>
  )
}
