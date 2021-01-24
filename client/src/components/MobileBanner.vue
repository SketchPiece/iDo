<template>
  <div class="m-banner">
    <img src="../assets/broken.svg" alt="broken" />
    <h1>Oops..</h1>
    <p>Unfortunately iDo doesn't work on mobile devices yet</p>
  </div>
</template>

<style lang="scss" scoped>
.m-banner {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: #35363a;
  padding: 10px;
  box-sizing: border-box;
  p {
    text-align: center;
    max-width: 200px;
  }
  img {
    width: 150px;
  }
}
</style>
