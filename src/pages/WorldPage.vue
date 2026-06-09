<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useSiteI18n } from "../composables/useSiteI18n";

const { localeRoute, messages } = useSiteI18n();

const pageCopy = computed(() => messages.value.world);
</script>

<template>
  <main class="min-h-screen w-full overflow-hidden">
    <div
      class="container flex min-h-screen w-full flex-col items-center justify-center gap-12 px-4 py-10"
    >
      <div class="world-portal">
        <RouterLink
          v-for="link in pageCopy.portalLinks"
          :key="link.routeName"
          :to="localeRoute(link.routeName)"
          class="portal-link"
          :class="`portal-link--${link.routeName}`"
          :aria-label="link.label"
        >
          <span class="portal-link__icon" aria-hidden="true"></span>

          <span class="portal-link__panel">
            <span class="portal-link__label">
              {{ link.label }}
            </span>
          </span>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.world-portal {
  position: relative;
  width: min(100%, 1520px);
  min-height: 520px;
  height: 80vh;
}

/* 每顆入口的基本結構 */
.portal-link {
  position: absolute;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  z-index: 1;

  &:hover,
  &:focus-visible {
    z-index: 5;

    .portal-link__icon {
      transform: scale(1.08) rotate(-3deg);
      filter: brightness(1.08);
    }

    .portal-link__panel {
      opacity: 1;
      transform: translateX(0) translateY(-50%);
      pointer-events: auto;
    }
  }
}

/* 預設圖案 */
.portal-link__icon {
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 999px;
  background-color: var(--color-mist);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid var(--panel-edge);
  box-shadow: 0 8px 18px rgba(49, 24, 13, 0.16);
  transition:
    transform 0.25s ease,
    filter 0.25s ease,
    box-shadow 0.25s ease;
}

/* hover 後出現的文字牌 */
.portal-link__panel {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  min-width: 150px;
  padding: 16px 24px;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-8px) translateY(-50%);
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;

  background: var(--panel-fill);
  border: 1px solid var(--panel-edge);
  border-radius: 16px;
  box-shadow: var(--panel-shadow);
  backdrop-filter: blur(2px);
}

.portal-link__label {
  display: block;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

/* 桌機點位：這裡之後你可以慢慢用百分比微調 */
.portal-link--history {
  left: 8%;
  top: 16%;
}

.portal-link--records {
  left: 34%;
  top: 8%;
}

.portal-link--terms {
  left: 58%;
  top: 18%;
}

.portal-link--religions {
  right: 8%;
  top: 12%;
}

.portal-link--organizations {
  left: 16%;
  top: 48%;
}

.portal-link--map {
  left: 40%;
  top: 42%;
}

.portal-link--races {
  left: 62%;
  top: 50%;
}

.portal-link--characters {
  right: 12%;
  top: 46%;
}

.portal-link--articles {
  left: 10%;
  bottom: 10%;
}

.portal-link--credits {
  left: 43%;
  bottom: 7%;
}

/* 如果之後要換圖案，可以在這裡塞 background-image */
.portal-link--history .portal-link__icon {
  /* background-image: url("/image/icons/history.png"); */
}

.portal-link--records .portal-link__icon {
  /* background-image: url("/image/icons/records.png"); */
}

.portal-link--terms .portal-link__icon {
  /* background-image: url("/image/icons/terms.png"); */
}

.portal-link--religions .portal-link__icon {
  /* background-image: url("/image/icons/religions.png"); */
}

/* 平板以下：不要 absolute，改成正常 grid，避免按鈕互撞 */
@media (max-width: 767px) {
  .world-portal {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px 20px;
    min-height: auto;
    width: min(100%, 420px);
    padding-block: 32px;
  }

  .portal-link {
    position: relative;
    inset: auto;
    justify-content: center;
  }

  .portal-link__icon {
    width: 64px;
    height: 64px;
  }

  .portal-link__panel {
    left: 50%;
    top: calc(100% + 10px);
    min-width: auto;
    padding: 8px 12px;
    transform: translateX(-50%) translateY(-4px);
    border-radius: 999px;
  }

  .portal-link:hover,
  .portal-link:focus-visible {
    .portal-link__panel {
      transform: translateX(-50%) translateY(0);
    }
  }

  .portal-link__label {
    font-size: 0.9rem;
    letter-spacing: 0.08em;
  }
}

/* 更小手機：改兩欄，避免太擠 */
@media (max-width: 420px) {
  .world-portal {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
