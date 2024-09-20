<template>
  <div>
    <NuxtRouteAnnouncer />

    <table v-if="data" style="border: solid">
      <thead>
        <tr>
          <th>id</th>
          <th>todo</th>
        </tr>
      </thead>
      <tr v-for="todo in data.todos">
        <td>{{ todo.id }}</td>
        <td>{{ todo.todo }}</td>
      </tr>
    </table>
    <template v-else>
      <p>Loading...</p>
    </template>

    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { data } = await useLazyFetch<any>("/api/todos", { server: false });
</script>

<style scoped>
th,
td {
  border: solid;
}
</style>
