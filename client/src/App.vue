<template>
  <Header />
  <MobileBanner v-if="winWidth < 800" />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Header from './components/Header'
import MobileBanner from './components/MobileBanner'
import './index.scss'

export default {
  name: 'App',
  components: {
    Header,
    MobileBanner
  },
  data: () => ({
    winWidth: window.innerWidth
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.winWidth = window.innerWidth
    }
  }
}
</script>
