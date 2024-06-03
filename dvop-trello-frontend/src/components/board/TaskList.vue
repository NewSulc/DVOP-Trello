<template>
    <div class="list">
        <div class="head">{{ props.name }}</div>
        <ul>
            <Task v-for="(task, t) in tasks" :name="task.name" :id="task.id" :listId="props.id" />
            <textarea v-if="addingTask" v-model="newTaskName"></textarea>
        </ul>
        <div class="hoverable" @click="addingTask = true" v-if="!addingTask">
            <i class="fa-solid fa-plus"></i>
            Add card
        </div>
        <section class="add" v-if="addingTask">
            <div class="send" @click="postTask()">Add card</div>
            <i class="fa-solid fa-xmark cancel" @click="addingTask = false"></i>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/dataStore';
import Task from '@/components/board/Task.vue';

const tasks = ref();

const props = defineProps({
    name: String,
    id: Number
});

const addingTask = ref(false);
const newTaskName = ref("");

onMounted(() => {
    getTasks();
})

function getTasks() {
    fetch(`http://localhost:8080/list/${props.id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        tasks.value = await res.json()
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function postTask() {
    fetch(`http://localhost:8080/list/${props.id}/task`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: newTaskName.value
        })
    }).then(async (res) => {
        getTasks();
        addingTask.value = false;
        newTaskName.value = ""

    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style scoped lang="scss">
.list {
    width: 15rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    background-color: #101204;

    border-radius: 0.5rem;

    >div {
        width: 14.5rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: start;
        color: white;
        padding-left: 0.5rem;
        gap: 0.5rem;
    }

    textarea {
        background-color: #23272a;
        padding-left: 1rem;
        padding-top: 0.5rem;
        width: 100%;
        height: 4.5rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1rem;
        color: white;
        resize: none;
        font-family: "Roboto", sans-serif;
    }

    ul {
        color: white;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 14rem;
    }

    >.add {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.5rem;

        >.send {
            width: 50%;
            background-color: #569dfe;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2.2rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
        }

        >.cancel {
            color: white;
            font-size: 1.5rem;
        }
    }

    .hoverable:hover {
        background: rgba(75, 75, 75, 0.5);
    }
}
</style>