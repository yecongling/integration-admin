import React, {useEffect, useState} from "react";
import {Modal} from "antd";

/**
 * 前端使用的SQL、错误监控台
 */
const Console: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  // 初始化的时候绑定键盘事件
  useEffect(() => {
    // 监听键盘事件
    document.addEventListener("keyup", keyupEvent, false);
  });

  const keyupEvent = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setOpen(false);
    }
    if (e.ctrlKey && e.keyCode === 123) {
      setOpen(true);
    }
  }

  return (
    <>
      <Modal
        open={open}
        mask={false}
        maskClosable={false}
        title={<span>console监控台</span>}
        width={420}
        style={{top: 50, right: 26, position: "absolute"}}
        styles={{
          body: {
            height: "calc(100vh - 160px)",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "aliceblue"
          }
        }}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        console监控台
      </Modal>
    </>
  )
}
export default Console;