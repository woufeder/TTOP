<script setup>
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import Timeline from '../components/world/Timeline.vue'
import timeline from '../content/data/timeline.json'
</script>

<template>
  <AppShell>
    <ParchmentPanel
      eyebrow="Chronicle"
      title="世界編年史"
      description="桌機使用水平時間軸，手機收斂成垂直時間軸。後續只要補 timeline.json 就能擴充事件。"
    >
      <section class="paper-card rounded-[26px] p-5 sm:p-6">
        <p class="text-xs uppercase tracking-[0.36em] text-wine/55">timeline data</p>
        <h2 class="mt-3 font-display text-3xl text-ink">神話時代到現世紀的節點</h2>
        <p class="mt-4 max-w-3xl text-sm leading-8 text-ink/76 sm:text-base">
          每一則節點都可以擴充 detailSlug，未來對應到更完整的長文、角色或地圖點說明。
        </p>
      </section>

      <div class="mt-6">
        <Timeline :events="timeline" />
      </div>
    </ParchmentPanel>
  </AppShell>
</template>