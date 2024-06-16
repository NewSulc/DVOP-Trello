<template>
    <div class="wrapper">
        <h2>Delete <b>{{ props.name }}</b></h2>
        <hr>
        <div class="wrap">
            <button @click="reject()">Reject</button>
            <button @click="confirm()">Confirm</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String
});

function reject() { emit("reject") }
function confirm() { emit("confirm") }

const emit = defineEmits(["confirm", "reject"])
</script>

<style scoped lang="scss">
.wrapper {
    position: absolute;
    height: 18rem;
    width: 32rem;
    background-color: white;
    z-index: 10;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.75rem;

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
}
</style>