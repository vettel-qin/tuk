/*
 * 标题样式
 */

const TitleStyle = (props: any) => {
  return (
    <h2 className="mb-2.5 border-t border-t-[var(--tuk-theme-card-border-color)] bg-[var(--tuk-theme-bg-color)] px-2.5 text-sm leading-[30px] text-[var(--tuk-theme-text-color)]">{props.children}</h2>
  )
}

export default TitleStyle
