import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return { ref, isInView };
};