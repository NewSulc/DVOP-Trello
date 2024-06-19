<template>
    <header>
        <div>
            <RouterLink id="logo" to="/projects">Trello</RouterLink>
        </div>
        <div>
            <RouterLink to="/logout" id="logout"><i class="fa-solid fa-right-from-bracket"></i></RouterLink>
            <RouterLink to="/user" id="user">{{ firstLetter }}</RouterLink>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
const firstLetter = ref(Array.from(localStorage.getItem("accessToken"))[0]);
</script>

<style scoped lang="scss">
header {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    >div {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-right: 1rem;
        height: 100%;

        &:first-child {
            margin-left: 1rem;
        }
    }
}

a {
    color: black;
    text-decoration: none;
    font-weight: 500;
}

i {}

#logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(0, 136, 255);
}

#user {
    height: 75%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: rgb(0, 136, 255);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    text-transform: capitalize;
}

#logout{
    font-size: 1.5rem;
}
</style>