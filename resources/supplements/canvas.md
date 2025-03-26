# HTML5 Canvas 教程

## 1. Canvas 基础

### 1.1 创建 Canvas

Canvas 是 HTML5 提供的一个用于绘图的 API，使用 `<canvas>` 元素来创建。

```html
<canvas id="myCanvas" width="500" height="400"></canvas>
<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d"); // 获取 2D 渲染上下文
</script>
```

原理：Canvas 提供了一个绘图上下文 `getContext("2d")`，允许我们使用 JavaScript 进行绘制。

------

## 2. 基本绘图

### 2.1 绘制矩形

```js
ctx.fillStyle = "red"; // 设置填充颜色
ctx.fillRect(50, 50, 150, 100); // 填充矩形（x, y, width, height）
```

原理：`fillRect(x, y, width, height)` 直接在 Canvas 上绘制填充矩形。

### 2.2 绘制边框矩形

```js
ctx.strokeStyle = "blue";
ctx.lineWidth = 5; // 线条宽度
ctx.strokeRect(50, 50, 150, 100);
```

原理：`strokeRect(x, y, width, height)` 只绘制边框，不填充。

### 2.3 清除矩形

```js
ctx.clearRect(60, 60, 50, 50);
```

原理：`clearRect(x, y, width, height)` 擦除指定区域内容。

------

## 3. 画线

```js
ctx.beginPath();
ctx.moveTo(100, 100); // 起点
ctx.lineTo(200, 200); // 终点
ctx.strokeStyle = "green";
ctx.lineWidth = 3;
ctx.stroke();
```

原理：

- `beginPath()` 开始新路径。
- `moveTo(x, y)` 移动到起始点。
- `lineTo(x, y)` 连接到新的点。
- `stroke()` 进行绘制。

------

## 4. 画圆

```js
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2); // (x, y, 半径, 起始角, 结束角)
ctx.fillStyle = "purple";
ctx.fill();
```

原理：

- `arc(x, y, r, startAngle, endAngle)` 画圆弧。
- `Math.PI * 2` 代表 360 度。
- `fill()` 填充。

------

## 5. 绘制文本

```js
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hello Canvas", 100, 100);
```

原理：

- `font` 设置字体。
- `fillText(text, x, y)` 直接绘制文本。

------

## 6. 绘制图片

```js
const img = new Image();
img.src = "image.png";
img.onload = () => {
  ctx.drawImage(img, 50, 50, 100, 100);
};
```

原理：

- `new Image()` 创建图片对象。
- `drawImage(img, x, y, width, height)` 绘制图像。

------

## 7. 动画实现（requestAnimationFrame）

```js
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(x, 100, 50, 50);
  x += 2;
  requestAnimationFrame(animate);
}
animate();
```

原理：

- `requestAnimationFrame(animate)` 递归调用优化动画。
- `clearRect` 清除之前的帧。
- `x += 2` 让物体移动。

------

## 8. 交互事件（鼠标点击）

```js
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(`点击位置: ${x}, ${y}`);
});
```

原理：

- `canvas.getBoundingClientRect()` 获取相对位置。
- `event.clientX - rect.left` 计算点击坐标。

------

## 9. 结束语

Canvas 提供了强大的绘图能力，适用于游戏、动画、可视化等场景。掌握这些基础操作，可以更进一步实现复杂交互效果。