<template>
    <div class="wrap">
        <i @click="changePro()" class="fa-solid fa-pen"></i>
        <i @click="deletePro()" class="fa-solid fa-trash"></i>
        <div class="card" :style="{ backgroundColor: bgColor }" @click="selectPro()">
            <h1>{{ props.name }}</h1>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

const bgColor = ref('');

const props = defineProps({
    name: String,
    id: Number
});

onMounted(() => {
    bgColor.value = '#' + Math.floor(Math.random() * 16777215).toString(16);
});

const emit = defineEmits(["selectPro", "changePro", "deletePro"])

const selectPro = () => { emit("selectPro") }
const changePro = () => { emit("changePro") }
const deletePro = () => { emit("deletePro") }
</script>

<style scoped lang="scss">
.wrap {
    height: 7rem;
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
</style>
