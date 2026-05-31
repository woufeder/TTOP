<script setup>
defineProps({
  records: {
    type: Array,
    default: () => [],
  },
  labels: {
    type: Object,
    default: () => ({ dynasty: 'Dynasty', ruler: 'Ruler', reign: 'Reign', seat: 'Seat', notes: 'Notes' }),
  },
})
</script>

<template>
  <div class="overflow-hidden rounded-[26px] border border-[rgba(84,46,23,0.12)] bg-white/45">
    <div class="paper-scroll max-h-[60dvh] overflow-auto">
      <table class="min-w-full border-collapse text-left text-sm text-ink/80">
        <thead class="sticky top-0 z-10 bg-[rgba(72,16,20,0.92)] text-parchment">
          <tr>
            <th class="px-4 py-4 font-display text-base">{{ labels.dynasty }}</th>
            <th class="px-4 py-4 font-display text-base">{{ labels.ruler }}</th>
            <th class="px-4 py-4 font-display text-base">{{ labels.reign }}</th>
            <th class="px-4 py-4 font-display text-base">{{ labels.seat }}</th>
            <th class="px-4 py-4 font-display text-base">{{ labels.notes }}</th>
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