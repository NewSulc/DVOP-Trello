<template>
    <div class="wrapper">
        <div class="top">
            <div class="wrap">
                <h1>{{ props.name }}</h1>
                <div class="controls">
                    <i class="fa-solid fa-plus" @click="() => { newBoardForm = true }"></i>
                    <i class="fa-solid fa-pen" @click="() => { projectForm = true }"></i>
                    <i class="fa-solid fa-trash" @click="deleteProject()"></i>
                </div>
            </div>
            <hr>
        </div>
        <div class="boards">
            <Board v-for="(card, c) in cards" :name="card.name" :id="card.id" :color="card.color"
                :description="card.description" @click="() => router.push(`/b/${card.id}`)"  @reloadBoard="getBoards()"/>
        </div>
    </div>
    <div class="form" v-if="newBoardForm">
        <i class="fa-solid fa-xmark" @click="() => { newBoardForm = false }"></i>
        <h2>New Board</h2>
        <hr>

        <label for="newName">Name *</label>
        <input name="newName" v-model="newName" type="text" placeholder="Name">

        <label for="newDesc">Description</label>
        <input name="newDesc" v-model="newDesc" type="text" placeholder="Description" class="description">

        <label for="newColor">Board color</label>
        <input name="newColor" v-model="newColor" type="color">

        <button @click="newBoard">Create Board</button>
    </div>

    <div class="form" v-if="projectForm">
        <i class="fa-solid fa-xmark" @click="() => { projectForm = false }"></i>
        <h2>{{ props.name }}</h2>
        <hr>

        <label for="newName">Name</label>
        <input name="newName" v-model="pName" type="text" placeholder="Name">

        <label for="newDesc">Description</label>
        <input name="newDesc" v-model="pDesc" type="text" placeholder="Description" class="description">

        <button @click="changeProject()">Change project</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from 'vue';
import Board from "./Board.vue";

const emit = defineEmits(["reloadProjects"])

const newBoardForm = ref(false);

const props = defineProps({
    name: String,
    description: String,
    id: Number
});

import { useRouter } from 'vue-router';
const router = useRouter();

const cards = ref([]);

onMounted(() => {
    getBoards();
})

function getBoards() {
    fetch(`http://localhost:8080/project/${props.id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        cards.value = await res.json()
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

const newName = ref("");
const newDesc = ref("");
const newColor = ref("#000000");

function newBoard() {
    if (newName.value == "") {
        alert("Board must have a name");
        return;
    }
    fetch(`http://localhost:8080/project/${props.id}/board`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: newName.value,
            description: newDesc.value,
            color: newColor.value
        })
    }).then(async (res) => {
        newBoardForm.value = false;
        newName.value = "";
        newDesc.value = "";
        newColor.value = "#000000";
        getBoards();
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

const projectForm = ref(false)
const pName = ref(props.name)
const pDesc = ref(props.description)

const changeProject = () => {
    fetch(`http://localhost:8080/project/${props.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: pName.value,
            description: pDesc.value
        })
    }).then(async (res) => {
        projectForm.value = false;
        emit('reloadProject')
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function deleteProject() {
    fetch(`http://localhost:8080/project/${props.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {

        emit('reloadProject')
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;

    .top {
        width: 100%;
        height: 4rem;

        >.wrap {
            width: 100%;
            height: 2.5rem;
            color: white;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            display: flex;
            justify-content: space-between;

            h1 {
                font-weight: 700;
            }

            .controls {
                display: flex;
                gap: 1.5rem;

                i {
                    transition: 0.25s;

                    &:hover {
                        transform: scale(0.9);
                        filter: brightness(0.5);
                        transition: 0.25s;
                    }
                }
            }
        }
    }

    .boards {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        row-gap: 2rem;
    }
}

.form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        width: 8rem;
        height: 3rem;
        margin-top: 1rem;
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