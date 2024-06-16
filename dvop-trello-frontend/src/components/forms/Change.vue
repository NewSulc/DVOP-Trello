<template>
    <div class="wrapper">
        <h2>Change</h2>
        <input v-model="nameInput" type="text" placeholder="Name">
        <input v-model="descInput" type="text" placeholder="Description">
        <hr>
        <div class="wrap">
            <button @click="reject()">Reject</button>
            <button @click="confirm()">Confirm</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    description: String
});

const nameInput = ref(props.name);
const descInput = ref(props.description);

function reject() { emit("reject") }
function confirm() { emit("confirm", nameInput.value, descInput.value) }

const emit = defineEmits(["confirm", "reject"])
</script>

<style scoped lang="scss">
.wrapper {
    position: absolute;
    height: 32rem;
    width: 32rem;
    background-color: white;
    z-index: 10;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.75rem;
    gap: 1rem;

    b {
        font-weight: 700;
    }

    hr {
        width: 80%;
    }

    .wrap {
        display: flex;
        gap: 2rem;

        button {
            height: 3rem;
            width: 6rem;
            background: none;
            border: solid 2px;
            border-radius: 2rem;
            font-size: 1.25rem;
        }
    }

    input {
        width: 60%;
        height: 2rem;
        text-align: center;
    }
}
</style>