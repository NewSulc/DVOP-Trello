<template>
    <article>
        <div class="wrap">
            <TaskList v-for="(list, l) in lists" :name="list.name" :id="list.id"
                :tasks="list.task" />
        </div>
    </article>
</template>

<script setup>
import { useDataStore } from '@/stores/dataStore';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TaskList from '../components/board/TaskList.vue';

const dataStore = useDataStore();
const router = useRouter();

const lists = ref();

onMounted(() => {
    fetch(`http://localhost:8080/board/${router.currentRoute.value.params.boardId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        lists.value = await res.json()
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
});
</script>

<style scoped lang="scss">
article {
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    display: flex;
    justify-content: center;
    align-items: center;

    >.wrap {
        width: 95%;
        max-width: 95%;
        height: 95%;
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        overflow-x: auto;
    }
}
</style>