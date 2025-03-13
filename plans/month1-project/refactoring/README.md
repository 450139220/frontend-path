# 农业模型应用平台

综合柑橘、山羊、脆李、水稻等作物，基于在线监控和传感器设备实时检测识别作物生长情况的应用型平台

## 整体结构

- store、router、view 分别为项目的状态管理、路由、视图 UI 三个大模块
- 项目由 typescript 和 vite 原生实现，未使用任何框架和库

*#项目没有网络模块，如需要请自行添加*

## 项目组织

- 发布订阅模块 event 解耦项目中 store、router、view 模块的关系，再由 main 引入
- 三个模块全局都只存在单个实例

> store 为事件源，发布登录状态事件 `EVENTS.LOGIN` 由 router 监听
> router 发布页面渲染事件 `EVENT.RENDER` 由 view 监听
> 即 store =LOGIN=> router | router =push(RENDER)=> view
