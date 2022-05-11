<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

const datas: any = ref([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/finance");
  datas.value = res.data;
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <td>Date</td>
        <td>종가</td>
        <td>차이</td>
        <td>시가</td>
        <td>고가</td>
        <td>저가</td>
        <td>거래량</td>
      </tr>
    </thead>
    <tbody>
      <tr v-bind:key="data.date" v-for="data in datas">
        <td>{{ data.date }}</td>
        <td>{{ data.close }}</td>
        <td>{{ data.diff }}</td>
        <td>{{ data.open }}</td>
        <td>{{ data.high }}</td>
        <td>{{ data.low }}</td>
        <td>{{ data.volume }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table,
th,
td {
  border: 1px solid gray;
}
</style>
