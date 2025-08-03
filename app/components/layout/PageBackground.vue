<template>
  <div class="absolute left-0 top-0 -z-10 h-screen w-full overflow-hidden">
    <div
      class="gradient-slide absolute left-0 top-0 h-screen w-[600%] opacity-25"
    ></div>
  </div>
</template>

<style scoped>
.gradient-slide {
  background: linear-gradient(
    to right,
    hsl(38, 99%, 67%) 0%,
    hsl(316, 73%, 52%) 16.66%,
    hsl(185, 100%, 57%) 33.33%,
    hsl(38, 99%, 67%) 50%,
    hsl(316, 73%, 52%) 66.66%,
    hsl(185, 100%, 57%) 83.33%,
    hsl(38, 99%, 67%) 100%
  );
  mask: linear-gradient(to bottom, black 0%, transparent 100%);
  animation: slideX 15s linear infinite;
}

@keyframes slideX {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Animation plus lente pour les utilisateurs préférant moins de mouvement */
@media (prefers-reduced-motion: reduce) {
  .gradient-slide {
    animation: slideX 45s linear infinite;
  }
}
</style>
