<template>
    <text class="task" v-if="!editing" @click="editing = true">
        {{ props.name }}
        <i class="fa-solid fa-pen" @click="editedTask = props.name"></i>
        <i class="fa-solid fa-trash" @click="deleteTask()"></i>
    </text>
    <textarea v-if="editing" v-model="editedTask"></textarea>
    <section class="add" v-if="editing">
        <div class="send" @click="changeTask()">Add card
        </div>
        <i class="fa-solid fa-xmark cancel" @click="editing = false"></i>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    id: Number,
    listId: Number
});

const emit = defineEmits(["reloadList"])

const editing = ref(false);
const editedTask = ref(props.name);

function changeTask() {
    if(editedTask.value == "") {
        alert("Task must have a name")
        return
    }
    fetch(`http://localhost:8080/task/${props.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            name: editedTask.value
        })
    }).then(async (res) => {
        editing.value = false
        emit("reloadList")
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}

function deleteTask() {
    fetch(`http://localhost:8080/task/${props.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(async (res) => {
        emit("reloadList")
    }).catch(error => {
        console.error('Error fetching resource:', error);
    });
}
</script>

<style scoped lang="scss">
.task {
    width: 100%;
    height: 2.5rem;
    background-color: #23272a;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    overflow-wrap: break-all;
    position: relative;
    gap: 0.5rem;

    >.importance {
        height: 0.5rem;
        aspect-ratio: 1;
        border-radius: 50%;

        &.green {
            background-color: green;
        }

        &.yellow {
            background-color: yellow;
        }

        &.red {
            background-color: red;
        }
    }

    >i {
        display: none;
        position: absolute;
        right: 1rem;
        font-size: 0.75rem;

        &:first-child{
            right: 3rem;
        }
    }

    &:hover {
        >i {
            display: flex;
            background-color: #30363a;
            border-radius: 50%;
            padding: 0.5rem;
        }
    }
}

textarea {
    background-color: #23272a;
    padding-left: 1rem;
    padding-top: 0.5rem;
    width: 100%;
    height: 4.5rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
    color: white;
    resize: none;
    font-family: "Roboto", sans-serif;
}

.add {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;

    >.send {
        width: 50%;
        background-color: #569dfe;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.2rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
    }

    >.cancel {
        color: white;
        font-size: 1.5rem;
    }
}
</style>