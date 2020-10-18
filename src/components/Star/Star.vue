<template>
  <div class="star star-24">
    <span class="star-item on" v-for="i in getStar[0]"></span>
    <span class="star-item half" v-for="i in getStar[1]"></span>
    <span class="star-item off" v-for="i in getStar[2]"></span>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Star",
    props:{
      item:Object
    },
    computed:{
      ...mapState(['shops']),
      getStar(){
        let arr = []
        const rating = this.item.rating
        if(rating %1 === 0){
          arr.push(rating)
          arr.push(0)
          arr.push(5-rating)
        }else{
          arr.push(parseInt(rating))
          arr.push(1)
          arr.push(4-parseInt(rating))
        }
        return arr
      }
    }
  }
</script>

<style scoped>

</style>
