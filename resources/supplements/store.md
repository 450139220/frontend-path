### **优化方案**

1. **存储 `storeName + 状态值` 作为唯一键**，确保不同状态的监听不会混淆。
2. **监听所有 `storeName` 的变化**，并在**状态匹配**时执行相应的处理函数。
3. **支持多个监听函数**，不同状态可以注册不同处理。

------

### **改进后的代码**

```typescript
export default class Store {
	private static instance: Store;
	private stores: Record<string, string>;
	private listeners: Record<string, (() => void)[]>;

	private constructor(stores: Record<string, string>) {
		this.stores = stores;
		this.listeners = {};
	}

	init() {
		for (let store in this.stores) {
			const item = sessionStorage.getItem(store);
			if (!item) {
				sessionStorage.setItem(store, this.stores[store]);
			}
		}
	}

	static getInstance(stores: Record<string, string> | null): Store | undefined {
		if (!Store.instance && stores) {
			Store.instance = new Store(stores);
		} else if (!Store.instance && !stores) {
			return undefined;
		}
		return Store.instance;
	}

	getStore(store: string): string {
		const item = sessionStorage.getItem(store);
		return item ? item : 'not-exist';
	}

	setStore(store: string, value: string): boolean {
		const oldValue = sessionStorage.getItem(store);
		if (oldValue !== value) {
			sessionStorage.setItem(store, value);
			this.notifyListeners(store, value); // 监听 store 的新状态
			return true;
		}
		return false;
	}

	// 绑定【storeName + 状态值】的监听
	addListener(store: string, state: string, callback: () => void) {
		const key = `${store}_${state}`;
		if (!this.listeners[key]) {
			this.listeners[key] = [];
		}
		this.listeners[key].push(callback);
	}

	// 触发监听
	private notifyListeners(store: string, state: string) {
		const key = `${store}_${state}`;
		if (this.listeners[key]) {
			this.listeners[key].forEach(callback => callback());
		}
	}
}
```

------

### **使用示例**

```typescript
const store = Store.getInstance({ A: '1', B: '2' });
store?.init();

// 监听 A 的状态变化
store?.addListener('A', '2', () => console.log('A 变成 2，执行 func1'));
store?.addListener('A', '3', () => console.log('A 变成 3，执行 func2'));
store?.addListener('A', '4', () => console.log('A 变成 4，执行 func3'));

// 监听 B 的状态变化
store?.addListener('B', '5', () => console.log('B 变成 5，执行 funcX'));
store?.addListener('B', '6', () => console.log('B 变成 6，执行 funcY'));

// 修改 A 的状态
store?.setStore('A', '2'); // 输出：A 变成 2，执行 func1
store?.setStore('A', '3'); // 输出：A 变成 3，执行 func2
store?.setStore('A', '4'); // 输出：A 变成 4，执行 func3

// 修改 B 的状态
store?.setStore('B', '5'); // 输出：B 变成 5，执行 funcX
store?.setStore('B', '6'); // 输出：B 变成 6，执行 funcY
```

------

### **优化点**

✅ **可以监听任意 `store` 的状态变化**（支持多个状态变量）
✅ **`addListener(store, state, callback)` 绑定特定状态的回调**
✅ **`setStore(store, value)` 自动触发该状态的回调**

这样，你就可以监听多个状态（`A`、`B`...），并在它们变为特定值时执行相应的操作！ 🚀

------

# 发布订阅模式在 JavaScript 中的实现

## 1. 什么是发布订阅模式？

发布订阅模式（Observer Pattern）是一种常见的设计模式，广泛应用于事件驱动的系统中。它允许一个对象（**发布者**）在其状态发生变化时，通知所有依赖于它的对象（**订阅者**），而不需要直接联系或了解订阅者。

### 核心概念：
- **发布者**：负责发布消息的对象。
- **订阅者**：监听消息并响应的对象。
- **消息**：发布者通知订阅者的数据或事件。

## 2. 发布订阅模式的原理

发布订阅模式的核心原理是通过中介（通常是一个“事件管理器”或“消息总线”）来解耦发布者和订阅者。

1. **发布者**：发布某些消息（如事件或数据更新），而不直接与订阅者交互。
2. **订阅者**：通过“订阅”某个事件或消息，当事件发生时，系统自动调用订阅者的回调函数。
3. **中介者**：管理所有订阅者，处理消息的分发。

## 3. 发布订阅模式的实现

### 3.1 使用一个简单的事件管理器

我们可以通过一个事件管理器（或称为消息总线）来实现发布订阅模式。事件管理器负责管理订阅者和发布者之间的关系。订阅者可以注册自己对某些事件的处理函数，而发布者可以触发事件，通知所有订阅该事件的订阅者。

### 示例代码：

```javascript
class EventEmitter {
  constructor() {
    this.events = {}; // 存储事件及对应的监听函数
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // 发布事件
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  // 取消订阅
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }
}
```

### 3.2 使用示例

```javascript
// 创建事件管理器实例
const eventEmitter = new EventEmitter();

// 订阅事件 'dataChange'
eventEmitter.on('dataChange', (newData) => {
  console.log(`数据发生变化: ${newData}`);
});

// 发布事件 'dataChange'
eventEmitter.emit('dataChange', '新数据');

// 输出：数据发生变化: 新数据

// 取消订阅事件 'dataChange'
const listener = (newData) => {
  console.log(`数据发生变化: ${newData}`);
};
eventEmitter.on('dataChange', listener);
eventEmitter.off('dataChange', listener);

// 再次发布事件 'dataChange'
eventEmitter.emit('dataChange', '新数据');

// 无输出，因为已经取消了订阅
```

## 4. 发布订阅模式的应用场景
发布订阅模式可以用于许多不同的场景，尤其是在以下情况下非常有效：

事件驱动编程：例如在前端开发中，用户触发事件时，触发相应的处理函数。
解耦：不同组件之间无需直接通信，而是通过事件进行交互。
异步任务处理：如在处理后台任务时，当任务完成时通知其他组件。

## 5. 发布订阅模式的优缺点

优点：
解耦：发布者和订阅者互相独立，发布者不需要知道订阅者的具体信息。
灵活性：可以在运行时添加和移除订阅者。
异步处理：支持异步任务的管理，可以在消息发布时立即处理或延迟处理。
缺点：
内存泄漏：如果订阅者不取消订阅，可能会造成内存泄漏。
难以调试：当事件非常多时，调试可能会变得更加困难，因为你需要追踪多个订阅者和事件的交互。


## 6. 发布订阅模式与观察者模式的区别
观察者模式：通常是一个对象（被观察者）维护一组依赖于它的观察者。当被观察者的状态变化时，所有观察者都会得到通知。在实现中，观察者和被观察者之间有一定的紧耦合。
发布订阅模式：是观察者模式的一个变种，增加了一个中介者（事件总线），使得发布者和订阅者之间不直接关联，从而实现了更松耦合的设计。

## 7. 小结
发布订阅模式是一种强大的设计模式，用于解耦和异步处理。在 JavaScript 中，我们可以通过事件管理器或消息总线来实现它，它在前端开发、异步编程等场景中都得到了广泛应用。

------

通过对发布订阅模式的实现，我们可以看到它如何通过事件总线来管理和触发事件，解耦各个组件间的关系，使得代码更加灵活和可维护。