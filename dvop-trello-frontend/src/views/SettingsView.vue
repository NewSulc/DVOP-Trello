<template>
    <div class="wrap">
        <div class="background">
            <h1>Your account</h1>
            <input type="text" placeholder="User name">
            <input type="Password" placeholder="Password">
            <button>Change info</button>
            <hr>
            <h1>Add project</h1>
            <input type="text" placeholder="Project id">
            <button>Connect</button>
        </div>
    </div>
</template>

<script setup>
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
        width: 30rem;
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
</style>