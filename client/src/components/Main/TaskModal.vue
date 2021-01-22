<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-if="dialog" @click="close" class="modal-bg"></div>
  </transition>
  <transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="dialog" class="modal window">
      <div class="header">
        <div @click="close" class="circle red first close"></div>
        <span>Edit task</span>
      </div>
      <div class="main">
        <textarea v-model="text" class="inp"></textarea>
        <div class="controls">
          <div class="date">
            Deadline:
            <div class="clear" @click="clearDate"></div>
            <datepicker
              v-model="deadline"
              placeholder="Select date"
              :typeable="true"
              format="DD.MM.YYYY"
            />
          </div>
          <div class="buttons">
            <button @click="deleteTask" class="btn red">Delete</button>
            <button @click="save" class="btn blue">Save</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import './datepicker.scss'

export default {
  components: {
    Datepicker
  },
  data: () => ({
    text: '',
    dialog: false,
    completed: false,
    deadline: null,
    resolve: null
  }),
  methods: {
    clearDate() {
      this.deadline = null
    },
    edit({ deadline, text, completed }) {
      this.text = text ? text : ''
      this.deadline = deadline ? new Date(deadline) : null
      this.completed = completed
      this.dialog = true
      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
    clear() {
      this.text = ''
      this.deadline = null
    },
    close() {
      this.dialog = false
      this.clear()
      this.resolve(null)
    },
    save() {
      this.dialog = false
      const task = {
        text: this.text,
        deadline: this.deadline ? this.deadline : undefined,
        completed: this.completed
      }
      this.clear()
      this.resolve({ status: 'edit', task })
    },
    deleteTask() {
      this.dialog = false
      this.resolve({ status: 'delete' })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-bg {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: calc(100% + 10px);
  top: -10px;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  animation-duration: 0.5s;
}
.modal {
  position: absolute;
  top: calc(50% - 150px - 10px);
  left: calc(50% - 200px);
  height: 300px;
  width: 400px;
  animation-duration: 0.3s;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .controls {
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin-top: 20px;
    .buttons > button {
      margin: 0px;
      // height: 33px;
      padding: 5px 10px;
      margin-left: 10px;
    }
  }
}

.date {
  color: white;
  position: relative;
  div {
    margin-top: 5px;
  }
  .clear {
    background: url('../../assets/close.svg') no-repeat center / 14px, #f76357;
    position: absolute;
    width: 14px;
    height: 14px;
    z-index: 1;
    border-radius: 50%;
    right: -6px;
    top: 16px;
    user-select: none;
    cursor: pointer;
  }
}
.inp {
  background-color: #292a2e;
  padding: 10px;
  width: 80%;
  height: 40%;
  resize: none;
}
</style>
