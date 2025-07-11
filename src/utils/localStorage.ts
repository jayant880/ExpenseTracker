import type { ExpenseNode } from '../types/types';

const localStorageKey = "Expense List";

export function saveToLocalStorage(expenseList: ExpenseNode[]): void {
    try{
        const expenseListString = JSON.stringify(expenseList);
        localStorage.setItem(localStorageKey, expenseListString);
    } catch (error) {
        console.error("Failed to save expenses to local Storage", error);
    }
}

export function loadFromLocalStorage(): ExpenseNode[] {
    try{
        const expenseListString = localStorage.getItem(localStorageKey);
        if(!expenseListString) return [];

        const parsedData = JSON.parse(expenseListString);
        return Array.isArray(parsedData) ? parsedData : [] 
    } catch (error) {
        console.error("Failed to load expenses from localStorage", error);
        return [];
    }
}