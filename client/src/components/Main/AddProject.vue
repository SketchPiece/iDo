<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-if="dialog" @click="close" class="modal-bg pf" />
  </transition>
  <transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="dialog" class="modal pf window">
      <div class="header">
        <div class="circle red first close"></div>
        <span>Add new project</span>
      </div>
      <div class="main">
        <input
          ref="input"
          @keypress.enter="save"
          v-model="projectName"
          class="inp"
          type="text"
        />
        <button @click="save" class="add">+</button>
      </div>
    </div>
  </transition>
  <button @click="open" class="add-project-btn">
    <span>+</span>
  </button>
  <transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="popup" class="popup">Add your first project</div>
  </transition>
</template>

<script>
export default {
  emits: ['create'],
  data: () => ({
    dialog: false,
    projectName: ''
  }),
  methods: {
    open() {
      this.dialog = true
      this.$store.commit('SET_POPUP', false)
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    close() {
      this.dialog = false
    },
    save() {
      this.dialog = false
      this.$emit('create', { name: this.projectName })
      this.projectName = ''
    }
  },
  computed: {
    popup() {
      return this.$store.state.popup
    }
  }
}
</script>

<style lang="scss" scoped>
.pf {
  position: fixed;
  z-index: 100;
}
.popup {
  position: fixed;
  bottom: 9px;
  right: 90px;
  background: #292a2e;
  padding: 10px;
  border-radius: 11px;
  box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.6);
  animation-duration: 0.3s;

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: calc(50% - 8px);
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    border-left: 10px solid #292a2e;
    clear: both;
  }
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inp {
  background-color: #292a2e;
}

.add {
  background-color: #424242;
  color: #808080;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 25px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
  &:hover {
    background-color: #377ef6;
    color: white;
  }
}

.modal-bg {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: -20px;
  left: 0;
  animation-duration: 0.5s;
}

.modal {
  width: 400px;
  height: 150px;
  top: calc(50% - 75px - 20px);
  left: calc(50% - 200px);
  animation-duration: 0.3s;
}

.add-project-btn {
  position: fixed;
  width: 55px;
  height: 55px;
  background-color: red;
  bottom: 20px;
  right: 20px;
  font-size: 35px;
  display: flex;
  justify-content: center;
  // align-items: center;
  color: white;
  background: linear-gradient(
    347deg,
    rgba(5, 102, 147, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  border-radius: 11px;
  user-select: none;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    filter: brightness(0.5);
  }

  span {
    margin-top: 6px;
  }
}
</style>
