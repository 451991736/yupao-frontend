<template>
    <UserCardList :user-list="userList" :loading="false"></UserCardList>
    <van-empty v-if="!userList || userList.length < 1" description="未匹配到标签结果" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import UserCardList from "../components/UserCardList.vue";
import myAxios from '../plugins/myAxios';
import { Toast } from 'vant'
import qs from 'qs'

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);//存放用户列表

onMounted(async () => {
    const userListData = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags
        },
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    .then(function (response) {
       // console.log('/user/search/tags succeed', response);
        Toast.success('请求成功');
        console.log(response)
        return response.data
    })
    .catch(function (error) {
      //  console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
    })
    if (userListData) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags)
            }
        })
     //   console.log(userListData)
        userList.value = userListData;
    }
})

</script>
  
<style scoped></style>