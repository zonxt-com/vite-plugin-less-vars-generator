<template>
  <div class="wraper">
    <div :style="style">Hello</div>
    <p>{{ `import { colorPrimary, colorBg } from "../src/styles";` }}</p>
    <p>
      {{
        `const style = {
  color: colorPrimary,
  backgroundColor: colorBg,
};`
      }}
    </p>
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
