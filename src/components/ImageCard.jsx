import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Download, Copy, Check } from 'lucide-react';

/**
 * ImageCard Component
 * Displays a single generated image with hover effects and action buttons
 */
const ImageCard = ({ image, onToggleFavorite, onDownload, onCopyPrompt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopy = () => {
    onCopyPrompt(image.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 shadow-card hover:shadow-card-hover transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-dark-900">
          {/* Loading Shimmer */}
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer-effect bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          )}

          {/* Image */}
          <motion.img
            src={image.url}
            alt={image.prompt}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              >
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleFavorite(image.id)}
                    className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                      image.isFavorite
                        ? 'bg-red-500 text-white shadow-glow'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={image.isFavorite ? 'currentColor' : 'none'}
                    />
                  </motion.button>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDownload(image.url, image.prompt)}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
                    aria-label="Download image"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>

                  {/* Copy Prompt Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
                    aria-label="Copy prompt"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                {/* Prompt Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white text-sm font-medium line-clamp-3"
                  >
                    {image.prompt}
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-white/70 text-xs mt-2"
                  >
                    {new Date(image.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Info Bar (Always Visible) */}
        <div className="p-4 border-t border-gray-100 dark:border-dark-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {image.prompt}
          </p>
        </div>
      </div>

      {/* Favorite Badge */}
      {image.isFavorite && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -left-2 bg-red-500 text-white p-2 rounded-full shadow-lg z-10"
        >
          <Heart className="w-4 h-4" fill="currentColor" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageCard;
