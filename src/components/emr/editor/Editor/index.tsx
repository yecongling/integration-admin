import React, {useEffect, useRef} from "react";
import {Col, Row} from "antd";

const Editor: React.FC<EditorProps> = (props) => {
  const {width, height} = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef != null && canvasRef.current != null) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx == null) {
        return;
      }
      const width = canvasRef.current.width
      const height = canvasRef.current.height
      const margins = [100, 120, 100, 120];
      // 清空面板
      ctx.clearRect(0, 0, width, height);
      const marginIndicatorSize = 35;
      ctx.save()
      ctx.translate(0.5, 0.5)
      ctx.strokeStyle = "#BABABA";
      ctx.beginPath()
      const leftTopPoint: [number, number] = [margins[3], margins[0]]
      const rightTopPoint: [number, number] = [width - margins[1], margins[0]]
      const leftBottomPoint: [number, number] = [margins[3], height - margins[2]]
      const rightBottomPoint: [number, number] = [width - margins[1], height - margins[2]]
      // 上左
      ctx.moveTo(leftTopPoint[0] - marginIndicatorSize, leftTopPoint[1])
      ctx.lineTo(...leftTopPoint)
      ctx.lineTo(leftTopPoint[0], leftTopPoint[1] - marginIndicatorSize)
      // 上右
      ctx.moveTo(rightTopPoint[0] + marginIndicatorSize, rightTopPoint[1])
      ctx.lineTo(...rightTopPoint)
      ctx.lineTo(rightTopPoint[0], rightTopPoint[1] - marginIndicatorSize)
      // 下左
      ctx.moveTo(leftBottomPoint[0] - marginIndicatorSize, leftBottomPoint[1])
      ctx.lineTo(...leftBottomPoint)
      ctx.lineTo(leftBottomPoint[0], leftBottomPoint[1] + marginIndicatorSize)
      // 下右
      ctx.moveTo(rightBottomPoint[0] + marginIndicatorSize, rightBottomPoint[1])
      ctx.lineTo(...rightBottomPoint)
      ctx.lineTo(rightBottomPoint[0], rightBottomPoint[1] + marginIndicatorSize)
      ctx.stroke()
      ctx.restore()

      ctx.font = "20px 宋体";
      ctx.fillText("老子要打造一个类似Google文档的东西", 120, 120);
    }
  }, [])

  return (
    <>
      <Row className="editor-container" style={{height: 'calc(100% - 134px)'}}>
        <Col span={24} style={{height: '100%'}}>
          <Row className="editor-content" style={{height: '100%'}}>
            {/* 这里添加横竖两个标尺、大纲 */}
            <Col style={{
              backgroundColor: 'rgb(227 227 227 / 82%)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              overflowY: 'auto'
            }}
                 className="editor-right-content">
              <div className="kix-page-paginated canvas-first-page" style={{
                position: 'relative',
                marginTop: '20px',
                marginBottom: '20px',
                zIndex: 0,
                width: width + 'px',
                height: height + 'px',
                boxShadow: '#9ea1a566 0 2px 12px'
              }}>
                <canvas ref={canvasRef} className="kix-canvas-tile-content" width={width} height={height}
                        style={{
                          zIndex: 0,
                          backgroundColor: 'rgb(249, 251, 253)',
                          cursor: 'text'
                        }} dir="ltr"></canvas>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

/* 设置组件默认值 */
Editor.defaultProps = {
  width: 794,
  height: 1123
}
export default Editor