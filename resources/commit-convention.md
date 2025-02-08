# Git Commit Message 规范：`<type>(<scope>): <subject>`

在 Git 版本控制中，清晰、结构化的提交信息可以极大地提高代码的可读性和维护性。本文介绍一种标准化的 Git 提交信息格式：`<type>(<scope>): <subject>`，并详细说明其使用方式。

------

## **1. 格式说明**

```
<type>(<scope>): <subject>
```

- **`type`**（提交类型）：描述提交的类别。
- **`scope`**（影响范围，可选）：指明此次提交影响的模块或功能。
- **`subject`**（简要描述）：用一句话概括本次提交的目的，避免超过 50 个字符。

> **示例**：
>
> ```
> feat(auth): 添加用户登录功能
> fix(cart): 修复购物车结算错误
> docs(readme): 更新 API 文档
> ```

------

## **2. 提交类型（`type`）说明**

| 类型       | 说明                                                     |
| ---------- | -------------------------------------------------------- |
| `feat`     | 新功能（feature）                                        |
| `fix`      | 修复 bug                                                 |
| `docs`     | 仅修改文档，例如 README、API 文档等                      |
| `style`    | 代码格式修改（不影响代码逻辑），如空格、分号、代码格式化 |
| `refactor` | 代码重构（不涉及功能修改、修复 bug）                     |
| `perf`     | 性能优化，提高代码执行效率                               |
| `test`     | 添加或修改测试代码                                       |
| `chore`    | 其他日常事务，例如构建过程、依赖管理、CI/CD 配置等       |
| `ci`       | 持续集成相关更改，如 GitHub Actions、Jenkins 配置        |
| `build`    | 构建系统或外部依赖项的更改，如 Webpack、npm 相关修改     |
| `revert`   | 撤销某次提交                                             |

> **示例**：
>
> ```
> feat(ui): 添加导航栏组件
> fix(api): 修复订单接口的返回错误
> chore(deps): 更新 axios 依赖到 1.2.3
> ```

------

## **3. 影响范围（`scope`）说明**

`<scope>` 用于说明影响的功能模块或文件，可选。

**常见示例**：

- `auth`（认证模块）
- `user`（用户模块）
- `cart`（购物车模块）
- `checkout`（结算模块）
- `ui`（前端界面相关）
- `api`（API 相关）
- `deps`（依赖项）
- `config`（配置文件）

> **示例**：
>
> ```
> feat(user): 添加用户注册功能
> fix(auth): 修复 token 过期导致的自动登出问题
> chore(deps): 更新 eslint 规则
> ```

------

## **4. 提交信息（`subject`）的书写要求**

- 用祈使句

  （即命令式，不要用过去式或完成时态）

  - ✅ `fix: 修复支付接口错误`
  - ❌ `fixed: 已修复支付接口错误`

- 首字母小写，不加句号

  - ✅ `fix(payment): 修复支付接口错误`
  - ❌ `Fix(payment): 修复支付接口错误.`

- **不超过 50 个字符**，更详细的说明可以放在正文（`body`）部分。

> **示例**：
>
> ```
> feat(product): 添加商品详情页
> fix(cart): 解决购物车商品数量显示错误
> chore(config): 调整 eslint 规则
> ```

------

## **5. 多行提交信息（带 `body` 和 `footer`）**

如果提交信息较长，可以使用 `git commit` 的多行模式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `body`（可选）：补充详细信息。
- `footer`（可选）：如果涉及 issue 关联或 breaking change，放在这里。

> **示例**：
>
> ```
> fix(auth): 修复 Token 失效问题
> 
> 修复因 token 过期导致用户无法自动刷新登录状态的问题。
> 现在用户在 token 失效后，会自动跳转到登录页面。
> 
> Closes #42
> ```

------

## **6. 常见示例**

```bash
git commit -m "feat(user): 添加用户个人资料页面"
git commit -m "fix(cart): 修复购物车页面的结算问题"
git commit -m "docs(api): 补充接口调用示例"
git commit -m "chore(deps): 更新 webpack 依赖"
git commit -m "perf(database): 提高查询速度"
git commit -m "revert: 撤销错误提交 8f3a2b4"
```

------

## **7. `Initial Commit`（初始化提交）

在创建新仓库时，初始提交（`Initial Commit`）可以使用：

```bash
git commit -m "chore(repo): initialize repository"
```

或者：

```bash
git commit -m "chore(init): initial commit"
```

------

## **8. 总结**

- 使用 `<type>(<scope>): <subject>` 格式，提高提交信息的规范性。
- `type` 选择正确的类别，如 `feat`、`fix`、`docs`、`chore` 等。
- `scope`（可选）标明影响的模块或功能，如 `auth`、`user`、`cart`。
- `subject` 需简洁明了，使用祈使句，首字母小写。
- 对于较长的提交信息，可以使用 `body` 补充详细内容。

遵循这个规范，将使 Git 历史记录更清晰，方便团队协作和项目维护。