import React from "react";
import {CarryOutOutlined, FormOutlined} from '@ant-design/icons';
import type {DataNode} from 'antd/es/tree';
import {Tree} from "antd";

const ITree: React.FC = (props) => {
  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {title: 'leaf', key: '0-0-0-0', isLeaf: true},
            {
              title: (
                <>
                  <div>multiple line title</div>
                  <div>multiple line title</div>
                </>
              ),
              key: '0-0-0-1',
            },
            {title: 'leaf', key: '0-0-0-2', isLeaf: true},
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{title: 'leaf', key: '0-0-1-0', isLeaf: true}],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [
            {title: 'leaf', key: '0-0-2-0', isLeaf: true},
            {
              title: 'leaf',
              key: '0-0-2-1'
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          children: [
            {title: 'leaf', key: '0-1-0-0', isLeaf: true},
            {title: 'leaf', key: '0-1-0-1', isLeaf: true},
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Tree.DirectoryTree showLine showIcon defaultExpandAll treeData={treeData} style={{marginTop: '6px'}}></Tree.DirectoryTree>
    </>
  )
}

export default ITree;