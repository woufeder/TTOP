<script setup>
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="compact"
      eyebrow="404"
      title="這一頁沒有被寫進卷冊"
      description="你要找的內容可能尚未建立，或是路由 slug 已變更。"
    >
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/world"
          class="rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
        >
          回到世界觀總覽
        </RouterLink>
        <RouterLink
          to="/articles"
          class="rounded-full border border-[rgba(84,46,23,0.12)] bg-white/35 px-5 py-3 text-sm tracking-[0.18em] text-wine/85 transition hover:bg-white/60"
        >
          去文庫看看
        </RouterLink>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>