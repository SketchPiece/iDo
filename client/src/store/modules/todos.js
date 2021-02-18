import { TaskService } from '../../services/task.service'
import { ProjectService } from '../../services/project.service'
import { byDate } from '../../utils'
// import { byDate } from '../../utils'
export const todo = {
  state: {
    projects: [],
    tasks: []
  },
  actions: {
    async fetchProjects({ commit }) {
      const projects = await ProjectService.getAll()
      commit('FETCH_PROJECTS', projects)
    },
    async addProject({ commit }, newProject) {
      const project = await ProjectService.add(newProject)
      commit('ADD_PROJECT', project)
    },
    async editProject(_, { id, editProject }) {
      await ProjectService.edit(id, editProject)
    },
    async deleteProject({ commit }, id) {
      await ProjectService.del(id)
      commit('DELETE_PROJECT', id)
    },
    async fetchTasks({ commit }) {
      const tasks = await TaskService.getAll()
      commit('FETCH_TASKS', tasks)
    },
    async addTask({ commit }, { projectId, text }) {
      const task = await TaskService.add({ projectId, text })
      commit('ADD_TASK', task)
    },
    async editTask({ commit }, { id, editTask }) {
      const task = await TaskService.edit(id, editTask)
      commit('EDIT_TASK', task)
    },
    async editTaskState(_, { id, editTask }) {
      await TaskService.edit(id, editTask)
    },
    async deleteTask({ commit }, id) {
      await TaskService.del(id)
      commit('DELETE_TASK', id)
    }
  },
  mutations: {
    FETCH_PROJECTS(state, projects) {
      state.projects = projects
    },
    ADD_PROJECT(state, project) {
      state.projects.push(project)
    },
    DELETE_PROJECT(state, id) {
      state.projects = state.projects.filter(p => p.id !== id)
    },
    FETCH_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    EDIT_TASK(state, task) {
      state.tasks = state.tasks.map(t => {
        // console.log(t, task, t.id === task.id)
        if (t.id === task.id) {
          return task
        }
        return t
      })
      // console.log(state.tasks, task)
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
    }
  },
  getters: {
    filterTasks: state => id => {
      return state.tasks.filter(t => t.projectId === id)
    },
    projects: state => state.projects.sort(byDate())
  }
}
