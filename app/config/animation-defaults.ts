import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
