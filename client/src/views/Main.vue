<template>
  <div class="container">
    <Project
      v-for="project of projects"
      :id="project.id"
      :key="project.id"
      :name="project.name"
      :tasks="$store.getters.filterTasks(project.id)"
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Project,
    AddProject
  },
  data: () => ({
    // projects: []
  }),
  computed: {
    ...mapGetters(['tasks', 'projects'])
  },
  async mounted() {
    await this.$store.dispatch('fetchProjects')
    await this.$store.dispatch('fetchTasks')
    await this.$store.commit('SET_POPUP', !this.projects.length)
  },
  methods: {
    filterTasks(id) {
      return this.tasks.filter(t => t.projectId === id)
    },
    addTask(projectId, text) {
      this.$store.dispatch('addTask', { projectId, text })
    },
    editTask(id, editTask) {
      this.$store.dispatch('editTask', { id, editTask })
    },
    editTaskState(id, editTask) {
      this.$store.dispatch('deleteTaskState', { id, editTask })
    },
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id)
    },
    addProject(newProject) {
      this.$store.dispatch('addProject', newProject)
    },
    editProject(id, editProject) {
      this.$store.dispatch('editProject', { id, editProject })
    },
    deleteProject(id) {
      this.$store.dispatch('deleteProject', id)
    }
  }
}
</script>
