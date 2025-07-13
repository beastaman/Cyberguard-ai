'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagicalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference" as const,
    }
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28
  }

  return (
    <>
      <motion.div
        className="magical-cursor"
        variants={variants}
        animate={cursorVariant}
        transition={spring}
      />
      <motion.div 
        className="magical-bg"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        .magical-cursor {
          position: fixed;
          left: 0;
          top: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.5);
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 9999;
        }
        .magical-bg {
          position: fixed;
          width: 400px;
          height: 400px;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>
    </>
  )
}