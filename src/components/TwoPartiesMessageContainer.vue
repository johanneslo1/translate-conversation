<script setup lang="ts">

</script>

<template>
    <main :class="['flex flex-col h-screen']">

        <!-- Konversationsbereich -->
        <div class="flex-1 overflow-y-auto p-4">
            <slot name="messages" />
        </div>

        <slot name="audio"></slot>
    </main>
</template>

<style scoped>

</style>