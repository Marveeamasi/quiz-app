import { motion } from 'framer-motion';

export default function FeedbackModal({ isCorrect }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg text-center"
        >
          <p className={`text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? 'Correct! 🎉' : 'Incorrect! ❌'}
          </p>
        </motion.div>
      </motion.div>
    );
  }