<template>
  <header>
    <div class="logo"></div>
    <div class="text center">
      <span v-if="auth">{{ username }}</span>
    </div>
    <div class="text logout">
      <span v-if="auth" @click="logout">Logout</span>
    </div>
  </header>
</template>

<script>
import { AuthService } from '../services/auth.service'
import { mapGetters } from 'vuex'

export default {
  methods: {
    logout() {
      AuthService.makeLogout()
    }
  },
  computed: {
    ...mapGetters(['auth', 'username'])
  }
}
</script>
