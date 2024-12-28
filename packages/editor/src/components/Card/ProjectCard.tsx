import {
  GlobalOutlined,
  UserOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons'
import { Typography } from 'antd'
const { Paragraph } = Typography

export default function ProjectCard(props: { list: any[] }) {
  const { list = [] } = props

  return (
    <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
      {list.map((project) => (
        <div
          key={project.id}
          className="relative cursor-pointer overflow-hidden rounded-lg transition delay-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          <div className="round-t-2 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-[#b0eb93] to-[#b0eb93] p-4">
            <h3 className="m-0 flex items-center text-base text-white">
              <GlobalOutlined className="w-5.5 h-5.5 mr-2" />
              {project.name}
            </h3>
          </div>

          <div
            className={
              'border-[var(--tuk-theme-card-border-color) rounded-b-lg border p-4 pb-2.5'
            }
            // onClick={() => handleOpenPages(project.id)}
          >
            <Paragraph className="text-[var(--tuk-theme-text-secondary-color) text-ellipsis] mb-2 overflow-hidden whitespace-nowrap text-sm">
              {project.remark}
            </Paragraph>
            <div className="text-[var(--tuk-theme-text-secondary-color) mt-1 flex items-center text-xs">
              <UserOutlined className="mr-1" />
              <p>{project.userName}</p>
            </div>
            <div className="text-[var(--tuk-theme-text-secondary-color) mt-1 flex items-center text-xs">
              <FolderOpenOutlined className="mr-1" />
              <p>
                <span className="text-sm">{project.count} </span>个页面
              </p>
            </div>

            {/* 卡片更多 */}

            {/* 项目Logo */}
          </div>
        </div>
      ))}
    </div>
  )
}
