<template>
  <div class="center-wrapper ">
    <AuthForm ref="form" :title="'Login to iDo'" @submit="login">
      <router-link to="/register">Sing up</router-link> if you don't
    </AuthForm>
  </div>
</template>

<script>
import { AuthService } from '../services/auth.service'
import AuthForm from '../components/AuthForm'

export default {
  components: {
    AuthForm
  },
  beforeCreate() {
    if (!AuthService.isTokenExpired())
      return this.$router.push({ name: 'main' })
  },
  methods: {
    login({ username, password }) {
      AuthService.makeLogin(username, password)
        .then(() => {
          this.$router.push({ name: 'main' })
        })
        .catch(({ response }) => {
          if (!response) return
          if (response.status === 401)
            return this.$refs.form.error('Login or password does not match')
          this.$refs.form.error('Something went wrong')
        })
    }
  }
}
</script>
