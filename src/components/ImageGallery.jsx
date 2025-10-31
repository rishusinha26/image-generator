import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCard from './ImageCard';
import { Grid3x3, Grid2x2, LayoutGrid } from 'lucide-react';

/**
 * ImageGallery Component
 * Displays a responsive grid of generated images
 */
const ImageGallery = ({ images, onToggleFavorite, onDownload, onCopyPrompt }) => {
  const [gridSize, setGridSize] = useState('medium'); // small, medium, large

  const gridClasses = {
    small: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    medium: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    large: 'grid-cols-1 sm:grid-cols-2',
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Your Creations
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {images.length} {images.length === 1 ? 'image' : 'images'} generated
          </p>
        </div>

        {/* Grid Size Controls */}
        <div className="flex items-center space-x-2 bg-white dark:bg-dark-800 rounded-lg p-1 shadow-md border border-gray-200 dark:border-dark-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGridSize('small')}
            className={`p-2 rounded-md transition-all duration-200 ${
              gridSize === 'small'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
            }`}
            aria-label="Small grid"
          >
            <Grid3x3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGridSize('medium')}
            className={`p-2 rounded-md transition-all duration-200 ${
              gridSize === 'medium'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
            }`}
            aria-label="Medium grid"
          >
            <Grid2x2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGridSize('large')}
            className={`p-2 rounded-md transition-all duration-200 ${
              gridSize === 'large'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
            }`}
            aria-label="Large grid"
          >
            <LayoutGrid className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Image Grid */}
      <motion.div
        layout
        className={`grid ${gridClasses[gridSize]} gap-6`}
      >
        <AnimatePresence mode="popLayout">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onToggleFavorite={onToggleFavorite}
              onDownload={onDownload}
              onCopyPrompt={onCopyPrompt}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ImageGallery;
