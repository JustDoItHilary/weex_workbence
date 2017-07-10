<template>
    <div>
        <div class="div_logo">
            <text class="text_logo">{{item.fir}}</text>
        </div>
        <div class="div_member">
            <text class="text_member">{{item.Name}}</text>
            <text class="text_code">{{item.Code}}</text>
        </div>
    </div>
</template>

<script>
    module.exports={
        props:{
            item: {
                type: Object,
                required: true,
                default: {},
            },
        }
    }
</script>

<style scoped>
    .div_logo {
        height: 80px;
        width: 80px;
        align-items: center;
        justify-content: center;
        background-color: #58D68D;
        border-radius: 50px;
    }

    .text_logo {
        font-size: 48px;
        color: #ffffff;
    }

    .text_member {
        font-size: 36px;
    }

    .text_code {
        font-size: 28px;
        color: #898989;
        margin-top: 10px;
    }

    .div_member {
        flex: 1;
        margin-left: 24px;
        border-bottom-width: 1px;
        border-color: #bbbbbb;
    }
</style>
