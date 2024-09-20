<template>
  <div>
    <NuxtRouteAnnouncer />

    <h1>nuxt-compression-sample</h1>

    <p>
      ブラウザのdevtoolsのネットワークタブを開き、圧縮配信されていることを確認してみてください。
    </p>

    <table v-if="data">
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
    <template v-else> Loading... </template>
  </div>
</template>

<script setup lang="ts">
const { data } = await useLazyFetch<any>("/api/todos", { server: false });
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  border: solid 1px;
}
</style>
