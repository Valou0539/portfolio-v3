<template>
  <div
    class="absolute left-0 top-0 -z-10 h-screen w-full overflow-hidden opacity-25"
  >
    <div class="gradient-slide absolute inset-0"></div>
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
  background-size: 300% 100%;
  mask: linear-gradient(to bottom, black 0%, transparent 100%);
  animation: slideBg 15s linear infinite;
}

@keyframes slideBg {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -75% 0;
  }
}

/* Animation plus lente pour les utilisateurs préférant moins de mouvement */
@media (prefers-reduced-motion: reduce) {
  .gradient-slide {
    animation: slideX 45s linear infinite;
  }
}
</style>
