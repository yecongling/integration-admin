import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  InputRef,
  Row,
  Segmented,
  SegmentedProps,
  Switch,
  Tooltip,
} from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  FileDoneOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProjectModel } from "@/services/project/design/projectModel";
import { getProjects } from "@/services/project/design/designApi.ts";
import { addKeyToData } from "@/utils/utils.ts";
import { useGlobalStore } from "@/hooks/sotreContext";
import { useNavigate } from "react-router-dom";
import ProjectInfoModal from "./ProjectInfoModal";

/**
 *
 * @returns 项目设计
 */
const Design: React.FC = () => {
  // 从全局状态库中获取数据
  const { globalStore } = useGlobalStore();
  const { colorPrimary } = globalStore;
  // 路由跳转
  const navigate = useNavigate();
  // 项目信息
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  // 分段器选中的值
  const [projectType, setProjectType] = useState<string>("interface");
  const [open, setopen] = useState<boolean>(false);

  // 当前点击的项目
  const [projectId, setProjectId] = useState<string>("");
  // 判定是不是编辑操作
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 检索框
  const inputRef = useRef<InputRef>(null);
  // 分段器上的选项
  const items: SegmentedProps["options"] = [
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

  /**
   * 新增项目
   */
  const addProject = () => {
    setopen(true);
    setIsEdit(false);
  };

  /**
   * 更新项目
   */
  const updateProject = (project: ProjectModel) => {};

  return (
    <>
      <Card
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        styles={{ body: { height: "100%" } }}
      >
        <h3 style={{ margin: "0" }}>项目列表</h3>
        <Row style={{ marginTop: "8px" }}>
          <Col span={20}>
            <Segmented
              defaultValue="interface"
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
          <Flex wrap gap={24} style={{ alignContent: "flex-start" }}>
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
              onClick={addProject}
            >
              <PlusOutlined style={{ color: colorPrimary, fontSize: 44 }} />
              <p>新建项目</p>
            </Card>
            {projects.length > 0 &&
              projects.map((project: ProjectModel) => (
                <Card
                  key={project.id}
                  className="project-card"
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
                  extra={
                    <div style={{ display: "flex" }}>
                      <Tooltip title="放入回收站" className="toRecrycle">
                        <Button
                          type="text"
                          shape="circle"
                          style={{
                            position: "absolute",
                            top: "-16px",
                            right: "-16px",
                          }}
                          icon={
                            <CloseCircleOutlined
                              style={{
                                color: "red",
                                fontSize: 18,
                              }}
                            />
                          }
                        />
                      </Tooltip>
                      <Switch defaultChecked />
                    </div>
                  }
                  style={{ width: 225, height: 256, cursor: "pointer" }}
                >
                  <p>这里面是项目内容</p>
                  {/* 操作按钮 */}
                  <div className="buttonGroup">
                    <Button
                      icon={<NodeIndexOutlined />}
                      type="primary"
                      onClick={() =>
                        navigate("/project/designer", { state: project })
                      }
                    >
                      设计
                    </Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                  </div>
                </Card>
              ))}
          </Flex>
        </Row>
      </Card>
      {/* 新增项目的弹窗界面 */}
      <ProjectInfoModal
        open={open}
        setOpen={setopen}
        projectId={projectId}
        projectType={projectType}
        isEdit={isEdit}
      />
    </>
  );
};
export default Design;
