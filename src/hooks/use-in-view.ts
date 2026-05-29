import { useState, useEffect, useCallback } from 'react';

export function useInView(options: IntersectionObserverInit = {}) {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  const setRef = useCallback((element: Element | null) => {
    setNode(element);
  }, []);

  // Extract properties safely to avoid triggering effect loops
  const { root, rootMargin, threshold } = options;

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { root, rootMargin, threshold });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, root, rootMargin, threshold]);

  return { ref: setRef, inView };
}
