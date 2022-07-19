<!-- 自定义button组件 -->
<template>
  <div class="btn-wrapper">
    <i v-if="icon !== ''" :name="icon" :class="classes"></i>
    <button
      :type="type"
      :disabled="disabled"
      :class="[
        classname[type],
        icon !== '' ? `inline-icon-${iconPosition}` : '',
      ]"
      :style="{
        width: width,
        border: border ? '1px solid' : '0px solid',
        borderRadius: type == 'text' && isActive ? '0px' : '',
        borderBottom:
          type == 'text' && isActive
            ? '1px solid rgb(172, 243, 193)!important'
            : '',
        padding: type == 'text' ? '6px 0px' : '',
        'box-size': border ? 'border-box' : '',
        fontSize: fontSize,
      }"
      @click="$emit('click', $event.target.value)"
    >
      {{ textContent }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    borderRadius: {
      type: String,
      default: "30rem",
    },
    border: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconPosition: {
      type: String,
      default: "left",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textContent: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "1.6rem",
    },
    width: {
      type: String,
      default: "18rem",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classname: {
        green: "btn-green",
        purple: "btn-purple",
        dpurple: "btn-dpurple",
        default: "btn-default",
        disabled: "btn-disabled",
        text: "btn-text",
        lightgrey: "btn-lightgrey",
      },
    };
  },
  computed: {
    classes() {
      return {
        [`el-icon-${this.icon}`]: true,
        [`icon-left`]: this.icon !== "" && this.iconPosition === "left",
        [`icon-right`]: this.icon !== "" && this.iconPosition === "right",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
$border-color: #d5d5d5;
$border-color-hover: #666666;
$border-radius: 20px;
$box-shadow-color: rgba(0, 0, 0, 0.5);
$red: #f1453d;
$color-text: #000000;

//自定义按钮
$btn-gold-color: #f1d6b2;
$btn-gold-color-active: #d7be9c;
$btn-gold-bgcolor: #ffffff;
$btn-gold-bgcolor-active: #ffffff;

$btn-green-color: #1f1e23;
$btn-green-color-active: #000000;
$btn-green-bgcolor: #acf3c1;
$btn-green-bgcolor-active: #93e0aa;

$btn-dpurple-color: #f5f5f5;
$btn-dpurple-color-active: #f5f5f5;
$btn-dpurple-bgcolor: #6660d5;
$btn-dpurple-bgcolor-active: #4943c1;

$btn-purple-color: #6660d5;
$btn-purple-color-active: #6660d5;
$btn-purple-bgcolor: #bbbefb;
$btn-purple-bgcolor-active: #b0b2e0;

$btn-default-color: #1f1e23;
$btn-default-color-active: #000000;
$btn-default-bgcolor: #f5f5f5;
$btn-default-bgcolor-active: #eae8e8;

$btn-disabled-color: #ffffff;
$btn-disabled-color-active: #ffffff;
$btn-disabled-bgcolor: #d4d4d6;
$btn-disabled-bgcolor-active: #b7b7b7;

$btn-text-color: #000000;
$btn-text-color-active: #000000;
$btn-text-bgcolor: transparent;
$btn-text-bgcolor-active: transparent;

$btn-lightgrey-color: #1f1e23;
$btn-lightgrey-color-active: #1f1e23;
$btn-lightgrey-bgcolor: #f5f5f5;
$btn-lightgrey-bgcolor-active: #c7c7c7;

.btn-wrapper {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  vertical-align: top;
  > :not(:last-child) {
    margin-right: 0.5em;
  }
  > button {
    border: 0px solid $border-color;
    border-radius: $border-radius;
    padding: 6px 50px;
    position: relative;
    height: 40px;
    width: 100%;
    cursor: pointer;
    &:active {
      // box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    &[disabled] {
      cursor: not-allowed;
    }
    &.inline-icon-left {
      padding-left: 2em;
    }
    &.inline-icon-right {
      padding-right: 2em;
    }
  }
  .icon-left {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    z-index: 2;
    color: $color-text;
  }
  .icon-right {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    z-index: 2;
  }
}

.btn-gold {
  border-color: $btn-gold-color;
  color: $btn-gold-color;
  background-color: $btn-gold-bgcolor;
  &:hover,
  &:active {
    border-color: $btn-gold-color-active;
    color: $btn-gold-color-active;
    background-color: $btn-gold-bgcolor-active;
  }
}

.btn-green {
  border-color: $btn-green-color;
  color: $btn-green-color;
  background-color: $btn-green-bgcolor;
  &:hover,
  &:active {
    border-color: $btn-green-color-active;
    color: $btn-green-color-active;
    background-color: $btn-green-bgcolor-active;
  }
}
.btn-dpurple {
  color: $btn-dpurple-color;
  background-color: $btn-dpurple-bgcolor;
  &:hover,
  &:active {
    border-color: $btn-dpurple-color-active;
    color: $btn-dpurple-color-active;
    background-color: $btn-dpurple-bgcolor-active;
  }
}

.btn-purple {
  color: $btn-purple-color;
  background-color: $btn-purple-bgcolor;
  &:hover,
  &:active {
    border-color: $btn-purple-color-active;
    color: $btn-purple-color-active;
    background-color: $btn-purple-bgcolor-active;
  }
}
.btn-default {
  color: $btn-default-color;
  background-color: $btn-default-bgcolor;
  &:hover,
  &:active {
    border-color: $btn-default-color-active;
    color: $btn-default-color-active;
    background-color: $btn-default-bgcolor-active;
  }
}
.btn-disabled {
  color: $btn-disabled-color;
  background-color: $btn-disabled-bgcolor;
  &:hover,
  &:active {
    border-color: $btn-disabled-color-active;
    color: $btn-disabled-color-active;
    background-color: $btn-disabled-bgcolor-active;
  }
}

.btn-text {
  color: $btn-text-color;
  background-color: $btn-text-bgcolor;
  &:hover,
  &:active {
    box-shadow: none !important;
    color: $btn-text-color-active;
    background-color: $btn-text-bgcolor-active;
  }
}

.btn-lightgrey {
  color: $btn-lightgrey-color;
  background-color: $btn-lightgrey-bgcolor;
  &:hover,
  &:active {
    box-shadow: none !important;
    color: $btn-lightgrey-color-active;
    background-color: $btn-lightgrey-bgcolor-active;
  }
}
</style>
