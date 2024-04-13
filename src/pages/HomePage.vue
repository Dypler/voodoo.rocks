<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
const users = ref([])
const searchQuery = ref('')

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts.value = response.data
  } catch (error) {
    console.error('Ошибка при получении публикаций:', error)
  }
}

async function fetchUsers() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
  } catch (error) {
    console.error('Ошибка при получении данных пользователей:', error)
  }
}

onMounted(() => {
  fetchPosts()
  fetchUsers()
})

function filteredPosts() {
  if (!searchQuery.value) {
    return posts.value
  }
  return posts.value.filter((post) => {
    const user = users.value.find((user) => user.id === post.userId)
    return user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
}
</script>

<template>
  <div class="container">
    <div class="flex justify-center mt-16">
      <div class="relative w-full max-w-sm">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search Icon" />
        <input
          v-model="searchQuery"
          class="border border-gray-300 rounded py-2 pl-11 pr-4 w-full focus:outline-none focus:border-gray-400"
          type="search"
          placeholder="Поиск по автору..."
        />
      </div>
    </div>
    <div class="mt-10">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" v-auto-animate>
        <div
          v-for="post in filteredPosts()"
          :key="post.id"
          class="p-4 bg-white flex flex-col justify-between shadow-md rounded"
        >
          <b class="text-2xl text-[#5D9FE9]">{{ post.title }}</b>
          <p class="text-xl">{{ post.body }}</p>
          <p class="text-slate-400" v-if="users.length">
            {{ users.find((user) => user.id === post.userId).name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
