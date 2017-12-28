myFile.vue<template>
    <div>
    </div>
</template>

<script>
    export default{
        components: {
        },
        computed: {},
        data(){
            return {
                baseUrl:'',
            }
        },
        methods: {
        },
        created(){
            let self = this;
//            var bundleUrl = 'http://weex.yy365.cn/sy-member.js';
            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js';
        }
    }
</script>