<template>
  <section class="relative isolate flex min-h-dvh overflow-hidden bg-dusk text-parchment">
    <div class="absolute inset-0 bg-starlit-sky" />
    <div
      class="absolute inset-0 opacity-40"
      style="background-image: radial-gradient(circle at 12% 18%, rgba(255, 240, 199, 0.3), transparent 0 8%), radial-gradient(circle at 68% 16%, rgba(200, 216, 255, 0.25), transparent 0 7%), radial-gradient(circle at 82% 44%, rgba(255, 237, 188, 0.22), transparent 0 6%), radial-gradient(circle at 26% 78%, rgba(166, 188, 255, 0.14), transparent 0 7%);"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-[42dvh]"
      style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(6, 7, 10, 0.9)), radial-gradient(circle at 50% 120%, rgba(19, 14, 18, 0.95), rgba(8, 10, 14, 0.98) 64%);"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-[20rem] opacity-90"
      style="background-image: linear-gradient(180deg, transparent, rgba(4, 5, 8, 0.9) 68%), linear-gradient(90deg, rgba(3, 4, 6, 0.96), rgba(14, 17, 24, 0.68) 36%, rgba(14, 17, 24, 0.68) 64%, rgba(3, 4, 6, 0.96)); clip-path: polygon(0% 100%, 10% 68%, 18% 74%, 27% 56%, 36% 72%, 45% 47%, 54% 71%, 64% 57%, 74% 76%, 84% 52%, 100% 100%);"
    />

    <div class="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p class="animate-fadeRise text-sm uppercase tracking-[0.48em] text-parchment/70 sm:text-base">
        Archive of Myth and Dust
      </p>
      <h1 class="animate-fadeRise text-shadow-soft mt-6 max-w-5xl font-display text-[clamp(3.75rem,10vw,8rem)] leading-[0.94] text-parchment">
        奇幻世界資訊站
      </h1>
      <p class="animate-fadeRise mt-6 max-w-2xl text-base leading-8 text-parchment/78 sm:text-lg">
        以星圖、列王記、地誌卷與文章文庫組成的靜態世界資料庫。
        第一階段先建立可長期維護的版型骨架與內容流。
      </p>

      <RouterLink to="/world" class="group mt-14 inline-flex flex-col items-center gap-4">
        <span class="relative flex h-28 w-28 items-center justify-center rounded-full border border-oldGold/45 bg-white/5 text-oldGold animate-pulseRune transition duration-500 group-hover:rotate-6 group-hover:scale-105">
          <span class="absolute inset-3 rounded-full border border-oldGold/30" />
          <span class="text-xs uppercase tracking-[0.55em]">ENTER</span>
        </span>
        <span class="text-xs uppercase tracking-[0.46em] text-parchment/72 sm:text-sm">
          點擊進入世界觀主站
        </span>
      </RouterLink>
    </div>
  </section>
</template>