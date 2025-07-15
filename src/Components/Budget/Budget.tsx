import { useEffect, useState } from "react";
import type { BudgetNode } from "../../types/types";

import BudgetForm from "./BudgetForm";
import BudgetViewer from "../Budget/BudgetViewer";
import { loadBudgetFromLocalStorage, saveBudgetToLocalStorage } from "../../utils/localStorage";

function Budget() {
    const [currentBudget, setCurrentBudget] = useState<BudgetNode>(loadBudgetFromLocalStorage);

    function setBudget(newBudget: BudgetNode): void {
        setCurrentBudget(newBudget);
    }

    useEffect(() => {
        saveBudgetToLocalStorage(currentBudget);
    }, [currentBudget])

    return (
        <>
            <BudgetForm setBudget={setBudget} />
            <BudgetViewer budget={currentBudget} setBudget={setBudget} />
        </>
    )
}

export default Budget