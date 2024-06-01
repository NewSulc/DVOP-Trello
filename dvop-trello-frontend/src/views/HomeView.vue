<template>
    <div class="wrap">
        <h1>Trello</h1>
        <p>Project for DVOP <br> Github: <a href="https://github.com/NewSulc">NewSulc</a></p>
        <div>
            <button @click="pushToSite('login')">Login</button>
            <p>or</p>
            <button @click="pushToSite('signup')">Sign-up</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function pushToSite(val) { router.push(val); }
</script>

<style scoped lang="scss">
.wrap {
    width: 100%;
    height: 100%;
    background-color: rgb(25, 25, 25);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;

    h1 {
        font-size: 5rem;
        font-weight: 700;
    }

    p {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 2rem;
    }

    a {
        color: white;
    }

    >div {
        display: flex;
        align-items: center;
        gap: 1rem;

        >button {
            width: 8rem;
            height: 3rem;
            font-size: 1.5rem;
            background: none;
            background-color: white;
            border: none;
            color: black;
            border-radius: 500;
            border-radius: 5rem;
            font-weight: 700;
            transition: 0.25s;

            &:hover {
                transform: scale(0.95);
                transition: 0.25s;
            }
        }

        p {
            font-weight: 100;
        }
    }
}
</style>