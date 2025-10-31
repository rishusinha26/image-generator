import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, History } from 'lucide-react';

/**
 * PromptInput Component
 * Handles user input for image generation prompts
 */
const PromptInput = ({ onGenerate, isGenerating, onToggleHistory, showHistory }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
    }
  };

  const examplePrompts = [
    "A futuristic city at sunset with flying cars",
    "Mystical forest with glowing mushrooms",
    "Cyberpunk samurai in neon-lit Tokyo",
    "Ethereal underwater palace with bioluminescence",
  ];

  const handleExampleClick = (example) => {
    setPrompt(example);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
        
        <div className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-dark-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text Input */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision... (e.g., 'A majestic dragon flying over mountains at sunset')"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-dark-900 border-2 border-gray-200 dark:border-dark-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                rows="4"
                disabled={isGenerating}
              />
              
              {/* Character count */}
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                {prompt.length} / 500
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Generate Button */}
              <motion.button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Images</span>
                  </>
                )}
              </motion.button>

              {/* History Toggle Button */}
              <motion.button
                type="button"
                onClick={onToggleHistory}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  showHistory
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
              </motion.button>
            </div>
          </form>

          {/* Example Prompts */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
              ✨ Try these examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-dark-700 dark:to-dark-600 text-primary-700 dark:text-primary-300 text-sm rounded-lg hover:shadow-md transition-all duration-200 border border-primary-200 dark:border-dark-600"
                  disabled={isGenerating}
                >
                  {example}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromptInput;
