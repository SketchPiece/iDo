<template>
  <div :class="['task', { deadline }, { expired: expired && !taskState }]">
    <div class="left">
      <Checkbox @click.stop @check="checkHandler" :state="completed" />
    </div>
    <div class="strike">
      <span :class="['text', { completed: taskState }]">{{ text }}</span>
    </div>
    <div v-if="deadline" class="deadline-view">
      Must be completed before
      <span :class="{ expired: expired && !taskState }">{{
        deadlineFormatted
      }}</span>
    </div>
    <div class="bookmark-wrap">
      <input
        @click.stop
        @change="updatePriority($event)"
        type="checkbox"
        class="bookmark"
        :checked="taskPriority"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from './Checkbox'

export default {
  props: {
    text: String,
    deadline: String,
    completed: Boolean,
    priority: Boolean,
    id: Number
  },
  components: {
    Checkbox
  },
  data() {
    return {
      taskState: this.completed,
      taskPriority: this.priority
    }
  },
  methods: {
    checkHandler(state) {
      this.taskState = state
      this.$store.dispatch('editTaskState', {
        id: this.id,
        editTask: { completed: state }
      })
    },
    updatePriority({ target: { checked } }) {
      this.taskPriority = checked
      this.$store.dispatch('editTask', {
        id: this.id,
        editTask: { priority: checked }
      })
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
  margin-top: 0;
  border-radius: 10px;
  position: relative;
  transition: 0.3s;
  .bookmark-wrap {
    position: absolute;
    right: 5px;
    top: 5px;
    .bookmark {
      position: relative;
      width: 25px;
      height: 25px;
      appearance: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      opacity: 0.3;
      &:checked {
        background: url('../../assets/bookmark_red.svg') no-repeat center;
      }
    }
  }
  .priority {
    position: absolute;
    width: 25px;
    height: 25px;
    background: url('../../assets/bookmark_red.svg');
    top: 10px;
    right: 10px;
  }
  // .strike {
  //   padding-top: 3px;
  // }
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
    .bookmark {
      background: url('../../assets/bookmark_grey.svg') no-repeat center;
      opacity: 1;
      &:checked {
        background: url('../../assets/bookmark_red.svg') no-repeat center;
        opacity: 1;
      }
    }
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
