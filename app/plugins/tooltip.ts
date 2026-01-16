export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", {
    mounted(el, binding) {
      const tooltipId = generateTooltipId();
      const tooltip = createTooltipElement(tooltipId, binding.value);

      setupAccessibility(el, binding.value);
      document.body.appendChild(tooltip);

      const positionTooltip = createPositionHandler(el, tooltip);
      const handlers = createVisibilityHandlers(
        el,
        tooltip,
        tooltipId,
        positionTooltip,
      );

      attachEventListeners(el, handlers);

      (el as any)._tooltip = {
        tooltip,
        positionTooltip,
      };
    },

    updated(el, binding) {
      const data = (el as any)._tooltip;
      if (!data?.tooltip) return;

      data.tooltip.textContent = binding.value;
      el.setAttribute("aria-label", binding.value);

      if (data.tooltip.style.display === "block") {
        data.positionTooltip();
      }
    },

    unmounted(el) {
      const data = (el as any)._tooltip;
      if (data?.tooltip) {
        data.tooltip.remove();
      }
    },

    getSSRProps() {
      return {};
    },
  });
});
