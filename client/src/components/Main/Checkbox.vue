<template>
  <div class="cbx">
    <input @change="check($event)" id="cbx" type="checkbox" :checked="state" />
    <label for="cbx"></label>
    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
      <path d="M2 8.36364L6.23077 12L13 2"></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    state: Boolean
  },
  methods: {
    check({ target: { checked } }) {
      this.$emit('check', checked)
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
}
input[type='checkbox']:focus {
  outline: 0;
}
.cbx {
  /* position: absolute; */
  width: 24px;
  height: 24px;
  top: calc(50vh - 12px);
  left: calc(50vw - 12px);
}
.cbx input {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #bfbfc0;
  border-radius: 50%;
}
.cbx label {
  width: 24px;
  height: 24px;
  background: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-filter: url('#goo');
  filter: url('#goo');
  transform: trasnlate3d(0, 0, 0);
  pointer-events: none;
}
.cbx svg {
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 1;
  pointer-events: none;
}
.cbx svg path {
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 19;
  stroke-dashoffset: 19;
  transition: stroke-dashoffset 0.3s ease;
  transition-delay: 0.2s;
}
.cbx input:checked + label {
  animation: splash 0.6s ease forwards;
}
.cbx input:checked + label + svg path {
  stroke-dashoffset: 0;
}
@-moz-keyframes splash {
  40% {
    background: #377ef6;
    box-shadow: 0 -18px 0 -8px #377ef6, 16px -8px 0 -8px #377ef6,
      16px 8px 0 -8px #377ef6, 0 18px 0 -8px #377ef6, -16px 8px 0 -8px #377ef6,
      -16px -8px 0 -8px #377ef6;
  }
  100% {
    background: #377ef6;
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}
@-webkit-keyframes splash {
  40% {
    background: #377ef6;
    box-shadow: 0 -18px 0 -8px #377ef6, 16px -8px 0 -8px #377ef6,
      16px 8px 0 -8px #377ef6, 0 18px 0 -8px #377ef6, -16px 8px 0 -8px #377ef6,
      -16px -8px 0 -8px #377ef6;
  }
  100% {
    background: #377ef6;
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}
@-o-keyframes splash {
  40% {
    background: #377ef6;
    box-shadow: 0 -18px 0 -8px #377ef6, 16px -8px 0 -8px #377ef6,
      16px 8px 0 -8px #377ef6, 0 18px 0 -8px #377ef6, -16px 8px 0 -8px #377ef6,
      -16px -8px 0 -8px #377ef6;
  }
  100% {
    background: #377ef6;
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}
@keyframes splash {
  40% {
    background: #377ef6;
    box-shadow: 0 -18px 0 -8px #377ef6, 16px -8px 0 -8px #377ef6,
      16px 8px 0 -8px #377ef6, 0 18px 0 -8px #377ef6, -16px 8px 0 -8px #377ef6,
      -16px -8px 0 -8px #377ef6;
  }
  100% {
    background: #377ef6;
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}
</style>
