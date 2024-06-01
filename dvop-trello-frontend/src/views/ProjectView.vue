<template>
    <div class="header"></div>
    <article>
        <div class="wrap">
            <Card v-for="(karta, c) in cards" :name="karta.name" :id="karta.id" />
            <div class="add"><i class="fa-solid fa-plus"></i></div>
        </div>
    </article>
    <div class="form" v-if="formOn">
        <h2>New Project</h2>
        <hr>
        <input type="text" placeholder="Name">
        <input type="text" placeholder="Description" class="description">
        <button>Create project</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from '../components/Card.vue';

const cards = ref([
    { name: "Projekt 1", id: 854554 }
])

const formOn = ref(true);
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    height: 8%;
    background-color: black;
}

article {
    width: 100%;
    height: 92%;
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
</style>