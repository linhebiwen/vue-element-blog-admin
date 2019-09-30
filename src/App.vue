<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted () {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https:////at.alicdn.com/t/font_1391640_glhgavbitgq.js'
    document.body.appendChild(script)
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
