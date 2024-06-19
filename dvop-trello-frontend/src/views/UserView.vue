<template>
    <div class="header">
        <TopMenu />
    </div>
    <article>
    </article>
</template>

<script setup>
import TopMenu from '../components/TopMenu.vue';
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 6%;
}

article {
    width: 100%;
    min-height: 94%;
    background: url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
</style>