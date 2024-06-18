<template>
    <div class="wrap">
        <i @click="boardForm = true" class="fa-solid fa-pen"></i>
        <i @click="deleteBoard()" class="fa-solid fa-trash"></i>
        <div class="card" :style="{ backgroundColor: color }" @click="router.push(`/b/${props.id}`)">
            <h1>{{ props.name }}</h1>
        </div>
    </div>

    <div class="form" v-if="boardForm">
        <i class="fa-solid fa-xmark" @click="boardForm = false"></i>
        <h2>{{ props.name }}</h2>
        <hr>

        <label for="newName">Name</label>
        <input name="newName" v-model="bName" type="text" placeholder="Name">

        <label for="newDesc">Description</label>
        <input name="newDesc" v-model="bDesc" type="text" placeholder="Description" class="description">

        <label for="newColor">Board color</label>
        <input name="newColor" v-model="bColor" type="color">

        <button @click="changeBoard()">Change Board</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(["reloadBoard"])

const props = defineProps({
    name: String,
    id: Number,
    description: String,
    color: String
});

const boardForm = ref(false);
const bName = ref(props.name);
const bDesc = ref(props.description);
const bColor = ref(props.color);

import { useRouter } from 'vue-router';
const router = useRouter();

const changeBoard = () => {
    fetch(`http://localhost:8080/board/${props.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: bName.value,
            description: bDesc.value,
            color: bColor.value
        })
    }).then(async (res) => {
        boardForm.value = false;
        emit('reloadBoard')
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function deleteBoard() {
    fetch(`http://localhost:8080/board/${props.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        emit('reloadBoard')
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style scoped lang="scss">
.wrap {
    height: 8rem;
    aspect-ratio: 4/3;
    position: relative;

    &:hover {
        >i {
            display: flex;
        }
    }

    .card {
        height: 100%;
        width: 100%;
        border-radius: 1rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: 500;
        position: relative;
    }

    i {
        font-size: 1rem;
        position: absolute;
        transition: 0.25s;
        color: white;
        z-index: 10;
        display: none;

        &:first-child {
            left: 5%;
            top: 5%;
        }

        &:nth-child(2) {
            right: 5%;
            top: 5%;
        }

        &:hover {
            font-size: 1.5rem;
            transition: 0.25s;
        }
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
