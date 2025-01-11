import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Children } from 'react';
import './AnimatedGrid.css';

const AnimatedGrid = ({ children }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="animated-grid"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, child => (
        <motion.div variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

AnimatedGrid.propTypes = {
  children: PropTypes.node.isRequired
};

export default AnimatedGrid;