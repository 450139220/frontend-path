# 农业模型应用平台

综合柑橘、山羊、脆李、水稻等作物，基于在线监控和传感器设备实时检测识别作物生长情况的应用型平台

## 整体结构

- store、router、view 分别为项目的状态管理、路由、视图 UI 三个大模块
- 项目由 typescript 和 vite 原生实现，未使用任何框架和库
- 每个页面和组件的 html 元素由 domapi 在 index.ts 里创建，其对应的样式在 index.module.css 里

_# 项目没有网络模块，如需要请自行添加_

## 项目组织

- 发布订阅模块 event 解耦项目中 store、router、view 模块的关系，再由 main 引入
- store 和 router 模块全局都只存在单个实例，view 导出的是类，需要手动实例话（如果是单例的话渲染页面时删除一次就没有了）

> store 为事件源，发布登录状态事件 `EVENTS.LOGIN` 由 router 监听
> router 发布页面渲染事件 `EVENT.RENDER` 由 view 监听
> 即 store =LOGIN=> router | router =push(RENDER)=> view

- router 和 navbar 强相关，故有一定耦合性，此后可以考虑给 `route` 添加 `showInNavbar` 属性，再根据用户权限状态 `auth` 动态决定是否显示该导航

---

## 后续添加页面

- 框架已经搭好了，需要新增路由页面的步骤
  > 1. 在 routes 里面按要求添加
  > 2. 在 /views/pages 里创建页面目录，结构为 index.ts 和 index.module.css
  > 3. index.ts 里写页面(用 domapi),index.module.css 里写页面对用的样式,样式仅该页面可以使用
