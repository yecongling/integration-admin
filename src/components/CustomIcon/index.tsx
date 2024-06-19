import { createFromIconfontCN } from '@ant-design/icons';

// 创建自定义IconFont组件
const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont.js', // 引入的iconfont.js文件路径(放在public文件夹下的图标文件)
});

const CustomIcon = ({ type, ...rest }: any) => <IconFont type={type} {...rest} />;

export default CustomIcon;
