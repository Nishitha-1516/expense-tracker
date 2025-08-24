const Income = require('../models/Income');
const Expense = require('../models/Expense');
const exceljs = require('exceljs');

// --- Income Controllers ---

exports.addIncome = async (req, res) => {
  const { title, amount, date, source } = req.body;
  const income = new Income({ title, amount, date, source, user: req.user._id });
  try {
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ message: 'Error adding income', error });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const { startDate, endDate, sort = 'date_desc' } = req.query;

    const query = { user: req.user._id };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    let sortOption = {};
    if (sort === 'date_desc') sortOption.date = -1;
    if (sort === 'date_asc') sortOption.date = 1;
    if (sort === 'amount_desc') sortOption.amount = -1;
    if (sort === 'amount_asc') sortOption.amount = 1;

    const incomes = await Income.find(query).sort(sortOption);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.status(200).json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- Expense Controllers ---

exports.addExpense = async (req, res) => {
  const { title, amount, date, category } = req.body;
  const expense = new Expense({ title, amount, date, category, user: req.user._id });
  try {
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Error adding expense', error });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category, sort = 'date_desc' } = req.query;
    
    const query = { user: req.user._id };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (category) {
        query.category = category;
    }

    let sortOption = {};
    if (sort === 'date_desc') sortOption.date = -1;
    if (sort === 'date_asc') sortOption.date = 1;
    if (sort === 'amount_desc') sortOption.amount = -1;
    if (sort === 'amount_asc') sortOption.amount = 1;

    const expenses = await Expense.find(query).sort(sortOption);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- Analytics Controller ---

exports.getAnalytics = async (req, res) => {
    try {
        // Expense breakdown by category
        const expenseByCategory = await Expense.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' },
                },
            },
            { $sort: { totalAmount: -1 } },
        ]);
        
        res.status(200).json({ expenseByCategory });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- Export Controller ---

exports.exportTransactions = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user._id }).sort({ date: 'asc' });
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: 'asc' });

        const workbook = new exceljs.Workbook();
        const incomeSheet = workbook.addWorksheet('Incomes');
        const expenseSheet = workbook.addWorksheet('Expenses');

        incomeSheet.columns = [
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Source', key: 'source', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 15 },
        ];
        
        expenseSheet.columns = [
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 15 },
        ];

        incomes.forEach(income => {
            incomeSheet.addRow({
                ...income._doc,
                date: income.date.toLocaleDateString()
            });
        });
        
        expenses.forEach(expense => {
            expenseSheet.addRow({
                ...expense._doc,
                date: expense.date.toLocaleDateString()
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'transactions.xlsx'
        );

        await workbook.xlsx.write(res);
        res.status(200).end();

    } catch (error) {
        res.status(500).json({ message: 'Failed to export data', error });
    }
};