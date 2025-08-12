type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<BreakpointKey, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useBreakpoints = <T>(
  defaultValue: T,
  breakpointValues: Partial<Record<BreakpointKey, T>>,
) => {
  const value = ref<T>(defaultValue);

  const handleResize = () => {
    const width = window.innerWidth;
    value.value = defaultValue;

    for (const [key, breakpointValue] of Object.entries(breakpoints)) {
      const newValue = breakpointValues[key as BreakpointKey];
      if (breakpointValue < width && newValue) {
        value.value = newValue;
      }
    }
  };

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return value;
};
