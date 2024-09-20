import { Card, Divider, Empty, Tree } from "antd";
import React, { useState } from "react";
import { useEndpointContext } from "../Endpoint/endpointState";
/**
 * 端点类型表格
 */
const EndpointTypeTable: React.FC = () => {
    const { state, dispatch } = useEndpointContext();
    const [endpointTypes, setEndpointTypes] = useState<any[]>([]);

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
        <Card style={{ height: "100%" }}>
            <div className="title" style={{ fontSize: '18px', fontWeight: 'bold' }}>端点分类</div>
            <Divider style={{ margin: "12px 0" }} />

            <section
                style={{
                    height: "calc(100% - 48px)",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "16px",
                }}
            >
                {endpointTypes.length > 0 ? (
                    <Tree
                        treeData={endpointTypes}
                        selectedKeys={state.selectedKeys}
                        defaultExpandAll
                        showIcon
                        showLine
                        blockNode
                        onSelect={onTreeSelect}
                    />
                ) : (
                    <Empty description="暂无端点类型数据" />
                )}
            </section>

        </Card>
    )
}
export default EndpointTypeTable;
