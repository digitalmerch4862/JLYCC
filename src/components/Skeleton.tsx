import { motion } from 'motion/react';
import React from 'react';

export default function Skeleton({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      {...props}
    />
  );
}
