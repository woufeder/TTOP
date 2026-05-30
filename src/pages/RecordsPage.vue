<script setup>
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import RecordsTable from '../components/world/RecordsTable.vue'
import records from '../content/data/records.json'
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      eyebrow="Records"
      title="列王記與政體備忘"
      description="大表格固定在內容容器內捲動，表頭 sticky，適合之後繼續往 JSON 補資料。"
    >
      <section class="paper-card rounded-[26px] p-5 sm:p-6">
        <p class="text-xs uppercase tracking-[0.36em] text-wine/55">records.json</p>
        <h2 class="mt-3 font-display text-3xl text-ink">王朝、王座與註記</h2>
        <p class="mt-4 max-w-3xl text-sm leading-8 text-ink/76 sm:text-base">
          後續如果資料量擴大，可以在這個基礎上加入 dynasty filter、搜尋與虛擬清單。
        </p>
      </section>

      <div class="mt-6">
        <RecordsTable :records="records" />
      </div>
    </ParchmentPanel>
  </AppShell>
</template>