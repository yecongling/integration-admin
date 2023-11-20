import React, {useState} from "react";
import "./PageSize.less";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Slider} from "antd";

const PageSize: React.FC<{ size: number }> = (props) => {
  const {size} = props;
  const [value, setValue] = useState(size);

  const minus = () => {
    let result = value - 10;
    if (result <= 10) {
      result = 10
    }
    setValue(result);
  }

  const plus = () => {
    let result = value + 10;
    if (result >= 500) {
      result = 500
    }
    setValue(result);
  }

  return (
    <>
      <div className="icon-wrapper">
        <MinusOutlined onClick={() => minus()} style={{color: '#000'}}/>
        <Slider min={10} max={300} step={1} onChange={setValue} value={value} style={{margin: '0 10px'}}/>
        <PlusOutlined onClick={() => plus()} style={{color: '#000'}}/>
      </div>
      <Button type="text" size="small" style={{userSelect: 'none'}}
              onClick={() => alert("弹出选择比例框")}>{value}%</Button>
    </>

  )
}
export default PageSize;