<template>
    <ul class="news-list">
      <li v-for="item in listItems" class="post">
        <div class="points">
          {{ item.points || 0 }}
        </div>
        <div>
          <p class="news-title">
            <!-- 데이터 유무에 따라 가상 태그인 template 태그를 사용해서 분기 처리-->
            <template v-if="item.domain">
                <a v-bind:href="item.url">{{ item.title }}</a>
            </template>
            <template v-else>
                <router-link :to="`/item/${item.id}`">{{ item.title }}</router-link>
            </template>
          </p>
          <small class="link-text">
             {{ item.time_ago }} by  
            <router-link v-if="item.user" :to="`/user/${item.user}`" class="link-text">{{ item.user }}</router-link>
            <a :href="item.url" v-else>{{ item.domain }}</a>
          </small>
        </div>
      </li>
    </ul>
</template>

<script>
export default {
  computed: {
    listItems() {
      return this.$store.state.list;
    }
  }
}
</script>

<style scoped>
.news-list{
  margin: 0;
  padding: 0;
}
.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points{
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}
.news-title{
  margin: 0;
}
.link-text{
  color: #828282;
}
</style>