<template>
  <list-item v-on:click="redirect">
    <text class="item-txt">{{title}}</text>
  </list-item>
</template>

<style scoped>
  .item-txt {
    font-size: 48px;
    color: #555;
  }
</style>

<script>
  var event = weex.requireModule('event')
  module.exports = {
    props: {
      title: { default: '456' },
      url: { default: '' }
    },
    components: {
      listItem: require('./list-item.vue')
    },
    methods: {
      redirect: function() {
          console.log("url: ",this.url)
        event.openURL(this.url)
      }
    }
  }
</script>
