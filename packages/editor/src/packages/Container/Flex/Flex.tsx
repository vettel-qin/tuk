import { Flex } from 'antd'

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  text: string
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */

const TFlex = ({ config, id, type, elements }: { config: any; id: string; type: string; elements: any[] }) => {
  return (
    <Flex style={config.style} {...config.props} data-id={id} data-type={type}>
      <div className="slots" style={{ lineHeight: '200px' }}>
        拖拽组件到这里
      </div>
      {/* {elements?.length ? (
    <MarsRender elements={elements || []} />
  ) : (
    <div className="slots" style={{ lineHeight: '200px' }}>
      拖拽组件到这里
    </div>
  )} */}
    </Flex>
  )
}

export default TFlex
