import { motion } from "framer-motion";

// Fade-Up Animation
export const FadeUpWrapper = ({ children, duration = 0.6, delay = 0 }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
};

// Fade-Left Animation
export const FadeLeftWrapper = ({ children, duration = 0.6, delay = 0 }) => {
  const fadeLeft = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration, delay } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeLeft}
    >
      {children}
    </motion.div>
  );
};

// Fade-Right Animation
export const FadeRightWrapper = ({ children, duration = 0.6, delay = 0 }) => {
  const fadeRight = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration, delay } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeRight}
    >
      {children}
    </motion.div>
  );
};
