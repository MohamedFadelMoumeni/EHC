import React from 'react';
import { motion } from 'framer-motion';

export default function CarouselTrack({ items, renderItem, duration = 35 }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }
        }}
        style={{
          width: '200%' // Double width to accommodate duplicate items
        }}
      >
        {/* Original items */}
        <div className="flex">
          {items.map((item, index) => renderItem(item, index))}
        </div>
        {/* Duplicated items for seamless loop */}
        <div className="flex">
          {items.map((item, index) => renderItem(item, `duplicate-${index}`))}
        </div>
      </motion.div>
    </div>
  );
}