import React from "react";

type Props = {
  type: string;
  className?: string
}

const SvgIcon: React.FC<Props> = ({type, className}: Props)=> {
  return (
    <svg className='iconfont' aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
export default SvgIcon;