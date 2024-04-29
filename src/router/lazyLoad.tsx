import React from "react";

export const lazyLoad = (moduleName: string) => {
  const viteModule = import.meta.glob('../**/*.tsx');
  //组件地址
  let URL = "";
  if (moduleName === "layouts") {
    URL = `../layouts/index.tsx`;
  } else if (moduleName.endsWith(".tsx")) {
    URL = `../pages/${moduleName}`;
  } else {
    URL = `../pages/${moduleName}/index.tsx`;
  }
  const Module = React.lazy(viteModule[`${URL}`] as any);
  return (
      <Module/>
  );
}