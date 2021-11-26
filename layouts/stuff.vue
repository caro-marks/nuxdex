<template>
  <div class="default">
    <p>layout started</p>
    <!-- <Container> -->
    <Nuxt />
    <!-- </Container> -->
    <p>layout ending</p>
  </div>
</template>

<style lang="scss" scoped>
.default {
  border: 0.25em solid color('grass');
  margin-top: 4rem;
  display: grid;
  grid-gap: 6rem;
  .container {
    padding-bottom: 6rem;
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
