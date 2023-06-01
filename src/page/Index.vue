<template>
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" size="24" />
        </template>
    </van-cell>
    <UserCardList :user-list="userList" :loading="loading"></UserCardList>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";
import UserCardList from "../components/UserCardList.vue";
import myAxios from '../plugins/myAxios';

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);//存放用户列表
const isMatchMode = ref<boolean>(false)
const loading = ref<boolean>(false)
const loadData = async () => {
    let userListData;
    // 心动模式，根据标签匹配用户
    if (isMatchMode.value) {
        const num = 10;
        loading.value = true
        userListData = await myAxios.get('/user/match', {
            params: {
                num,
            },
        })
        .then(function (response) {
            loading.value = false
            return response?.data;
        })
        .catch(function (error) {
        })
    } else {
        // 普通模式，直接分页查询用户
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageSize: 8,
                pageNum: 1,
            },
        })
        .then(function (response) {
            return response?.data?.records;
        })
        .catch(function (error) {

        })
    }
    if (userListData) {
        userListData.forEach((user: UserType) => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        })
        userList.value = userListData;
    }
}

watchEffect(() => {
    loadData();
})

</script>
  
<style scoped></style>