import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

/**
 * HistoryPanel Component
 * Displays recent prompt history with the ability to reuse prompts
 */
const HistoryPanel = ({ history, onUsePrompt }) => {
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-dark-700"
      >
        <div className="text-center">
          <Clock className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No prompt history yet. Start generating images to see your recent prompts here.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-dark-700 dark:to-dark-700 border-b border-gray-200 dark:border-dark-600">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Recent Prompts
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Click any prompt to reuse it
        </p>
      </div>

      {/* History List */}
      <div className="divide-y divide-gray-200 dark:divide-dark-700 max-h-96 overflow-y-auto">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <button
              onClick={() => {
                // Copy prompt to clipboard or trigger input field update
                navigator.clipboard.writeText(item.prompt);
              }}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-200"
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.prompt}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(item.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-5 h-5 text-primary-500" />
                </motion.div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      {history.length >= 10 && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            Showing last 10 prompts
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPanel;
