import { CSSProperties, memo, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { getBoundingClientRect } from '../../utils/utils'
import './index.less'

const Toolbar = memo(({ hoverTarget }: { hoverTarget: any }) => {
  const [hoverStyle, setHoverStyle] = useState<CSSProperties>({})

  useEffect(() => {
    if (hoverTarget) {
      const hoverStyle = getBoundingClientRect(hoverTarget)
      setHoverStyle(hoverStyle)
    } else {
      setHoverStyle({ ...hoverStyle, visibility: 'hidden' })
    }
  }, [hoverTarget])

  return (
    <>
      <div className={`toolbar-box ${hoverTarget ? 'hover' : ''}`} style={hoverStyle}></div>
    </>
  )
})

export default Toolbar
