import { useEffect, useState } from "react"
import type { BudgetNode } from "../../types/types";

interface BudgetViewerProps {
    budget: BudgetNode;
    setBudget: (newBudget: BudgetNode) => void;
    totalExpense: number;
}


function BudgetViewer({ budget, setBudget, totalExpense }: BudgetViewerProps) {
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
        <>
            {isEditMode ? (
                // Edit mode is on
                <>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={newBudget.amount || ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                    <div>Remaining: {budget.amount - totalExpense}</div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <div>Budget: {budget.amount}</div>
                    <div>Remaining: {remainingBudget}</div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleReset}>Reset</button>
                </>
            )}
        </>
    )
}

export default BudgetViewer