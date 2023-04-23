import React from "react";
import "./loading.less";
const loading: React.FC = ()=> {
  return (
    <div className="first-loading-wrap">
      <div className="loading-wrap">
        <span className="dot dot-spin"><i></i><i></i><i></i><i></i></span>
      </div>
    </div>
  )
}
export default loading;