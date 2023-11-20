import React, {useState} from "react";
import {ExpandOutlined, FolderOpenOutlined} from "@ant-design/icons";
import {Tree} from "antd";
import {DataNode} from "antd/es/tree";
import {useSelector} from "react-redux";

/* 数据元树 */
const MetaDataTree: React.FC = () => {
  const {colorPrimary} = useSelector((store: any) => store.global);
  const [selectedKey, setSelectedKey] = useState<React.Key[]>(['00003']);
  const emrMetaData: DataNode[] = [
    {
      title: '卫生信息数据元',
      key: '00001',
      icon: <FolderOpenOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>,
      children: [
        {
          title: '第一个数据',
          key: '00002',
          icon: <ExpandOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>
        }
      ]
    },
    {
      title: "电子病历数据元",
      key: "00003",
      icon: <FolderOpenOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>,
      children: [
        {
          title: "住院号",
          key: "00004",
          icon: <ExpandOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>,
        }
      ]
    }
  ]
  return (
    <>
      <Tree
        showIcon
        showLine
        defaultSelectedKeys={selectedKey}
        treeData={emrMetaData}
        defaultExpandAll
        style={{marginTop: '6px'}}
        onClick={(_a, b) => {
          setSelectedKey([b.key]);
        }}
      />
    </>
  )
}
export default MetaDataTree;