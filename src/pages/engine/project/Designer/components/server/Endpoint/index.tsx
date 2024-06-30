import React, {useRef} from "react";
import {Form, Input, InputRef, Modal, ModalProps, Select} from "antd";
import "./index.less";

/**
 * 服务模块
 * @constructor
 */
const Endpoint: React.FC<ModalProps> = (props) => {
  const projectName = useRef<InputRef>(null);
  /**
   * 窗口打开关闭
   * @param {boolean} open
   */
  const handleAfterOpen = (open: boolean) => {
    if (open && projectName.current) {
      projectName.current.focus();
    }
  }
  return (
    <>
      <Modal {...props} width={800} title="创建新终端" afterOpenChange={handleAfterOpen}
             styles={{body: {padding: '20px'}}}>
        <Form
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{span: 3}}
          initialValues={{
            projectPriority: '0',
            projectType: 'soap'
          }}
        >
          <Form.Item name="projectName" label={<><span className="red">*</span><span>名称</span></>}>
            <Input ref={projectName} autoComplete="off" autoFocus/>
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea/>
          </Form.Item>
          <Form.Item name="projectType" label={<><span className="red">*</span><span>类型</span></>}>
            <Select options={[
              {value: 'soap', label: 'web服务（SOAP）'},
              {value: 'http', label: 'http服务'},
              {value: 'command', label: '命令行'},
              {value: 'database', label: '数据库'},
              {value: 'dll', label: '动态链接库（DLL）'},
              {value: 'email', label: '邮件'},
              {value: 'file', label: '文件目录'},
              {value: 'ftp', label: 'FTP'},
              {value: 'hl7', label: 'HL7'},
              {value: 'timer', label: '定时器'},
              {value: 'jms', label: 'JMS'},
              {value: 'kafka', label: 'Kafka'},
            ]}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Endpoint;