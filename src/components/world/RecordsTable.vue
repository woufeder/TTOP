<script setup>
defineProps({
  records: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="overflow-hidden rounded-[26px] border border-[rgba(84,46,23,0.12)] bg-white/45">
    <div class="paper-scroll max-h-[60dvh] overflow-auto">
      <table class="min-w-full border-collapse text-left text-sm text-ink/80">
        <thead class="sticky top-0 z-10 bg-[rgba(72,16,20,0.92)] text-parchment">
          <tr>
            <th class="px-4 py-4 font-display text-base">王朝</th>
            <th class="px-4 py-4 font-display text-base">統治者</th>
            <th class="px-4 py-4 font-display text-base">統治期間</th>
            <th class="px-4 py-4 font-display text-base">王座</th>
            <th class="px-4 py-4 font-display text-base">註記</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in records"
            :key="`${record.dynasty}-${record.ruler}`"
            class="border-b border-[rgba(84,46,23,0.08)] align-top"
          >
            <td class="px-4 py-4 font-display text-lg text-ink">{{ record.dynasty }}</td>
            <td class="px-4 py-4">{{ record.ruler }}</td>
            <td class="px-4 py-4 whitespace-nowrap">{{ record.reign }}</td>
            <td class="px-4 py-4 whitespace-nowrap">{{ record.seat }}</td>
            <td class="px-4 py-4 leading-7">{{ record.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>