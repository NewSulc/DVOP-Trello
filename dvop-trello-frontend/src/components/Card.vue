<template>
    <div class="card">
        <h1>{{ props.name }}</h1>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String
})
</script>

<style scoped lang="scss">
.card{
    height: 7rem;
    aspect-ratio: 4/3;
    border-radius: 1rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
}
</style>