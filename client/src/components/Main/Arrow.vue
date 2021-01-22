<template>
  <svg :style="`width:${size}px;height:${size}px;`" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    },
    size: {
      type: Number,
      default: 24
    }
  }
}
</script>
