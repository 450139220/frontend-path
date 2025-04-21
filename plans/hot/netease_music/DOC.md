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

> ```json
> // package.json
> {
>     "scripts":
> 		"prettier": "prettier --write ."
> }
> ```

2. create a .prettierignore to avoid of formatting unnecessary files

> ```.prettierignore
> /node_modules/**
> /dist/*
>
> **/*.svg
> ```

3. while saving to format automatically, the plugin of prettier must be installed in editor

#### 1.3 Eslint

Eslint highlight errors in the editor based on its configuration.

1. use initiate command `npx eslint --init` to create the eslint configuration file, because there are lots of configurations in eslint

2. `eslint.config.js` is newer than `.eslintrc.js`, which is for the version higher than eslint8

---

### 2. Keys

#### 2.1 Router

1. the type of route is `RouteObject` from **react-router**, and the file of initial routes must be end of `.tsx`
2. lazy load

#### 2.2 Snippet

use code snippet to create a coding template fast, just like `log` to code `console.log()`

---

### 3. React

#### 3.1 Memo

1. `use `memo()` to cover a function component when optimizing the render function

2. but `memo()` would consume more memory
