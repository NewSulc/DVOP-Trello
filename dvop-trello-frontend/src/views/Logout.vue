<template>
</template>

<script setup>
localStorage.setItem("accessToken", "")
import { useRouter } from 'vue-router';
const router = useRouter();
router.push("/");
</script>