<template>
    <div class="w-full h-full flex flex-col justify-center items-center relative z-20">
        <div class="flex flex-col mb-1">
            <span class="text-indigo-500 text-4xl text-center mb-4">2048</span>
            <nuxt-link
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to="/game"
            >
                Play Single player
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index.vue',
};
</script>

<style scoped>

</style>
