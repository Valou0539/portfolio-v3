export interface PopupButtonOptions {
  showPopup: () => boolean;
  openAlignment: () => "center" | "left" | "right";
  defaultContent: Ref<HTMLElement | null>;
  popupContent: Ref<HTMLElement | null>;
}

export function usePopupButton(options: PopupButtonOptions) {
  const { defaultContent, popupContent } = options;

  const animationPhase = ref<"default" | "shrink" | "expand">("default");
  const isMounted = ref(false);

  /**
   * Gère les transitions d'animation lors du changement d'état du popup
   */
  function handlePopupToggle(showPopup: boolean) {
    animationPhase.value = "shrink";
    setTimeout(() => {
      animationPhase.value = showPopup ? "expand" : "default";
    }, 200);
  }

  /**
   * Calcule les styles de taille pour le contenu par défaut
   */
  const defaultContentSizeStyles = computed(() => {
    if (!defaultContent.value) return { height: "51px" };
    const element = defaultContent.value;
    return {
      width: element.offsetWidth + "px",
      height: element.offsetHeight + "px",
    };
  });

  /**
   * Calcule les styles de taille pour le glass div selon la phase d'animation
   */
  const glassSizeStyles = computed(() => {
    switch (animationPhase.value) {
      case "default":
        return defaultContentSizeStyles.value;
      case "shrink":
        return {
          width: defaultContentSizeStyles.value.height,
          height: defaultContentSizeStyles.value.height,
        };
      case "expand":
        if (!popupContent.value) return defaultContentSizeStyles.value;
        return {
          width: popupContent.value.offsetWidth + "px",
          height: popupContent.value.offsetHeight + "px",
        };
    }
  });

  /**
   * Calcule les styles d'alignement selon la configuration
   */
  const alignmentStyles = computed(() => {
    let styles: { left?: string; right?: string; transform?: string } = {};
    switch (options.openAlignment()) {
      case "center":
        styles.left = "50%";
        styles.transform = "translateX(-50%)";
        break;
      case "left":
        styles.left = "0";
        break;
      case "right":
        styles.right = "0";
        break;
    }
    return styles;
  });

  /**
   * Calcule les classes CSS pour le contenu par défaut
   */
  const defaultContentClasses = computed(() => [
    animationPhase.value === "default"
      ? "opacity-100 duration-500"
      : "pointer-events-none translate-y-2 scale-x-90 opacity-0 duration-200",
    "transition ease-[cubic-bezier(0.66,1.75,1,0.78)]",
  ]);

  /**
   * Calcule les classes CSS pour le contenu popup
   */
  const popupContentClasses = computed(() => [
    animationPhase.value === "expand"
      ? "opacity-100 duration-500"
      : "pointer-events-none -translate-y-2 scale-90 opacity-0 duration-200",
    "absolute left-0 top-0 transition ease-[cubic-bezier(0.66,1.75,1,0.78)]",
  ]);

  /**
   * Calcule les styles pour le conteneur principal
   */
  const containerStyles = computed(() => defaultContentSizeStyles.value);

  /**
   * Calcule les styles pour le glass div
   */
  const glassStyles = computed(() => ({
    ...alignmentStyles.value,
    ...glassSizeStyles.value,
  }));

  /**
   * Configure les événements et watchers nécessaires
   */
  function setupPopupButton() {
    watch(options.showPopup, (newValue) => {
      handlePopupToggle(newValue);
    });

    // Marquer comme monté
    onMounted(() => {
      isMounted.value = true;
    });

    return {
      animationPhase: readonly(animationPhase),
      isMounted: readonly(isMounted),
      defaultContentClasses,
      popupContentClasses,
      containerStyles,
      glassStyles,
    };
  }

  return {
    animationPhase: readonly(animationPhase),
    isMounted: readonly(isMounted),
    defaultContentSizeStyles,
    glassSizeStyles,
    alignmentStyles,
    defaultContentClasses,
    popupContentClasses,
    containerStyles,
    glassStyles,
    handlePopupToggle,
    setupPopupButton,
  };
}
