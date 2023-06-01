<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"></van-search>
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public"></van-tab>
            <van-tab title="加密" name="private"></van-tab>
        </van-tabs>
        <van-button  class="add-button" type="primary" icon="plus" @click="doJoinTeam"></van-button>
        <team-card-list :teamList="teamList"></team-card-list>
        <van-empty v-if="teamList?.length < 1" description="数据为空"></van-empty>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"
import myAxios from "../plugins/myAxios";
import { Toast } from "vant";
import TeamCardList from "../components/TeamCardList.vue"
import { onMounted } from "vue";


const router = useRouter()
const teamList = ref([])
const searchText = ref('')
const active = ref('public')


const onTabChange = (name) =>{
    if(name === 'public'){
        listTeam(searchText.value, 0)
    } else {
        listTeam(searchText.value, 2)
    }
}
const onSearch = (val) => {
    listTeam(val)
}
onMounted(async () => {
    listTeam()
})



const listTeam = async (val = '',status = 0) => {
    const res = await myAxios.get("/team/list", {
        params: {
            searchText: val,
            pageNum: 1,
            status
        }
    });
    if (res?.code === 0) {
        teamList.value = res.data;
    } else {
        Toast.fail('加载队伍失败，请刷新重试');
    }
}

const doJoinTeam = () => {
    router.push({
        path: "/team/add"
    })
}


</script>

<style>
    #teamPage .add-button{
        position: fixed;
        bottom: 60px;
        width: 50px;
        right: 12px;
        height: 50px;
        z-index: 999;
        border-radius: 50%;
    }
</style>