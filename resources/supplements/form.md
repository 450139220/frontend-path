## **HTML `<form>` 表单完整学习指南**

`<form>` 是 HTML 中用于 **收集用户输入** 并提交给服务器的标签。本指南涵盖表单的 **结构、元素、属性、事件、提交方式、前端验证、样式与增强** 等所有内容，帮助你从基础到进阶掌握表单。

------

## **1. `<form>` 基础**

### **1.1 `<form>` 语法**

```html
<form action="提交地址" method="提交方式">
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>
```

### **1.2 `form` 主要属性**

| 属性         | 说明                               | 可能值                                                       |
| ------------ | ---------------------------------- | ------------------------------------------------------------ |
| `action`     | 提交数据的目标 URL                 | `/submit.php`，`/api`，`https://example.com`                 |
| `method`     | HTTP 提交方式                      | `GET`、`POST`                                                |
| `enctype`    | 数据编码类型（仅 `POST` 方法适用） | `application/x-www-form-urlencoded`（默认）、`multipart/form-data`（文件上传）、`text/plain` |
| `target`     | 提交目标窗口                       | `_self`（默认），`_blank`（新窗口），`_parent`，`_top`       |
| `novalidate` | 禁用 HTML5 表单验证                | `novalidate`                                                 |

### **1.3 `GET` vs `POST`**

| **对比项**   | **GET**                | **POST**                |
| ------------ | ---------------------- | ----------------------- |
| 数据提交方式 | URL 参数               | 请求体                  |
| 是否可见     | 可见（URL 显示参数）   | 不可见                  |
| 数据长度     | 有限制（约 2048 字符） | 无限制                  |
| 安全性       | 低（容易被篡改）       | 高（不会暴露在 URL 中） |
| 适用场景     | 查询数据，如搜索       | 提交敏感信息，如密码    |

------

## **2. 表单控件（input、select、textarea 等）**

### **2.1 常见 `<input>` 类型**

```html
<input type="text" name="username" placeholder="请输入用户名">
<input type="password" name="password">
<input type="email" name="email">
<input type="number" name="age" min="18" max="100">
<input type="checkbox" name="subscribe" checked>
<input type="radio" name="gender" value="male"> 男
<input type="radio" name="gender" value="female"> 女
<input type="file" name="avatar">
<input type="date" name="birthdate">
<input type="range" name="volume" min="0" max="100">
<input type="color" name="favColor">
```

### **2.2 其他表单控件**

```html
<!-- 下拉选择框 -->
<select name="country">
  <option value="CN">中国</option>
  <option value="US">美国</option>
</select>

<!-- 文本域 -->
<textarea name="comments" rows="5" cols="30"></textarea>

<!-- 按钮 -->
<button type="submit">提交</button>
<button type="reset">重置</button>
<button type="button" onclick="alert('Hello!')">点击</button>
```

### **2.3 `<input>` 重要属性**

| 属性          | 说明                       |
| ------------- | -------------------------- |
| `name`        | 表单字段名称，提交时作为键 |
| `value`       | 默认值                     |
| `placeholder` | 输入提示文本               |
| `required`    | 必填字段                   |
| `readonly`    | 只读                       |
| `disabled`    | 禁用                       |
| `maxlength`   | 最大输入字符数             |
| `pattern`     | 正则表达式匹配             |

------

## **3. 提交表单**

### **3.1 传统表单提交**

```html
<form action="/submit" method="post">
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>
```

### **3.2 `FormData` + `fetch` 方式提交**

```html
<form id="myForm">
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>

<script>
document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault(); // 阻止默认提交

  const formData = new FormData(event.target);
  
  fetch("/submit", {
    method: "POST",
    body: formData
  }).then(response => response.json())
    .then(data => console.log(data));
});
</script>
```

------

## **4. 表单验证**

### **4.1 HTML5 表单验证**

```html
<input type="email" name="email" required>
<input type="password" name="password" minlength="6">
```

### **4.2 JavaScript 自定义验证**

```html
<form id="myForm">
  <input type="text" name="username" id="username" required>
  <button type="submit">提交</button>
</form>

<script>
document.getElementById("myForm").addEventListener("submit", (event) => {
  const username = document.getElementById("username").value;
  if (username.length < 3) {
    alert("用户名至少 3 个字符");
    event.preventDefault();
  }
});
</script>
```

------

## **5. 表单样式**

```css
input, select, textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
}

button {
  background: blue;
  color: white;
  padding: 10px;
  border: none;
}
```

------

## **6. 高级增强**

### **6.1 Ajax 自动保存**

```javascript
document.querySelector("#username").addEventListener("input", (event) => {
  fetch("/save", {
    method: "POST",
    body: new FormData(document.querySelector("form"))
  });
});
```

### **6.2 使用 `localStorage` 记住表单数据**

```javascript
const input = document.getElementById("username");

input.value = localStorage.getItem("username") || "";

input.addEventListener("input", () => {
  localStorage.setItem("username", input.value);
});
```

------

## **7. 总结**

| 主题         | 内容                                                         |
| ------------ | ------------------------------------------------------------ |
| **基础**     | `<form>` 结构、属性（`action`、`method`）                    |
| **表单控件** | `<input>`（`text`、`email`、`password` 等）、`<select>`、`<textarea>` |
| **提交方式** | 传统提交、`FormData` + `fetch`                               |
| **验证**     | HTML5 验证、JavaScript 自定义验证                            |
| **样式**     | CSS 美化                                                     |
| **高级功能** | Ajax 自动保存、`localStorage` 记住数据                       |

💡 **推荐学习路径**：

1. 熟练使用 `<form>` 及其子元素
2. 掌握 `GET`/`POST` 提交数据
3. 学习 `fetch` 提交数据
4. 进行表单验证（HTML5 + JS）
5. 通过 CSS 美化表单
6. 进阶学习 Ajax 和数据存储优化

🚀 这样你就能完全掌握 HTML 表单啦！