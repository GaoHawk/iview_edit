<template>
   <div >
    <RadioGroup v-model="button4" type="button" size="large" >
        <Radio v-for="item in options" :label="item"></Radio>
    </RadioGroup>
   </div>
</template>
<script>
    export default {
        props:{
             options: {
              type: Array
            }
        },
        data () {
            return {
                button4: '北京',
                button5: '北京',
                button6: '北京'
            }
        }
    }
</script>
