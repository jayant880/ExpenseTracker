import React, { useEffect, useState } from "react"
import type { BudgetNode } from "../../types/index";

interface BudgetViewerProps {
    budget: BudgetNode;
    setBudget: (newBudget: BudgetNode) => void;
    totalExpense: number;
}


const BudgetViewer: React.FC<BudgetViewerProps> = ({ budget, setBudget, totalExpense }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [newBudget, setNewBudget] = useState<BudgetNode>(budget);
    const [remainingBudget, setRemainingBudget] = useState<number>(0);


    function handleEdit(): void {
        setIsEditMode(!isEditMode);
        setNewBudget(budget)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setNewBudget({ ...newBudget, [name]: Number(value) });
    }

    function handleSave(): void {
        if (newBudget.amount < 0) return;
        setBudget(newBudget);
        setIsEditMode(false);
    }

    function handleReset(): void {
        const resetBudget = { amount: 0 }
        setBudget(resetBudget);
        setNewBudget(resetBudget);
    }

    useEffect(() => {
        setRemainingBudget(budget.amount - totalExpense);
    }, [budget, totalExpense]);

    useEffect(() => {
        setNewBudget(budget);
    }, [budget]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between item-center">
                <h3 className="text-lg font-medium text-gray-800">Budget Overview</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={handleEdit}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Reset
                    </button>
                </div>
            </div>
            {isEditMode ? (
                // Edit mode is on
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={newBudget.amount || ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        onClick={handleSave}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Budget:</span>
                        <span className="font-medium">${budget.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Expenses:</span>
                        <span className="font-medium">${totalExpense.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Remaining Budget:</span>
                        <span className={`font-medium ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${remainingBudget.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BudgetViewer