// components/SectionWithMockup.tsx
'use client';

import React from "react";
import { motion } from "framer-motion";

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
}) => {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    },
  };

  const layoutClasses = reverseLayout
    ? "lg:grid-cols-2 lg:grid-flow-col-dense"
    : "lg:grid-cols-2";

  const textOrderClass = reverseLayout ? "lg:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "lg:col-start-1" : "";

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 xl:py-48 bg-white dark:bg-black overflow-hidden">
      <div className="container max-w-[1320px] w-full px-4 sm:px-6 lg:px-10 relative z-10 mx-auto">
        <motion.div
          className={`grid grid-cols-1 gap-12 sm:gap-16 lg:gap-8 w-full items-center ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Text Content - Mobile-first approach */}
          <motion.div
            className={`flex flex-col items-start gap-3 sm:gap-4 max-w-full sm:max-w-[546px] mx-auto lg:mx-0 ${textOrderClass}`}
          >
            <div className="space-y-2 sm:space-y-3 lg:space-y-1">
              <h2 className="text-black dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight sm:leading-tight lg:leading-normal">
                {title}
              </h2>
            </div>

            <p className="dark:text-neutral-100 text-neutral-900 text-sm sm:text-base lg:text-[15px] leading-relaxed sm:leading-6">
              {description}
            </p>
          </motion.div>

          {/* App mockup/Image Content - Mobile optimized */}
          <motion.div
            className={`relative mx-auto ${imageOrderClass} w-full px-4 sm:px-0 max-w-[280px] sm:max-w-[350px] lg:max-w-[471px]`}
          >
            {/* Decorative Background Element - Mobile responsive */}
            <motion.div
              className={`absolute dark:bg-[#090909] bg-neutral-100 rounded-2xl sm:rounded-3xl z-0
                w-[260px] h-[280px] 
                sm:w-[320px] sm:h-[340px] 
                lg:w-[400px] lg:h-[420px] 
                xl:w-[472px] xl:h-[500px]
              `}
              style={{
                top: reverseLayout ? 'auto' : '8%',
                bottom: reverseLayout ? '8%' : 'auto',
                left: reverseLayout ? 'auto' : '-10%',
                right: reverseLayout ? '-10%' : 'auto',
                transform: reverseLayout ? 'translate(0, 0)' : 'translateY(5%)',
                filter: 'blur(1.5px)'
              }}
              initial={{
                y: 0,
                scale: 0.95
              }}
              whileInView={{
                y: reverseLayout ? -15 : -20,
                scale: 1
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                scale: { duration: 0.8 }
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className="relative w-full h-full bg-cover bg-center rounded-2xl sm:rounded-3xl"
                style={{
                  backgroundImage: `url(${secondaryImageSrc})`,
                }}
              />
            </motion.div>

            {/* Main Mockup Card - Mobile responsive sizing */}
            <motion.div
              className={`relative bg-neutral-50 dark:bg-[#ffffff0a] rounded-2xl sm:rounded-3xl backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden
                w-full h-[350px] 
                sm:h-[420px] 
                lg:h-[520px] 
                xl:h-[637px]
              `}
              initial={{
                y: 0,
                scale: 0.9,
                opacity: 0.8
              }}
              whileInView={{
                y: reverseLayout ? 15 : 20,
                scale: 1,
                opacity: 1
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.1,
                scale: { duration: 0.8 },
                opacity: { duration: 0.6 }
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="p-0 h-full">
                <div
                  className="h-full relative rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Primary Image with responsive sizing */}
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url(${primaryImageSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Mobile-specific overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-white dark:bg-black/5 sm:bg-transparent rounded-2xl sm:rounded-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Mobile-specific floating elements for visual enhancement */}
            <motion.div
              className="absolute top-4 right-4 w-3 h-3 bg-black dark:bg-white/20 rounded-full blur-sm sm:hidden"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-8 left-4 w-2 h-2 bg-black dark:bg-white/15 rounded-full blur-sm sm:hidden"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
};

export default SectionWithMockup;