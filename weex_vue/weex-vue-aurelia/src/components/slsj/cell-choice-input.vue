<template>
    <div class="div_select"
         @click="clickCheck(choice,ansIndex)">
        <div :class="['div_check_' + (choice.selected==1)]"
             :choice="choice">
        </div>
        <text class="text_value">{{choice.aname}}</text>
        <div class="div_input">
            <input class="input_base" type="text" :value="choice.value" :choice="choice"
                   @input="input($event,choice)"/>
        </div>
    </div>
</template>

<script>
    module.exports={
        props:{

        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>

</style>