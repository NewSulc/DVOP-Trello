<template>
    <div class="header">
        <TopMenu />
    </div>
    <article>
        <div class="wrap">
            <Card v-for="(card, c) in cards" :name="card.name" :id="card.id" @selectPro="routerPush(`/p/${card.id}`)"
                @changePro="changeForm(card)" @deletePro="deleteForm(card)" />
            <div @click="formOpen()" class="add"><i class="fa-solid fa-plus"></i></div>
        </div>
        <Delete :class="{ inactive: !deleting }" :name="selectedProject.name" @reject="deleting = false"
            @confirm="deleteProject()" />

        <Change :class="{ inactive: !changing }" :name="selectedProject.name" :description="selectedProject.description" @reject="changing = false"
            @confirm="changeProject" />
    </article>
    <div class="form" v-if="formOn">
        <h2>New Project</h2>
        <hr>
        <input v-model="newName" type="text" placeholder="Name">
        <input v-model="newDesc" type="text" placeholder="Description" class="description">
        <button @click="newProject">Create project</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue'
import Card from '../components/Card.vue';
import TopMenu from '../components/TopMenu.vue';
import Delete from '../components/forms/Delete.vue';
import Change from '../components/forms/Change.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

function routerPush(val) { router.push(val) }

const cards = ref([])

const formOn = ref(false);

onMounted(() => {
    getProjects();
})

function formOpen() { formOn.value = true }

const newName = ref();
const newDesc = ref("");

function newProject() {
    fetch(`http://localhost:8080/project`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: newName.value,
            description: newDesc.value
        })
    }).then(async (res) => {
        formOn.value = false;
        getProjects();
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function getProjects() {
    fetch(`http://localhost:8080/project`, {
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

function changeForm(card) {
    selectedProject.value = card;
    changing.value = true;
}

const changeProject = (name, description) => {
    fetch(`http://localhost:8080/project/${selectedProject.value.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: name,
            description: description
        })
    }).then(async (res) => {
        changing.value = false;
        getProjects();
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function deleteForm(card) {
    selectedProject.value = card;
    deleting.value = true;
}

function deleteProject() {
    fetch(`http://localhost:8080/project/${selectedProject.value.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        deleting.value = false;
        getProjects();
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

const deleting = ref(false);
const changing = ref(false);

const selectedProject = ref({ name: "", description: "" })
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    height: 6%;
}

article {
    width: 100%;
    height: 94%;
    background: url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    display: flex;
    justify-content: center;
    align-items: center;

    >.wrap {
        width: 75%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;

        .add {
            height: 7rem;
            aspect-ratio: 4/3;
            background-color: white;
            font-size: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.25s;

            &:active {
                transform: scale(0.95);
                transition: 0.25s;
            }
        }
    }
}

.form {
    position: absolute;
    width: 25%;
    height: 50%;
    background-color: white;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

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

    button {
        width: 25%;
        height: 2rem;
        background: none;
        border-radius: 0.5rem;
        transition: 0.25s;

        &:active {
            transform: scale(0.95);
            transition: 0.25s;
        }
    }
}

.inactive {
    display: none;
}
</style>