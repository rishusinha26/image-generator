import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import PromptInput from './components/PromptInput';
import ImageGallery from './components/ImageGallery';
import HistoryPanel from './components/HistoryPanel';
import LoadingAnimation from './components/LoadingAnimation';

function App() {
  // Theme state
  const [theme, setTheme] = useState('dark');
  
  // Application state
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Handle image generation (simulated)
  const handleGenerate = async (prompt) => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Add to history
    const historyEntry = {
      id: Date.now(),
      prompt,
      timestamp: new Date().toISOString(),
    };
    setPromptHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock images (in production, this would be API response)
      const newImages = Array.from({ length: 4 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        prompt,
        url: `https://picsum.photos/seed/${Date.now()}-${i}/512/512`,
        timestamp: new Date().toISOString(),
        isFavorite: false,
      }));

      setImages(prev => [...newImages, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  // Toggle favorite
  const toggleFavorite = (imageId) => {
    setImages(prev =>
      prev.map(img =>
        img.id === imageId ? { ...img, isFavorite: !img.isFavorite } : img
      )
    );

    const image = images.find(img => img.id === imageId);
    if (image) {
      if (image.isFavorite) {
        setFavorites(prev => prev.filter(fav => fav.id !== imageId));
      } else {
        setFavorites(prev => [...prev, { ...image, isFavorite: true }]);
      }
    }
  };

  // Download image
  const handleDownload = async (imageUrl, prompt) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `filterverse-${prompt.slice(0, 30)}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Copy prompt to clipboard
  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    // You could add a toast notification here
  };

  // Use prompt from history
  const handleUsePrompt = (prompt) => {
    // This will be passed to PromptInput component
    return prompt;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800 transition-colors duration-300">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
              Create Stunning AI Art
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your imagination into reality with our advanced AI image generator.
              Explore infinite possibilities across every artistic style.
            </p>
          </motion.div>

          {/* Prompt Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PromptInput
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              onToggleHistory={() => setShowHistory(!showHistory)}
              showHistory={showHistory}
            />
          </motion.div>

          {/* Loading Animation */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="my-12"
              >
                <LoadingAnimation />
              </motion.div>
            )}
          </AnimatePresence>

          {/* History Panel */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="my-8"
              >
                <HistoryPanel
                  history={promptHistory}
                  onUsePrompt={handleUsePrompt}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <ImageGallery
              images={images}
              onToggleFavorite={toggleFavorite}
              onDownload={handleDownload}
              onCopyPrompt={handleCopyPrompt}
            />
          </motion.div>

          {/* Empty State */}
          {images.length === 0 && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 bg-white/50 dark:bg-dark-800/50 rounded-full mb-6">
                <svg
                  className="w-16 h-16 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                No images yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start by entering a prompt above to generate your first AI masterpiece
              </p>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2024 Filterverse. Powered by cutting-edge AI technology.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
