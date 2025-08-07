"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      {/* Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className="w-24 h-24 border-2 border-gray-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 w-20 h-20 border-2 border-emerald-200 rounded-full border-t-emerald-600"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="text-lg font-bold text-gray-900"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BLV
          </motion.div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        className="absolute bottom-32 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.p
          className="text-lg text-gray-600 mb-4 font-light"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Construyendo el futuro...
        </motion.p>
        
        {/* Progress Bar */}
        <div className="w-48 h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}