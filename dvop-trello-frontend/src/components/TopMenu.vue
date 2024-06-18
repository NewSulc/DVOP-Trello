<template>
    <header>
        <div>
            <RouterLink id="logo" to="/">Trello</RouterLink>
        </div>
        <div>
            <RouterLink to="/user">User</RouterLink>
        </div>
    </header>
</template>

<script setup>
</script>

<style scoped lang="scss">
header {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    >div{
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-right: 1rem;
        height: 100%;

        &:first-child{
            margin-left: 1rem;
        }
    }
}

a {
    color: black;
    text-decoration: none;
    font-weight: 500;
}

#logo{
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(0, 136, 255);
}
</style>