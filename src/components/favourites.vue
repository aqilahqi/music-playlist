<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMusicStore } from '@/stores/RepoStore'
import { useQuery } from 'vue-query'
import { requestToken, getReleases } from '../lib/API'

const loading = ref(false)
const store = useMusicStore()
const releases = computed(() => {
  return store.releases
})

onMounted(() => {
  const { isLoading, error, data } = useQuery('getReleases', () => getReleases())
  console.log(data)
  store.displayReleases(data)
  store.testFunction()
  console.log('hello')
})
</script>

<template>
  <div>
    {{ releases }}
  </div>
</template>
