import React, {useState} from "react";
import {FileOutlined, FolderOpenOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import type {DataNode} from 'antd/es/tree';
import {Input, Tree} from "antd";

const EmrDefTree: React.FC = () => {
  const {colorPrimary} = useSelector((store: any) => store.global);
  const [selectedKey, setSelectedKey] = useState<React.Key[]>(['00003']);

  /* 模拟数据 */
  const treeData: DataNode[] = [
    {
      title: '住院病历',
      key: '00001',
      icon: <FolderOpenOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>,
      children: [
        {
          title: '入院记录',
          key: '00002',
          icon: <FolderOpenOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>,
          children: [
            {
              title: '外科入院记录',
              key: '00003',
              icon: <FileOutlined style={{fontSize: '18px', verticalAlign: 'text-top'}}/>,
            }
          ]
        }
      ]
    },
    {
      title: '护理记录',
      key: '00005',
      icon: <FolderOpenOutlined style={{color: colorPrimary, fontSize: '18px', verticalAlign: 'text-top'}}/>,
      children: [
        {
          title: '一般护理记录',
          key: '0006',
          icon: <FileOutlined style={{fontSize: '18px', verticalAlign: 'text-top'}}/>,
        }
      ]
    }
  ];
  const onSearchEmr = (value: string) => {
    console.log(value);
  }
  return (
    <>
      <Input.Search autoFocus placeholder="通过名称检索" enterButton
                    style={{width: '100%', marginRight: '6px'}} onSearch={onSearchEmr}/>
      <Tree
        showIcon
        showLine
        treeData={treeData}
        defaultSelectedKeys={selectedKey}
        defaultExpandAll
        style={{marginTop: '6px'}}
        onClick={(_a, b) => {
          setSelectedKey([b.key]);
        }}
      />
    </>
  );
}
export default EmrDefTree;