import type { Budget } from "../types/types"

interface BudgetViewerProps {
    budget: Budget
}

function BudgetViewer({ budget }: BudgetViewerProps) {
    return (
        <div>{budget.amount}</div>
    )
}

export default BudgetViewer