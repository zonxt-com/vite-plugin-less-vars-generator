# vite-plugin-less-vars-generator
Less vars generator plugin for vite, export vars as js object.

# Install
```sh
npm install vite-plugin-less-vars-generator --save-dev
# or
yarn add vite-plugin-less-vars-generator --dev
```

# Usage
**vite.config.js**
```
import { defineConfig } from "vite";
import lessVarsPlugin from "vite-plugin-less-vars-generator";

export default defineConfig({
  plugins: [
    vue(),
    lessVarsPlugin({ lessPath: "./src/styles/var.less" }),
  ],
});

```

# Options
| param name | type | description | example |
| :--------: |:---: | :----------:| :------:|
| lessPath | string | less vars define absolute file path | ./src/styles/var.less |

# Demo in vue3
***src/styles/var.less***
```
@color-primary: #ed6e00;
@color-bg: #f8f8f8;
@color-desc: #999999;
@color-text-primary: #464646;
@color-text-desc: #8f8f8f;
@color-link: #4295ff;
@color-border: #e4e4e4;
@color-white: #ffffff;
@color-red: red;

@font-size-xlarge: @font-size-base * 1.4;
@font-size-large: @font-size-base * 1.2;
@font-size-base: 14px;
@font-size-small: @font-size-base * 0.8;

@gutter-xlarge: @gutter-base * 1.4;
@gutter-large: @gutter-base * 1.2;
@gutter-base: 8px;
@gutter-small: @gutter-base * 0.8;
@gutter-xsmall: @gutter-base * 0.6;
```
***vite.config.ts***
```
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import lessVarsPlugin from "vite-plugin-less-vars-generator";

export default defineConfig({
  plugins: [
    vue(),
    lessVarsPlugin({ lessPath: path.join(__dirname, "src/styles/var.less") }),
  ],
});

```
***Generate***

If the less variable definition file changes, you need to recompile
```sh
yarn dev
```
In project root path 'src/styles/', generated a 'index.ts' file
```
export const colorPrimary = '#ed6e00'
export const colorBg = '#f8f8f8'
export const colorDesc = '#999999'
export const colorTextPrimary = '#464646'
export const colorTextDesc = '#8f8f8f'
export const colorLink = '#4295ff'
export const colorBorder = '#e4e4e4'
export const colorWhite = '#ffffff'
export const colorRed = 'red'
export const fontSizeXlarge = '19.60px'
export const fontSizeLarge = '16.80px'
export const fontSizeBase = '14px'
export const fontSizeSmall = '11.20px'
export const gutterXlarge = '11.20px'
export const gutterLarge = '9.60px'
export const gutterBase = '8px'
export const gutterSmall = '6.40px'
export const gutterXsmall = '4.80px'
```
Use it in vue3
```
<template>
  <div class="wraper">
    <div :style="style">Hello</div>
  </div>
</template>

<script lang="ts" setup>
import {
  colorPrimary,
  colorBg,
  fontSizeXlarge,
  gutterXlarge,
} from "../src/styles";

const style = {
  color: colorPrimary,
  backgroundColor: colorBg,
  fontSize: fontSizeXlarge,
  padding: gutterXlarge,
};
</script>

<style scoped>
.wraper {
  text-align: center;
}
</style>
```