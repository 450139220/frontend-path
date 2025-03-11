# TypeScript配置

### 1. 直接用名称导入

用`import a from 'a'`代替`import a from 'path/to/module/a'`

> **准备：**
>
> ```bash
> npm install vite typescript @types/node
> ```
>
> **实现：**
>
> ```json
> // tsconfig.json
> {
>     “compilerOptions": {
>     	"baseUrl": ".",
>     	"paths": {
>     		"a": ["./path/to/module/a.ts"],
>     		"b": ["./path/to/module/b.ts"]
>     	}
>     }
> }
> ```
>
> ```typescript
> import { defineConfig } from 'vite';
> import path from 'path';
> 
> export default defineConfig({
> 	resolve: {
> 		alias: {
> 			a: path.resolve(__dirname, './path/to/module/a.ts'),
> 			b: path.resolve(__dirname, './path/to/module/b.ts'),
> 		},
> 	},
> });
> ```
>
> 

---