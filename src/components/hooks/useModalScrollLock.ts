import { useEffect } from "react";

export default function useModalScrollLock(isOpen: boolean) {
  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const preventDefault = (e: Event) => e.preventDefault();

    if (isOpen) {
      // 1. stop scroll-container scroll
      if (scrollContainer) scrollContainer.style.overflow = "hidden";

      // 2. stop scroll
      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });
    }

    return () => {
      if (scrollContainer) scrollContainer.style.overflow = "auto";
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [isOpen]);
}
