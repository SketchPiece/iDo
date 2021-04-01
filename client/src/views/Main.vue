<template>
  <div class="container">
    <transition-group
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <Project
        class="fade-animation-half"
        v-for="project of projects"
        :id="project.id"
        :key="project.id"
        :name="project.name"
      />
    </transition-group>
    <AddProject />
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
    ...mapGetters(['projects'])
  },
  async mounted() {
    await this.$store.dispatch('fetchProjects')
    await this.$store.dispatch('fetchTasks')
    await this.$store.commit('SET_POPUP', !this.projects.length)
  }
}
</script>

<style>
.fade-animation-half {
  animation-duration: 0.5s;
}
</style>
