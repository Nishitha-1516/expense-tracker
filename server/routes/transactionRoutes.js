const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  addIncome, getIncomes, deleteIncome,
  addExpense, getExpenses, deleteExpense,
  exportTransactions,
  getAnalytics
} = require('../controllers/transactionController');

const router = express.Router();

router.route('/incomes').post(protect, addIncome).get(protect, getIncomes);
router.route('/incomes/:id').delete(protect, deleteIncome);

router.route('/expenses').post(protect, addExpense).get(protect, getExpenses);
router.route('/expenses/:id').delete(protect, deleteExpense);

router.route('/export').get(protect, exportTransactions);

router.route('/analytics').get(protect, getAnalytics);

module.exports = router;