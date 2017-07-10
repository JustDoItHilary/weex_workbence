<template>
    <div class="reader">
        <text class="text_black">{{memberName}}</text>
        <scroller :class="['readerList',isNew?'':'classFlexEnd']"  scroll-direction="horizontal">
            <div class="div_reader" v-for="item in list">
                <text class="text_black">{{item.USERNAME}}</text>
            </div>
        </scroller>
        <div v-if="isNew" class="div_rad_border" :style="{backgroundColor: bgColor}" @click="clickAdd">
            <text class="txt_rad_border">添加</text>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            memberName: {
                type: String,
                required: true,
                default: 'member'
            },
            list: {
                type: Array,
                required: true,
                default: []
            },
            isNew:{
                type:Boolean,
                required:true
            },
            type: {
                type: String,
                required: true,
                default: '1'
            },
            bgColor: {
                type: String,
                required: false,
                default: '#58D68D'
            },
        },
        data(){
            return {}
        },
        methods: {
            clickAdd:function () {
                this.$emit("clickAddReader",this.type);
            }
        }
    }
</script>

<style scoped>
    .classFlexEnd{
        justify-content:flex-end;
    }
    .reader {
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        border-bottom-color: #ebedef;
        border-bottom-width: 1px;
    }

    .readerList {
        flex: 1;
        flex-direction: row;
        text-align: center;
        height: 100px;
    }

    .div_reader {
        justify-content: center;
        align-items: flex-end;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .text_black {
        margin-left: 20px;
        margin-right: 20px;
        font-size: 30px;
        justify-content: center;
    }

    .div_rad_border {
        height: 50px;
        margin-right: 10px;
        border-radius: 60px;
        align-items: center;
        justify-content: center;
    }

    .txt_rad_border {
        text-align: center;
        font-size: 26px;
        color: #fafafa;
        margin-left: 16px;
        margin-right: 16px;
    }
</style>