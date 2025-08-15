"use client";

import { motion } from "framer-motion";

export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-blue-500/3 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-purple-500/3 to-transparent rounded-full blur-3xl" />
      
      {/* Very subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px] dark:bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)]" />
    </div>
  );
};

export const HeroPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Very subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/2" />
      
      {/* Gentle animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/8 via-blue-500/3 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/6 via-pink-500/3 to-transparent rounded-full blur-3xl"
      />
      
      {/* Very subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:120px_120px] dark:bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)]" />
    </div>
  );
};

export const StatsPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Very subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/2 via-transparent to-blue-500/2" />
      
      {/* Gentle floating dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${25 + i * 20}%`,
            top: `${35 + (i % 2) * 30}%`,
          }}
        />
      ))}
    </div>
  );
};

export const FeaturesPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Very subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/1 to-transparent" />
      
      {/* Gentle geometric accents */}
      <motion.div
        animate={{
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 right-10 w-20 h-20 border border-primary/5 rounded-full"
      />
      
      <motion.div
        animate={{
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 left-10 w-16 h-16 border border-blue-400/5 rounded-lg"
      />
      
      {/* Very subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:100px_100px] dark:bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)]" />
    </div>
  );
};

export const CTAPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gentle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-blue-500/3" />
      
      {/* Very subtle floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
          className="absolute w-1 h-1 bg-primary/15 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${25 + (i % 3) * 20}%`,
          }}
        />
      ))}
    </div>
  );
};
