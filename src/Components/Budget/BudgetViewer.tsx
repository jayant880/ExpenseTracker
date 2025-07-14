import { useState } from "react"
import type { Budget } from "../../types/types";

interface BudgetViewerProps {
    budget: Budget;
    setBudget(newBudget: Budget): void;
}


function BudgetViewer({ budget, setBudget }: BudgetViewerProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [newBudget, setNewBudget] = useState<Budget>(budget);


    function handleEdit(): void {
        setIsEditMode(!isEditMode);
        setNewBudget(budget)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setNewBudget({ ...newBudget, [name]: value });
    }

    function handleSave(): void {
        setBudget(newBudget);
        setIsEditMode(false);
    }

    function handleReset(): void {
        setBudget({ amount: 0 });
        setNewBudget({ amount: 0 })
    }

    return (
        <>
            {isEditMode ? (
                // Edit mode is on
                <>
                    <input type="number" id="amount" name="amount" value={newBudget.amount} onChange={handleChange} />
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <div>{budget.amount}</div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleReset}>Reset</button>
                </>
            )}
        </>
    )
}

export default BudgetViewer