import type { ExpenseNode, BudgetNode } from '../types/index';

const expenseListKey = "Expense List";
const budgetKey = "Budget";

export function saveExpensesToLocalStorage(expenseList: ExpenseNode[]): void {
    try{
        const expenseListString = JSON.stringify(expenseList, (key, value) => {
            if(key === 'date' && value instanceof Date) {
                return value.toISOString();
            }
            return value;
        });
        localStorage.setItem(expenseListKey, expenseListString);
    } catch (error) {
        console.error("Failed to save expenses to localStorage", error);
    }
}

export function loadExpenseFromLocalStorage(): ExpenseNode[] {
    try{
        const expenseListString = localStorage.getItem(expenseListKey);
        if(!expenseListString) return [];

        const parsedData = JSON.parse(expenseListString);
        if(!Array.isArray(parsedData)) return [];

        return parsedData.map((expense) => ({
            ...expense,
            date: new Date(expense.date)
        }));
    } catch (error) {
        console.error("Failed to load expenses from localStorage", error);
        return [];
    }
}

export function saveBudgetToLocalStorage(budget :BudgetNode): void {
    try {
        const budgetString = JSON.stringify(budget);
        localStorage.setItem(budgetKey, budgetString);
    } catch (error) {
        console.error('Failed to save Budget to local Storage', error);
    }
}

export function loadBudgetFromLocalStorage(): BudgetNode {
    try{
        const budgetString = localStorage.getItem(budgetKey);
        if(!budgetString) return {amount: 0};

        const parsedData = JSON.parse(budgetString);
        return parsedData && typeof parsedData.amount === 'number' ? parsedData : {amount : 0};
    } catch (error) {
        console.error("Failed to load Budget from localStorage", error);
        return {amount: 0};
    }
}