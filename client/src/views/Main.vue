<template>
  <div class="container">
    <Project
      v-for="project of projects"
      :id="project.id"
      :key="project.id"
      :name="project.name"
      :tasks="tasks"
      @addTask="text => addTask(project.id, text)"
      @editTask="editTask"
      @updateTaskState="editTaskState"
      @updateTaskPriority="editTask"
      @deleteTask="deleteTask"
      @editProject="p => editProject(project.id, p)"
      @deleteProject="deleteProject"
    />
    <AddProject @create="addProject" />
  </div>
</template>

<script>
import Project from '../components/Main/Project'
import AddProject from '../components/Main/AddProject'
import { ProjectService } from '../services/project.service'
import { TaskService } from '../services/task.service'
import { byDate } from '../utils'

export default {
  components: {
    Project,
    AddProject
  },
  data: () => ({
    projects: [],
    tasks: []
  }),
  async mounted() {
    this.projects = (await ProjectService.getAll()).sort(byDate())
    this.tasks = (await TaskService.getAll()).sort(byDate())
    const addProjectPopup = !this.projects.length
    this.$store.commit('SET_POPUP', addProjectPopup)
  },
  methods: {
    async addTask(projectId, text) {
      const task = await TaskService.add({ projectId, text })
      this.tasks.unshift(task)
    },
    async editTask(id, editTask) {
      const task = await TaskService.edit(id, editTask)
      const idx = this.tasks.findIndex(t => t.id === id)
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.$nextTick(() => {
        this.tasks.splice(idx, 0, task)
      })
    },
    async editTaskState(id, editTask) {
      await TaskService.edit(id, editTask)
    },
    async deleteTask(id) {
      await TaskService.del(id)
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    async addProject(newProject) {
      const project = await ProjectService.add(newProject)
      this.projects.unshift(project)
    },
    async editProject(id, editProject) {
      await ProjectService.edit(id, editProject)
    },
    async deleteProject(id) {
      await ProjectService.del(id)
      this.projects = this.projects.filter(p => p.id !== id)
    }
  }
}
</script>
