<template>
  <div :class="['task', { deadline }, { expired: expired && !taskState }]">
    <div class="left">
      <Checkbox @click.stop @check="checkHandler" :state="completed" />
    </div>
    <div class="strike">
      <span :class="['text', { completed: taskState }]">{{ taskText }}</span>
    </div>
    <div v-if="deadline" class="deadline-view">
      Must be completed before
      <span :class="{ expired: expired && !taskState }">{{
        deadlineFormatted
      }}</span>
    </div>
  </div>
</template>

<script>
import Checkbox from './Checkbox'

export default {
  props: {
    text: String,
    deadline: String,
    completed: Boolean
  },
  components: {
    Checkbox
  },
  data() {
    return {
      taskState: this.completed,
      taskText: this.text
    }
  },
  methods: {
    checkHandler(state) {
      this.taskState = state
      this.$emit('updateState', state)
    }
  },
  computed: {
    deadlineFormatted() {
      if (!this.deadline) return ''
      const date = new Date(this.deadline)
      const day = date.getDate()
      const month = date.getMonth() + 1
      return `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${date.getFullYear()}`
    },
    expired() {
      if (!this.deadline) return false
      const deadline = new Date(this.deadline)
      const now = new Date()
      if (now > deadline) return true
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  padding: 10px;
  color: rgb(226, 226, 226);
  user-select: none;
  margin: 10px;
  border-radius: 10px;
  position: relative;
  span.expired {
    color: #cc4c4c;
  }
  cursor: pointer;
  .deadline-view {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    right: 5px;
    color: grey;
  }

  &.expired {
    color: #f76357;
  }

  &.deadline {
    padding-bottom: 22px;
  }
  .left {
    margin-right: 10px;
    position: relative;
  }
  &:hover {
    background: #202125;
  }
}

.text {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s;
  word-break: break-all;
  &.completed {
    background-size: 100% 2px;
  }
}
</style>
