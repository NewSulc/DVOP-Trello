import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useRouter } from 'vue-router';

export const useDataStore = defineStore('dataStore', () => {
    const router = useRouter();

    const currentBoard = ref({});

    const getCurrentBoard = (boardId) => {
        fetch(`http://localhost:8080/board/${boardId}`, {
            method: "GET"
        }).then(async (res) => {
            if (res.status !== 404) {
                const newBoard = await res.text();
                currentBoard.value = JSON.parse(newBoard)
            }
            else {
                router.push("/")
            }
        }).catch(error => {
            console.error('Error fetching resource:', error);
        });
    }

    const createTask = (listId, taskName) => {
        if (taskName != "") {
            fetch(`http://localhost:8080/board/${currentBoard.value.id}/list/${listId}/task`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: taskName
                })
            }).then(async (res) => {
                const newBoard = await res.text();
                currentBoard.value = JSON.parse(newBoard)
            }).catch(error => {
                console.error('Error fetching resource:', error);
            });
        }
    }

    const updateTask = (listId, taskId, taskName) => {
        if (taskName != "") {
            fetch(`http://localhost:8080/board/${currentBoard.value.id}/list/${listId}/task/${taskId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: taskName
                })
            }).then(async (res) => {
                const newBoard = await res.text();
                currentBoard.value = JSON.parse(newBoard)
            }).catch(error => {
                console.error('Error fetching resource:', error);
            });
        }
    }

    return {
        currentBoard,
        getCurrentBoard,
        createTask,
        updateTask
    }
})
