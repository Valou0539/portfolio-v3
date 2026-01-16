const TOOLTIP_MARGIN = 8;
const TOOLTIP_CLASSES =
  "fixed z-50 rounded bg-black px-2 py-1 text-xs text-white whitespace-nowrap";

export function generateTooltipId(): string {
  return `tooltip-${Math.random().toString(36).slice(2)}`;
}

export function createTooltipElement(id: string, text: string): HTMLDivElement {
  const tooltip = document.createElement("div");
  tooltip.id = id;
  tooltip.setAttribute("role", "tooltip");
  tooltip.className = TOOLTIP_CLASSES;
  tooltip.style.display = "none";
  tooltip.textContent = text;
  return tooltip;
}

export function setupAccessibility(el: HTMLElement, tooltipText: string): void {
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-label", tooltipText);
}

export function calculateTooltipPosition(
  elRect: DOMRect,
  tooltipRect: DOMRect,
): { top: number; left: number } {
  let top = elRect.bottom + TOOLTIP_MARGIN;
  let left = elRect.left + elRect.width / 2 - tooltipRect.width / 2;

  left = Math.max(
    TOOLTIP_MARGIN,
    Math.min(left, window.innerWidth - tooltipRect.width - TOOLTIP_MARGIN),
  );

  if (top + tooltipRect.height > window.innerHeight) {
    top = elRect.top - tooltipRect.height - TOOLTIP_MARGIN;
  }

  return { top, left };
}

export function createPositionHandler(
  el: HTMLElement,
  tooltip: HTMLDivElement,
): () => void {
  return () => {
    const elRect = el.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const { top, left } = calculateTooltipPosition(elRect, tooltipRect);

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  };
}

export function createVisibilityHandlers(
  el: HTMLElement,
  tooltip: HTMLDivElement,
  tooltipId: string,
  positionTooltip: () => void,
) {
  let isOpen = false;

  const show = () => {
    isOpen = true;
    tooltip.style.display = "block";
    positionTooltip();
    el.setAttribute("aria-describedby", tooltipId);
  };

  const hide = () => {
    isOpen = false;
    tooltip.style.display = "none";
    el.removeAttribute("aria-describedby");
  };

  const toggle = () => (isOpen ? hide() : show());

  return { show, hide, toggle };
}

export function attachEventListeners(
  el: HTMLElement,
  handlers: { show: () => void; hide: () => void; toggle: () => void },
): void {
  const { show, hide, toggle } = handlers;

  el.addEventListener("mouseenter", show);
  el.addEventListener("mouseleave", hide);
  el.addEventListener("focus", show);
  el.addEventListener("blur", hide);
  el.addEventListener("click", toggle);
  el.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") hide();
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
}
