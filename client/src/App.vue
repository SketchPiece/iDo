<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Header from './components/Header'
import './index.scss'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
