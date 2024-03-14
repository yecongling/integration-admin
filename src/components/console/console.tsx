import React, {useEffect, useRef, useState} from "react";
import {Modal} from "antd";
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import './console.less';

/**
 * 前端使用的SQL、错误监控台
 */
const Console: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
  const [disabled, setDisabled] = useState(true);
  const draggleRef = useRef<HTMLDivElement>(null);
  // 初始化的时候绑定键盘事件
  useEffect(() => {
    // 监听键盘事件
    document.addEventListener("keyup", keyupEvent, false);
  });

  /**
   * 监听键盘事件
   * @param e
   */
  const keyupEvent = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setOpen(false);
    }
    if (e.ctrlKey && e.keyCode === 123) {
      setOpen(true);
    }
  }

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const {clientWidth, clientHeight} = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        open={open}
        mask={false}
        maskClosable={false}
        title={<div
          style={{
            width: '100%',
            cursor: 'move',
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={() => {
          }}
          onBlur={() => {
          }}
        >
          监控台
        </div>}
        wrapClassName="ant-modal-wrap-console"
        width={380}
        style={{top: 60, right: 26, position: "absolute", zIndex: 1000}}
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
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        console监控台
      </Modal>
    </>
  )
}
export default Console;