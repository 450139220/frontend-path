# Neatease Music

##### Date: 2025/04/21

### 1. Coding Standards

#### 1.1 .editorconfig

.editorconfig controls the behaviors of different editors to maintain consistent formatting across environments.

```.editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true # remove the blank string at the end of line
insert_final_newline = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

#### 1.2 Prettier

Prettier ensures that files are automatically formatted according to the defined configuration.

1. add a script in package.json

```json
// package.json
{
     "scripts":
    "prettier": "prettier --write ."
}
```

2. create a .prettierignore to avoid of formatting unnecessary files

```.prettierignore
/node_modules/**
/dist/*

**/*.svg
```

3. while saving to format automatically, the plugin of prettier must be installed in editor

#### 1.3 Eslint

Eslint highlight errors in the editor based on its configuration.

1. use initiate command `npx eslint --init` to create the eslint configuration file, because there are lots of configurations in eslint

2. `eslint.config.js` is newer than `.eslintrc.js`, which is for the version higher than eslint8

---

### 2. Keys

#### 2.1 Router

1. the type of route is `RouteObject` from **react-router**, and the file of initial routes must be end of `.tsx`

> choose `useRoutes` now is better than `<Route>`

2. lazy load

```tsx
//lazy import component
const Component = lazy(() => import('path/to/component'))

// route object
{
  path: '/path',
  element: <Component />
}
```

remember to user `<Suspense>` to cover components, if use lazy loading to load views and it causes blink of components

3. hash mode wouldn't trigger browser request, which is better for no server, history mode is clearer and will request to the server for the page
3. `<NavLink>` active styles must be wrote in global css, and attribute `end` means to match the route totally same

```css
a.active {
  /* styles */
}
```



#### 2.2 Snippet

use code snippet to create a coding template fast, just like `log` to code `console.log()`

#### 2.3 Redux

_watch the official web of redux_


1. type of state (define typed hooks)

use `ReturnType<T>` is better, and this can infer to other custom hooks with types

```ts
// won't call store.getState()
type StateType = ReturnType<typeof store.getState>;

// call store.getState()
type StateType = typeof store.getState();

export const useAppSelector = useSelector.withTypes<RootState>();
```
2. use `shallowEqual` to avoid of unnecessary render when store is not changed

```ts
const count = useAppSelector(
  (state) => state.counter.count,
  shallowEqual
);
```

use `PayloadAction<T>` to define the action's type in `reducers`

### 3. React

#### 3.1 Memo

1. use `memo()` to cover a function component when optimizing the render function

2. but `memo()` would consume more memory

#### 3.2 Package

packages like `react-xxx` means these are used for bind react and the packages, like

> `react-router` binds react and the router, `react-router-dom` binds react and router and dom

#### 3.3 Request

send request in `useEffect()`

#### 3.4 Component

better to encapsulate the component to a single file based to its feature

#### 3.5 UseRef

`useRef()` is used for select a dom, just like `document.querySelector()` and `document.getElementById()` ...

#### 3.6 UseEffect

`useEffect()` would execute twice at strict mode, the step is to mount the component and unmount, then mount again

---

### 4. Vite

#### 4.1 environment

`import.meta.env` contains current environment, includes `DEV`, `PROD`, `SSR`

or use `.env.development` and `.env.production` to manage environment, the variables auto completion is injected at `env.d.ts`
