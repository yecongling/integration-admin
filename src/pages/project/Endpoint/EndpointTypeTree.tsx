import React, { memo, useEffect, useState } from "react";
import { useEndpointContext } from "./endpointState";
import { Card, Input, Tree } from "antd";
import { getEndpointTypeTree } from "@/services/project/endpointType/endpointTypeApi";
import { addKeyToData } from "@/utils/utils";

const { Search } = Input;

/**
 * 端点类型树
 */
const EndpointTypeTree: React.FC = memo(() => {
  const { state, dispatch } = useEndpointContext();
  const [endpointTypes, setEndpointTypes] = useState<any[]>([]);
  useEffect(() => {
    // 查询端点类型
    queryEndpointType().then((res) => {
      setEndpointTypes(addKeyToData(res, "id"));
    });
  }, []);

  // 树节点加载完毕后默认选中第一个节点
  useEffect(() => {
    if (endpointTypes.length > 0 && !state.treeLoading) {
      // 默认选中第一个节点
      if (endpointTypes[0].children && endpointTypes[0].children.length > 0) {
        dispatch({
          type: "SET_SELECTED_KEYS",
          payload: [endpointTypes[0].children[0].key as string],
        });
      } else {
        dispatch({
          type: "SET_SELECTED_KEYS",
          payload: [endpointTypes[0].key as string],
        });
      }
      // 设置树加载完成
      dispatch({
        type: "SET_TREE_LOADING",
        payload: true,
      });
    }
  }, [endpointTypes]);

  /**
   * 查询端点类型
   * @param search 查询条件
   */
  const queryEndpointType = async (search?: string) => {
    return await getEndpointTypeTree(search);
  };

  /**
   * 树节点选择事件，刷新右边的数据
   */
  const onTreeSelect = (selectedKeys: any[]) => {
    dispatch({
      type: "SET_SELECTED_KEYS",
      payload: selectedKeys,
    });
  };

  return (
    <>
      <Card style={{ height: "100%" }} styles={{ body: { height: "100%" } }}>
        <section style={{ marginBottom: "8px" }}>
          <Search
            autoFocus
            placeholder="请输入端点类型名进行检索"
            enterButton
            onSearch={(value) => queryEndpointType(value)}
          />
        </section>
        <section
          style={{
            height: "calc(100% - 48px)",
            display: "flex",
            flexDirection: "column",
            paddingTop: "16px",
          }}
        >
          {endpointTypes.length > 0 && (
            <Tree
              treeData={endpointTypes}
              selectedKeys={state.selectedKeys}
              defaultExpandAll
              showIcon
              showLine
              blockNode
              onSelect={onTreeSelect}
            />
          )}
        </section>
      </Card>
    </>
  );
});
export default EndpointTypeTree;
