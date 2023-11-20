import React from "react";

/**
 * 字数统计
 * @constructor
 */
const WordCount: React.FC<{ selected: number, total: number }> = (props) => {
  const {selected, total} = props;
  return (
    <>
    <span>
      {selected === 0 ? '' : selected + '/'}{total}个字
    </span>
    </>
  )
}
WordCount.defaultProps = {
  selected: 0,
  total: 0
}
export default WordCount;