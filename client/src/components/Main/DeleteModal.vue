<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="dialog" @click="cancel" class="modal-bg"></div>
    </transition>
    <transition
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >
      <div v-if="dialog" class="modal window">
        <div class="main">
          <span>Are you sure you want to delete '{{ name }}'?</span>
          <div class="controls">
            <button @click="cancel" class="btn dark">Cansel</button>
            <button @click="deleteHandler" class="btn red">Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    name: '',
    resolve: null
  }),
  methods: {
    open(name) {
      this.name = name
      this.dialog = true
      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
    cancel() {
      this.dialog = false
      this.resolve(null)
    },
    deleteHandler() {
      this.dialog = false
      this.resolve(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-bg {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  animation-duration: 0.5s;
}
.modal {
  position: absolute;
  top: calc(50% - 100px - 10px);
  left: calc(50% - 125px);
  height: 160px;
  width: 250px;
  animation-duration: 0.3s;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0px 5px;
  }
  .controls {
    margin-top: 20px;
    button {
      margin: 0px 10px;
      padding: 5px 10px;
    }
  }
}
</style>
