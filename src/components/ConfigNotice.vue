<script setup>
defineProps({
  setting: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="alert alert-warning">
    This page needs <code>{{ setting }}</code
    >. Add it to <code>.env.local</code> (locally) or to your hosting environment variables, then
    restart <code>npm run dev</code> or redeploy.
  </div>
</template>
