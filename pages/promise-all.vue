<template>
  <div>
    <h1>promise-all-example</h1>

    <p>
      ボタンを押すとAPIリクエストを実行し、完了までにかかった時間を表示します。
    </p>

    <p>
      <button @click="executeSerial()">直列実行</button>
      <template v-if="serialStatus === 'pending'"> Loading... </template>
      <template v-if="serialStatus === 'success'">
        {{ execTimeInSerial }}ms
      </template>
    </p>

    <p>
      <button @click="executeParallel()">並列実行</button>
      <template v-if="parallelStatus === 'pending'"> Loading... </template>
      <template v-if="parallelStatus === 'success'">
        {{ execTimeInParallel }}ms
      </template>
    </p>

    <hr />

    <p>
      ref:
      <a
        href="https://zenn.dev/shun91/articles/promise-all-for-performance"
        target="_blank"
      >
        Promise.allで非同期処理を高速化して表示速度改善
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
const fetchApi1 = () =>
  fetch("https://dummyjson.com/users?limit=0").then((r) => r.json());

const fetchApi2 = () =>
  fetch("https://dummyjson.com/posts?limit=0").then((r) => r.json());

const fetchApi3 = () =>
  fetch("https://dummyjson.com/quotes?limit=0").then((r) => r.json());

async function serialFetch() {
  const res1 = await fetchApi1();
  const res2 = await fetchApi2();
  const res3 = await fetchApi3();
  return [res1, res2, res3];
}

async function parallelFetch() {
  const [res1, res2, res3] = await Promise.all([
    fetchApi1(),
    fetchApi2(),
    fetchApi3(),
  ]);
  return [res1, res2, res3];
}

const {
  data: execTimeInSerial,
  execute: executeSerial,
  status: serialStatus,
} = await useAsyncData(
  async () => {
    const startTimeInSeries = performance.now();
    await serialFetch();
    return performance.now() - startTimeInSeries;
  },
  { immediate: false }
);

const {
  data: execTimeInParallel,
  execute: executeParallel,
  status: parallelStatus,
} = await useAsyncData(
  async () => {
    const startTimeInParallel = performance.now();
    await parallelFetch();
    return performance.now() - startTimeInParallel;
  },
  { immediate: false }
);
</script>
