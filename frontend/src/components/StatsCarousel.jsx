import React from "react";
import { motion } from "framer-motion";

const StatsCarousel = () => {
  const stats = [
    { value: "500+", label: "Transporters" },
    { value: "1000+", label: "Deliveries" },
    { value: "24/7", label: "Support" },
    { value: "98%", label: "Satisfaction" },
  ];

  return (
    <div className="w-full overflow-hidden py-8 ">
      <motion.div
        className="flex space-x-6"
        animate={{
          x: [600, -1800],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...stats, ...stats].map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-blue-600/20 to-indigo-600/30 border border-blue-400/20 shadow-lg min-w-[200px] h-36"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(96, 165, 250, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {stat.value}
            </motion.div>
            <motion.div
              className="text-sm text-blue-200 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsCarousel;
