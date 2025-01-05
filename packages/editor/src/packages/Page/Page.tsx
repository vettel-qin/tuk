import { usePageStore } from '@/stores/usePageStore'
import MarsRender from '@/packages/MarsRender/MarsRender'

const Page = () => {
  const { page } = usePageStore()
  const { elements, config } = page.pageData

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px - 40px - 40px)',
        ...config.style,
      }}
      id="page"
    >
      Page
      {JSON.stringify(elements)}
      <MarsRender elements={elements || []} />
    </div>
  )
}

export default Page
