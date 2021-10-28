<template>
  <div class="wraper">
    <h1 :style="style">Hello</h1>
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
import { colorPrimary, colorBg } from "../src/styles";

const style = {
  color: colorPrimary,
  backgroundColor: colorBg,
};
</script>

<style scoped>
.wraper {
  text-align: center;
}
</style>
