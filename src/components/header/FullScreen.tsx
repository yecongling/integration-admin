import React, {useEffect, useState} from "react";
import screenfull from "screenfull";
import {FullscreenExitOutlined, FullscreenOutlined} from "@ant-design/icons";
import {Tooltip, message} from "antd";

const FullScreen: React.FC = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);
  useEffect(() => {
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) setFullScreen(true);
      else setFullScreen(false);
      return () => screenfull.off("change", () => {
      });
    });
  }, []);

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
    screenfull.toggle();
  };

  return (
    <>
      <Tooltip title="全屏" placement="bottom">
        {fullScreen ?
          <FullscreenExitOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={handleFullScreen}/> :
          <FullscreenOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={handleFullScreen}/>}
      </Tooltip>
    </>
  )
}
export default FullScreen;