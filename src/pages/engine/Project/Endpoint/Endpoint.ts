/**
 * 端点对象
 */
export interface Endpoint {
    id: string;
    name: string;
    type: string;
    mode: string;
    description?: string;
    projectId?: string;
    configs?: Record<string, any>[]
}