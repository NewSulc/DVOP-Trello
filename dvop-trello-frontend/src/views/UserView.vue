<template>
    <div class="header">
        <TopMenu />
    </div>
    <article></article>
    <div class="form" v-if="!passwordForm">
        <i class="fa-solid fa-lock" @click="passwordForm = true"></i>
        <h2>User</h2>
        <hr>

        <label for="name">Name</label>
        <input name="name" v-model="name" type="text" placeholder="Name">

        <button @click="changeUsername()">Change name</button>

        <label for="projectId">Add project</label>
        <input name="projectId" v-model="projectId" type="text" placeholder="Project ID">

        <button @click="addProject()">Add project</button>
    </div>

    <div class="form" v-if="passwordForm">
        <i class="fa-solid fa-xmark" @click="passwordForm = false"></i>
        <h2>Password</h2>
        <hr>

        <label for="name">New password</label>
        <input name="name" v-model="password" type="text" placeholder="Password">

        <label for="password">Confirm password</label>
        <input name="password" v-model="password2" type="text" placeholder="Password">

        <button @click="newProject">Change password</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TopMenu from '../components/TopMenu.vue';

const name = ref();
const projectId = ref();

const password = ref();
const password2 = ref();

const passwordForm = ref(false)

const userId = ref();

getUser();

function getUser() {
    fetch(`http://localhost:8080/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        const response = await res.json()
        name.value = response.username
        userId.value = response.id
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function changeUsername() {
    fetch(`http://localhost:8080/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            newUsername: name.value
        })
    }).then(async (res) => {
        getUser();
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function addProject() {
    fetch(`http://localhost:8080/project/${projectId.value}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        projectId.value = "";
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 6%;
}

article {
    width: 100%;
    min-height: 94%;
    background: url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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