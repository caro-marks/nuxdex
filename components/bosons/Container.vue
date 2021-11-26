<template>
  <div class="container">
    <p>conteiner started</p>
    <slot />
    <p>container ending</p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 0.25em solid color('bug');
  margin: 0 auto;
  max-width: 1070px;
  @include screen('small') {
    width: 90%;
  }
  @include screen('medium') {
    width: 85%;
  }
  @include screen('large', 'infinity') {
    width: 70%;
  }
}
</style>
