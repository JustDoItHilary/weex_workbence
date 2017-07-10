<template>
    <div class="border_bottom">
        <div class="flex_center" style="border-right-width: 2px;border-color:#eeeeee;" @click="labelOne">
            <text :class="['text_center', 'select_' + (selected)]">{{labelOneTxt}}</text>
        </div>
        <div class="flex_center" @click="labelTwo">
            <text :class="['text_center', 'select_' + (!selected)]">{{labelTwoTxt}}</text>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            selected: {
                tyep: Boolean,
                required: true,
                default: ''
            },
            labelOneTxt: {
                type: String,
                required: true,
                default: ''
            },
            labelTwoTxt: {
                type: String,
                required: true,
                default: ''
            },
            labelOne: {
                type: Function
            },
            labelTwo: {
                type: Function
            },
        },
    }
</script>

<style scoped>
    .border_bottom {
        /*border-bottom-width: 20px;*/
        /*border-color: #eeeeee;*/
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .flex_center {
        flex: 1;
        align-items: center;
        margin-top: 28px;
        margin-bottom: 28px;
    }

    .text_center {
        font-size: 32px;
        text-align: center;
    }

    .select_true {
        color: #58D68D;
    }

    .select_false {
        color: #aaaaaa;
    }

</style>