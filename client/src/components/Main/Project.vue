<template>
  <div class="window" :style="{ width: '100%' }">
    <div class="header">
      <div @click="deleteProject" class="circle red first close"></div>
      <input type="text" v-model="projectName" />
    </div>
    <div class="main">
      <div class="tasks">
        <transition-group
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          move-class="tasks-move"
        >
          <Task
            v-for="task of tasks"
            :key="task.id"
            class="fade-animation-half"
            :id="task.id"
            @click="editTask(task.id)"
            :text="task.text"
            :deadline="task.deadline"
            :completed="task.completed"
            :priority="task.priority"
          />
        </transition-group>
      </div>
      <TaskModal ref="task" />
      <DeleteModal ref="delete" />
      <div class="input-wrapper">
        <input
          v-model="inputText"
          @keypress.enter="addTask"
          @focus="active = true"
          @blur="active = false"
          class="inp"
          type="text"
        />
        <div @click="addTask" :class="['btn-arrow', { active }]">
          <Arrow />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow'
import Task from './Task'
import TaskModal from './TaskModal'
import DeleteModal from './DeleteModal'
import _ from 'lodash'

export default {
  props: {
    name: {
      type: String
    },
    id: {
      type: Number
    }
  },
  components: {
    Arrow,
    Task,
    TaskModal,
    DeleteModal
  },
  data() {
    return {
      projectName: this.name,
      active: false,
      inputText: ''
    }
  },
  methods: {
    addTask() {
      if (!this.inputText) return
      this.$store.dispatch('addTask', {
        projectId: this.id,
        text: this.inputText
      })
      this.inputText = ''
    },
    async editTask(id) {
      const taskToEdit = this.tasks.find(t => t.id === id)
      const edit = await this.$refs.task.edit(taskToEdit)
      if (!edit) return
      if (edit.status === 'delete') {
        return this.$store.dispatch('deleteTask', id)
      } else if (edit.status === 'edit') {
        return this.$store.dispatch('editTask', {
          id,
          editTask: { ...edit.task, projectId: this.id }
        })
      }
    },
    async deleteProject() {
      const del = await this.$refs.delete.open(this.projectName)
      if (!del) return
      this.$store.dispatch('deleteProject', this.id)
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.filterTasks(this.id)
    }
  },
  watch: {
    projectName: _.debounce(function(name) {
      this.$store.dispatch('editProject', {
        id: this.id,
        editProject: { name }
      })
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
.tasks {
  min-height: 150px;
}
.tasks-move {
  transition: transform 0.6s ease;
}
.main {
  position: relative;
}
.project {
  margin-top: 25px;
}
.input-wrapper {
  height: 60px;
  background: #252525;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-arrow {
    svg {
      transition: 0.3s;
      color: grey;
    }
    background-color: #424242;
    margin-left: 15px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      svg {
        color: white;
      }
      background: #377ef6;
    }
    &.active {
      svg {
        color: white;
      }
      background: #377ef6;
    }
  }
}
</style>
