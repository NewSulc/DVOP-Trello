<template>
    <div class="wrap">
        <div class="background">
            <h1>Login</h1>
            <hr>
            <input type="text" v-model="username" placeholder="User name">
            <input type="Password" v-model="password" placeholder="Password">
            <button @click="login()">Log me in</button>
            <p class="error">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref();
const password = ref();
const error = ref();

import { useRouter } from 'vue-router';
const router = useRouter();

function login() {
    fetch(`http://localhost:8080/user/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }).then(async (res) => {
        if (res.status == 200) {
            const response = await res.json();
                    localStorage.setItem('accessToken', response.accessToken);
            router.push("/projects")
        }
        else {
            error.value = await res.text();
        }

    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style scoped lang="scss">
.wrap {
    width: 100%;
    height: 100%;
    background-color: rgb(25, 25, 25);
    display: flex;
    justify-content: center;
    align-items: center;

    .background {
        background-color: rgb(240, 240, 240);
        height: 40rem;
        width: 25rem;
        border-radius: 1rem;
        color: rgb(25, 25, 25);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;

        h1 {
            font-weight: 700;
            font-size: 2rem;
        }

        >hr {
            width: 80%;
            border: black solid 1px;
        }

        >input {
            width: 60%;
            height: 2.5rem;
            border: solid black 3px;
            border-radius: 1rem;
            text-align: center;
            font-size: 1rem;
            color: black;
            background: none;
            font-weight: 700;
        }

        >button {
            width: 40%;
            height: 2.5rem;
            border: solid black 3px;
            border-radius: 1rem;
            background: none;
            transition: 0.25s;

            &:hover {
                transform: scale(0.95);
                transition: 0.25s;
            }
        }
    }
}

.error {
    color: red;
}
</style>