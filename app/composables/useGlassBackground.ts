import html2canvas from "html2canvas-pro";

export function useGlassBackground() {
  const bodyCanvas = ref<HTMLCanvasElement | null>(null);

  /**
   * Capture le body de la page en tant que canvas pour analyser les couleurs de fond
   */
  async function captureBody(): Promise<void> {
    try {
      const sourceCanvas = await html2canvas(document.body, {
        ignoreElements: (el) => el.classList.contains("glass"),
        backgroundColor: "transparent",
        logging: false,
      });

      // Créer un nouveau canvas avec willReadFrequently
      const optimizedCanvas = document.createElement("canvas");
      optimizedCanvas.width = sourceCanvas.width;
      optimizedCanvas.height = sourceCanvas.height;

      const ctx = optimizedCanvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (ctx) {
        ctx.drawImage(sourceCanvas, 0, 0);
        bodyCanvas.value = optimizedCanvas;
      }
    } catch (error) {
      console.error("Erreur lors de la capture du body:", error);
    }
  }

  /**
   * Calcule la luminosité moyenne derrière un élément donné
   * @param element - L'élément HTML pour lequel calculer la luminosité
   * @returns La luminosité en pourcentage (0-100)
   */
  function getLightnessBehind(element: HTMLElement): number {
    let { top, left, width, height } = element.getBoundingClientRect();
    top += window.scrollY;
    left += window.scrollX;

    // Vérifier que le canvas est disponible
    const ctx = bodyCanvas.value?.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) return 50;

    try {
      const imageData = ctx.getImageData(left, top, width, height).data;

      // Calcul de la moyenne RGB
      let r = 0,
        g = 0,
        b = 0;
      const totalPixels = width * height;

      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i] ?? 0;
        g += imageData[i + 1] ?? 0;
        b += imageData[i + 2] ?? 0;
      }

      r = Math.round(r / totalPixels);
      g = Math.round(g / totalPixels);
      b = Math.round(b / totalPixels);

      // Calcul de la luminosité selon la formule standard
      const lightness = 0.299 * r + 0.587 * g + 0.114 * b;
      return Math.round((lightness / 255) * 100);
    } catch (error) {
      console.error("Erreur lors du calcul de la luminosité:", error);
      return 50; // Valeur par défaut en cas d'erreur
    }
  }

  /**
   * Met à jour la couleur du texte basée sur la luminosité du fond
   * @param element - L'élément pour lequel analyser le fond
   */
  function updateTextColor(element: HTMLElement | null): void {
    if (!element) return;

    const lightness = getLightnessBehind(element);

    element.classList.remove("text-secondary-light", "text-secondary-dark");
    if (lightness > 50 && useColorMode().value === "dark") {
      element.classList.add("text-secondary-light");
    } else if (lightness < 50 && useColorMode().value === "light") {
      element.classList.add("text-secondary-dark");
    }
  }

  /**
   * Configure les événements pour la capture automatique du background
   * @param element - L'élément de référence pour les mises à jour de couleur
   */
  function setupBackgroundCapture(element: Ref<HTMLElement | null>) {
    let resizeTimeout: number;

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(async () => {
        await captureBody();
        updateTextColor(element.value);
      }, 250);
    };

    const handleScroll = () => {
      updateTextColor(element.value);
    };

    const handleLoad = () => {
      element.value?.classList.remove(
        "text-secondary-light",
        "text-secondary-dark",
      );
      setTimeout(async () => {
        await captureBody();
        updateTextColor(element.value);
      }, 200);
    };

    onMounted(() => {
      handleLoad();
      window.addEventListener("load", handleLoad);
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    });

    const colorMode = useColorMode();
    watch(() => colorMode.value, handleLoad);

    const router = useRouter();
    watch(() => router.currentRoute.value, handleLoad);

    return {
      captureBody,
      updateTextColor: () => updateTextColor(element.value),
    };
  }

  return {
    bodyCanvas: readonly(bodyCanvas),
    captureBody,
    getLightnessBehind,
    updateTextColor,
    setupBackgroundCapture,
  };
}
