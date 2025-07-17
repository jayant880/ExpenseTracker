import React, { useState } from 'react';
import type { BudgetNode } from '../../types/index';

const INTIAL_BUDGET: BudgetNode = {
    amount: 0,
}

const BudgetForm: React.FC<{ setBudget: (budget: BudgetNode) => void }> = ({ setBudget }) => {
    const [newBudget, setNewBudget] = useState<BudgetNode>(INTIAL_BUDGET);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        if (newBudget.amount <= 0) return;
        setBudget(newBudget);
        setNewBudget(INTIAL_BUDGET);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setNewBudget({ ...newBudget, [name]: Number(value) })
    }

    return (
        <form onSubmit={handleSubmit} className='mb-6'>
            <div className="flex flex-col space-y-2">
                <label htmlFor="amount" className='text-sm font-medium text-gray-700'>Set Budget</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newBudget.amount || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Enter Budget amount'
                />
                <button type='submit' className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 foucs:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'>Set Budget</button>
            </div>
        </form>
    )
}

export default BudgetForm