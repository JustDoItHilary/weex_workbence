<template>
    <div>
        <cell-tab :tabItems="tabItems" :selectedColor="selectedColor"></cell-tab>
    </div>
</template>

<script>
    export default{
        components: {
            cellTab: require('../../components/tabbar/cell-tabbar.vue'),
        },
        computed: {},
        data(){
            return {
                baseUrl:'',
                selectedColor:'rgb(2, 136, 209)',
                tabItems: [
                    {
                        index: 0,
                        title: '我的文件',
                        titleColor: '#000000',
                        icon: '',
                        image: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
                        selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png',
                        src: '/tabbar-item.js?itemId=tab1',
                        visibility: 'visible',
                    },
                    {
                        index: 1,
                        title: '共享文件',
                        titleColor: '#000000',
                        icon: '',
                        image: 'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png',
                        selectedImage: 'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png',
                        src: '/tabbar-item.js?itemId=tab2',
                        visibility: 'hidden',
                    },
                    {
                        index: 2,
                        title: '公共文件',
                        titleColor: '#000000',
                        icon: '',
                        image: 'http://gtms01.alicdn.com/tps/i1/TB1B0v5MpXXXXcvXpXX9t7RGVXX-46-46.png',
                        selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB1NxY5MpXXXXcrXpXX9t7RGVXX-46-46.png',
                        src: '/tabbar-item.js?itemId=tab3',
                        visibility: 'hidden',
                    }
                ],
            }
        },
        methods: {
            setTabUrl(){
                let self = this;
                for (var i = 0; i < self.tabItems.length; i++) {
                    var tabItem = self.tabItems[i];
                    tabItem.src = self.baseUrl + tabItem.src;
                }
            },
        },
        created(){
            let self = this;
//            var bundleUrl = 'http://weex.yy365.cn/sy-member.js';
            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js';
            self.baseUrl = self.getBaseUrl(bundleUrl);
            self.setTabUrl();
        }
    }
</script>