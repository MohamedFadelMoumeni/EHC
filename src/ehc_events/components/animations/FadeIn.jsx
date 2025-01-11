import { motion } from 'framer-motion'

export function FadeIn({ children, delay = 0, direction = null }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}