<template>
  <div class="waiting">
    <ScaleLoader
      class="loader"
      :color="'#2b6cb0'"
      :size="150"
      :size-unit="'px'"
    />
  </div>
</template>

<script>
import { ScaleLoader } from "@saeris/vue-spinners";
export default {
  name: "Waiting",
  components: {
    ScaleLoader
  }
};
</script>

<style scoped>
.waiting {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
