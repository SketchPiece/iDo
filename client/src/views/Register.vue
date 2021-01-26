<template>
  <div class="center-wrapper">
    <AuthForm ref="form" :title="'Sing up to iDo'" @submit="register">
      <router-link to="/login">Sing in</router-link> if you want
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
    register({ username, password }) {
      AuthService.makeRegister(username, password)
        .then(() => {
          this.$router.push({ name: 'main' })
        })
        .catch(({ response }) => {
          if (!response) return
          if (response.status === 409)
            return this.$refs.form.error(
              'User with the same name already exists'
            )
          this.$refs.form.error('Something went wrong')
        })
    }
  }
}
</script>
