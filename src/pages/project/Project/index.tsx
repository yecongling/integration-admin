import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import {
  Card,
  Col,
  Flex,
  Input,
  InputRef,
  Row,
  Segmented,
  SegmentedProps,
  Switch,
} from "antd";
import {
  FileDoneOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProjectModel } from "@/services/project/design/projectModel";
import { getProjects } from "@/services/project/design/designApi.ts";
import { addKeyToData } from "@/utils/utils.ts";
import { useGlobalStore } from "@/hooks/sotreContext";

/**
 *
 * @returns 项目设计
 */
const Design: React.FC = () => {
  // 从全局状态库中获取数据
  const { globalStore } = useGlobalStore();
  const { colorPrimary } = globalStore;
  // 项目信息
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  // 分段器选中的值
  const [projectType, setProjectType] = useState<string>("all");
  // 检索框
  const inputRef = useRef<InputRef>(null);
  // 分段器上的选项
  const items: SegmentedProps["options"] = [
    {
      label: "全部",
      value: "all",
    },
    {
      label: "接口项目",
      value: "interface",
    },
    {
      label: "集成项目",
      value: "integration",
    },
    {
      label: "三方项目",
      value: "other",
    },
  ];

  useEffect(() => {
    queryProjects({}).then((projects) => {
      setProjects(projects);
    });
  }, []);

  /**
   * 检索的输入框敲回车的时候也是需要进行数据的检索
   */
  const onPressEnter = async (e: any) => {
    const projects = await queryProjects({ projectType, name: e.target.value });
    setProjects(projects);
  };

  /**
   * 分段器切换
   * @param value
   */
  const onSegmentedChange = async (value: string | number) => {
    // 设置选中的类型
    setProjectType(value.toString());
    // 重新检索数据
    const projects = await queryProjects({
      projectType: value,
      name: inputRef.current?.input?.value || "",
    });
    setProjects(projects);
  };

  /**
   * 检索项目数据
   * 传输的条件需要项目类型、搜索框中的内容（项目名）
   */
  const queryProjects = async (params: Record<string, any>) => {
    const result = await getProjects(params);
    // 将返回的数据添加key，用作react的判断
    return addKeyToData(result, "id");
  };

  return (
    <Card
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      styles={{ body: { height: "100%" } }}
    >
      <h3 style={{ margin: "0" }}>项目列表</h3>
      <Row style={{ marginTop: "8px" }}>
        <Col span={20}>
          <Segmented
            defaultValue="all"
            options={items}
            value={projectType}
            onChange={onSegmentedChange}
          />
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Input
            autoFocus
            placeholder="搜索"
            variant="filled"
            suffix={<SearchOutlined />}
            ref={inputRef}
            onPressEnter={onPressEnter}
          />
        </Col>
      </Row>
      <Row
        style={{
          flex: 1,
          marginTop: "16px",
          justifyContent: projects.length === 0 ? "center" : "",
        }}
        gutter={16}
      >
        <Flex wrap gap={16} style={{ alignContent: "flex-start" }}>
          {/* 这里需要添加一个新增的 */}
          <Card
            style={{
              width: 225,
              height: 256,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            styles={{ body: { textAlign: "center" } }}
          >
            <PlusOutlined style={{ color: colorPrimary, fontSize: 44 }} />
            <p>新建项目</p>
          </Card>
          {projects.length > 0 &&
            projects.map((project: ProjectModel) => (
              <Card
                key={project.id}
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FileDoneOutlined
                      style={{
                        fontSize: "18px",
                        color: colorPrimary,
                        marginRight: "8px",
                      }}
                    />{" "}
                    {project.projectName}
                  </div>
                }
                size="small"
                extra={<Switch checked={project.status === "1"} />}
                style={{ width: 225, height: 256, cursor: "pointer" }}
              >
                <p>这里面是项目内容</p>
              </Card>
            ))}
        </Flex>
      </Row>
    </Card>
  );
};
export default Design;
