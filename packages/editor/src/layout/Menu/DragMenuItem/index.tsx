const DragMenuItem =(props: any) => {
  return <div
    // ref={drag} 
    className="flex flex-col items-center -webkit-box-align-center user-select-none cursor-move rounded-lg py-1 px-1 border border-transparent transition-all duration-300 hover:transform hover:scale-105"
    style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center justify-center w-[50px] h-[50px] rounded-lg bg-white border border-[#f0f0f1] box-shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] mb-2 -webkit-box-pack-center -webkit-box-align-center trainsition-[all 0.3s]">
        {typeof props.icon === 'string' ? <img src={props.icon} alt={props.name} className="w-10 h-10" /> : props.icon}
      </div>
      <div className="flex -webkit-box-align-center -webkit-box-pack-center mt-2 items-center text-xs">{props.name}</div>
    </div>
}

export default DragMenuItem