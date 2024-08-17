
/**
 * 定义端点模型
 */
export interface EndpointModel {
    id: string;
    name: string;
    type: string;
    mode: string;
    status: number,
    projectId?: string;
    updateTime: string;
    description?: string;
}