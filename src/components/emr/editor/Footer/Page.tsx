import React from "react";

/**
 * 页脚中的页码组件
 *
 */
const Page: React.FC<{ pageNo?: number, pageSize?: number }> = (props) => {
  const {pageNo, pageSize} = props;
  return (
    <>
    <span style={{margin: '0 20px'}}>
      第{pageNo}页，共{pageSize}页
    </span>
    </>
  )
}

Page.defaultProps = {
  pageNo: 1,
  pageSize: 1
}
export default Page;