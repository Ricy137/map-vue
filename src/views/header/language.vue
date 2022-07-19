<!--
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-01-30 15:08:43
 * @LastEditTime: 2022-02-01 17:52:19
 * @FilePath: \src\views\header\language.vue
-->
<!--
@description: 语言切换
@author: ricy
@createtime: 2021年12月22日 15:34:57 
-->

<template>
  <div class="language-change">
    <a-button
      type="link"
      :class="['language-ele', 'text', lang == 'zh-CN' ? 'active-lang' : '']"
      @click="changeLanguage('zh-CN')"
      >中</a-button
    >
    <span class="language-divide">|</span>
    <a-button
      type="link"
      :class="['language-ele', 'text', lang == 'en-US' ? 'active-lang' : '']"
      @click="changeLanguage('en-US')"
      >EN</a-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "zh-CN",
    };
  },
  methods: {
    changeLanguage(lang) {
      this.lang = lang;
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss" scoped>
.language-change {
  display: flex;
  width: 6rem;
  align-items: center;
  justify-content: space-between;
  .language-ele {
    flex: 1;
    text-align: center;
    cursor: pointer;
    color: #888a89;
    font-size: 2rem;
  }
  .language-divide {
    width: 1rem;
    text-align: center;
  }
  .active-lang {
    color: #000000;
    font-weight: 600;
  }
}
</style>
