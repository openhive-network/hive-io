<template>
  <div class="not">
    <div class="not__inner">
      <div class="not__first">
        <h1 class="not__title">404!</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
  .not {
  display: flex;
  align-items: center;
  margin-bottom: 150px;
  &__inner {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 30px;
    width: calc(100% - 60px);
  }
  &__first {
    margin-top: 100px;
    padding: 0 0 20px 0;
    max-width: 720px;
    min-height: 120px;
    width: 100%;
    text-align: center;
  }
  }
</style>
