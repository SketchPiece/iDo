<template>
  <div class="window" :style="{ width: '350px', height: '400px' }">
    <div class="header">
      <div class="circle red first"></div>
      <div class="circle yellow"></div>
      <div class="circle green"></div>
    </div>
    <div class="main">
      <div class="form">
        <span>{{ title }}</span>
        <span class="error">{{ message }}</span>
        <span class="inp-error">{{ errors.username }}</span>
        <input
          :class="[
            'animate__animated',
            { animate__shakeX: !!errors.username },
            { error: !!errors.username }
          ]"
          @keypress.enter="submitHandler"
          :disabled="!isActive"
          v-model="username"
          placeholder="Username"
          type="text"
        />
        <span class="inp-error">{{ errors.password }}</span>
        <input
          :class="[
            'animate__animated',
            { animate__shakeX: !!errors.password },
            { error: !!errors.password }
          ]"
          @keypress.enter="submitHandler"
          :disabled="!isActive"
          v-model="password"
          placeholder="Password"
          type="password"
        />
        <div class="link">
          <slot />
        </div>
        <button class="btn green" :disabled="!isActive" @click="submitHandler">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data: () => ({
    username: '',
    password: '',
    errors: {
      username: '',
      password: ''
    },
    isActive: true,
    message: ''
  }),
  methods: {
    submitHandler() {
      this.validate()
      if (this.haveErrors()) return
      const user = {
        username: this.username,
        password: this.password
      }
      this.isActive = false
      this.$emit('submit', user)
    },
    validate() {
      if (!this.username.length)
        this.errors.username = 'Username is required field'
      else if (this.username.length > 16)
        this.errors.username = 'Username must not exceed 16 characters'
      if (!this.password.length)
        this.errors.password = 'Password is required field'
      else if (this.password.length > 16)
        this.errors.password = 'Password must not exceed 16 characters'
    },
    haveErrors() {
      return !!this.errors.username || !!this.errors.password
    },
    error(message) {
      this.password = ''
      this.isActive = true
      this.$nextTick(() => {
        this.message = message
      })
    }
  },
  watch: {
    username() {
      this.errors.username = ''
      this.message = ''
    },
    password() {
      this.errors.password = ''
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: rgb(238, 238, 238);

@mixin disabled {
  &:disabled {
    opacity: 0.5;
  }
}

.form {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  .link {
    text-align: center;
    color: #737272;
    margin-top: -10px;
    a {
      color: #737272;
    }
  }

  span {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 25px;
    color: $font-color;
    &.error {
      font-size: 16px;
      color: #f76357;
    }
    &.inp-error {
      font-size: 12px;
      color: #f76357;
      margin: 0;
      margin-bottom: 3px;
    }
  }
  input {
    font-size: 21px;
    background: #1f2024;
    border: none;
    margin-bottom: 25px;
    outline: none;
    color: white;
    padding: 10px 20px;
    border-radius: 11px;
    width: 200px;
    border: transparent solid 2px;
    &.error {
      border: rgba(247, 101, 88, 0.6) solid 2px; // 247 101 88
    }
    @include disabled;
  }
}
</style>
