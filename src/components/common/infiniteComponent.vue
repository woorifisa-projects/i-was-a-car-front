<template>
  <div>
    <ul ref="listEl">
      <li v-for="comment in commentsList">
        {{ comment }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { axios } from 'axios';

const getComments = async (max, omit) => {
  try {
    const comments = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_limit=${max}&_start=${omit}`
    );
    return comments.data.map((comment) => comment.body);
  } catch (error) {
    console.error(error);
  }
};
export { getComments };
</script>
