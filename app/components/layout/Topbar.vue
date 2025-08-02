<template>
  <header
    class="fixed top-0 z-50 flex w-full items-center justify-between gap-16 px-4 pt-4 md:justify-center"
  >
    <CommonGlassDiv :rounded="999" :blur-amount="3" update-text-color>
      <NuxtLinkLocale to="/" class="block p-3.5 md:hidden">
        <span class="sr-only">{{ $t("layout.topbar.home") }}</span>
        <HomeIcon class="size-6" />
      </NuxtLinkLocale>
      <LayoutDesktopNav class="hidden md:flex" :navigation="navigation" />
    </CommonGlassDiv>

    <CommonPopupButton
      :showPopup="showPopup"
      :rounded="26"
      :blur-amount="3"
      :open-alignment="openAlignment"
      update-text-color
    >
      <template #default>
        <div class="flex items-center gap-6 px-5 py-2">
          <button @click="openMenu('lang')" class="cursor-pointer p-2">
            <span class="sr-only">{{
              $t("layout.topbar.selected-language", {
                selectedLanguage: $i18n.locales.value.find(
                  (l) => l.code === $i18n.locale,
                )?.name,
              })
            }}</span>
            <AssetsFlag :lang="$i18n.locale" class="size-5 opacity-90" />
          </button>
          <LayoutThemeButton class="hidden md:block" />
          <button
            @click="openMenu('mobile')"
            class="block cursor-pointer p-1 md:hidden"
          >
            <Bars2Icon class="size-7" />
          </button>
        </div>
      </template>
      <template #popup>
        <LayoutLangMenu v-if="menuOpen === 'lang'" @close="closeMenu" />
        <LayoutMobileMenu
          v-else-if="menuOpen === 'mobile'"
          @close="closeMenu"
          :navigation="navigation"
        />
      </template>
    </CommonPopupButton>
  </header>
</template>

<script setup lang="ts">
import {
  Bars2Icon,
  BriefcaseIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

const navigation = [
  {
    i18nKey: "layout.topbar.home-nav",
    path: "/",
    icon: HomeIcon,
  },
  {
    i18nKey: "layout.topbar.about",
    path: "/about",
    icon: UserIcon,
  },
  {
    i18nKey: "layout.topbar.projects",
    path: "/projects",
    icon: BriefcaseIcon,
  },
  {
    i18nKey: "layout.topbar.contact",
    path: "/contact",
    icon: EnvelopeIcon,
  },
];

const showPopup = ref(false);
const menuOpen = ref<"lang" | "mobile" | null>(null);

const openAlignment = ref<"center" | "right">("center");

function openMenu(type: "lang" | "mobile") {
  menuOpen.value = type;
  showPopup.value = true;
}

function closeMenu() {
  menuOpen.value = null;
  showPopup.value = false;
}

function setAlignment() {
  openAlignment.value = window?.innerWidth < 768 ? "right" : "center";
}

onMounted(() => {
  setAlignment();
  window.addEventListener("resize", setAlignment);
});
onUnmounted(() => {
  window.removeEventListener("resize", setAlignment);
});
</script>
