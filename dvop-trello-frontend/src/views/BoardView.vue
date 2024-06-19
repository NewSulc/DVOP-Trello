<template>
    <div class="header">
        <TopMenu />
    </div>
    <article>
        <div class="wrap">
            <TaskList v-for="(list, l) in lists" :name="list.name" :id="list.id" :tasks="list.task"
                @reloadList="getLists()" />
        </div>
    </article>
    <div class="new" @click="listForm = true">
        <i class="fa-solid fa-plus"></i>
    </div>
    <div class="form" v-if="listForm">
        <i class="fa-solid fa-xmark" @click="listForm = false"></i>
        <h2>New List</h2>
        <hr>

        <label for="newName">Name *</label>
        <input name="newName" v-model="newName" type="text" placeholder="Name">

        <button @click="newList()">Create list</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TaskList from '../components/board/TaskList.vue';
import TopMenu from '../components/TopMenu.vue';

const router = useRouter();
const lists = ref();

const listForm = ref(false)
const newName = ref("")

onMounted(() => {
    getLists();
});

function getLists() {
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
}

function newList() {
    fetch(`http://localhost:8080/board/${router.currentRoute.value.params.boardId}/list`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: newName.value
        })
    }).then(async (res) => {
        newName.value = ""
        listForm.value = false
        getLists();
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    height: 6%;
}

article {
    width: 100%;
    min-height: 94%;
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

.new {
    position: absolute;
    height: 4rem;
    aspect-ratio: 1;
    background-color: #42b7ee;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-radius: 50%;
    right: 2rem;
    bottom: 2rem;
    transition: 0.25s;

    &:hover {
        transform: scale(0.9);
        filter: brightness(0.5);
        transition: 0.25s;
    }
}

.form {
    position: absolute;
    width: 25%;
    padding: 2rem 0;
    background-color: white;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    >h2 {
        font-size: 2.5rem;
        font-weight: 900;
    }

    >hr {
        width: 75%;
        border: solid 1px black;
    }

    input {
        width: 60%;
        height: 2rem;
    }

    label {
        margin-top: 1rem;
    }

    button {
        margin-top: 1rem;
        width: 8rem;
        height: 3rem;
        background-color: #42b7ee;
        border-radius: 0.5rem;
        transition: 0.25s;
        border: none;
        color: white;
        font-size: 1rem;
        transition: 0.25s;

        &:hover {
            transform: scale(0.9);
            filter: brightness(0.5);
            transition: 0.25s;
        }
    }

    i {
        position: absolute;
        font-size: 1.5rem;
        right: 1.5rem;
        top: 1.5rem;
        transition: 0.25s;

        &:hover {
            transform: scale(0.9);
            filter: brightness(0.5);
            transition: 0.25s;
        }
    }
}
</style>