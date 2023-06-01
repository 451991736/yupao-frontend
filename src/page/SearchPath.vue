<template>
    <form action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-divider v-if="activeIds.length !== 0" content-position="left">已选标签</van-divider>
    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="tag in activeIds">
            <van-tag closeable size="small" type="primary" @close="doClose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList" />
    <div style="padding: 12px;">
        <van-button block type="primary" @click="doSearchResult">搜索</van-button>
    </div>
   

</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const searchText = ref('');


const originTagList = [
    {
        text: '性别',
        children: [
            { text: '男', id: '男' },
            { text: '女', id: '女' },
        ],
    },
    {
        text: '年级',
        children: [
            { text: '大一', id: '大一' },
            { text: '大二', id: '大二' },
        ],
    },
];



let tagList = ref(originTagList)

const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children]
        const tempParentTag = {...parentTag}
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
        return tempParentTag
    })
};

const doSearchResult = () =>{
    router.push({
        path:'/user/list',
        query: {
            tags: activeIds.value
        }
    })
}

const onCancel = () => {
    searchText.value = ''
};

const activeIds = ref([]);
const activeIndex = ref(0);

const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag;
    })
}

</script>
  
<style scoped></style>