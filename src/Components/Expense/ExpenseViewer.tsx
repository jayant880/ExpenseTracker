import { useEffect, useState } from "react";
import type { ExpenseNode } from "../../types/index"
import ExpenseRow from "./ExpenseRow"
import { endOfMonth, endOfWeek, isWithinInterval, startOfMonth, startOfWeek } from "date-fns";

interface ExpenseViewerProps {
    expenseList: ExpenseNode[];
    updateExpense: (editedxpesnse: ExpenseNode) => void;
    deleteExpense: (id: string) => void;
    setTotalExpense: (totalExpense: number) => void;
}

function ExpenseViewer({ expenseList, updateExpense, deleteExpense, setTotalExpense }: ExpenseViewerProps) {
    const [dateFilter, setDateFilter] = useState<"all" | "week" | "month">("all");
    const [total, setTotal] = useState<number>(0)

    const filteredExpensesList = expenseList.filter(expense => {
        const now = new Date();
        if (dateFilter === 'all') return true;
        if (dateFilter === 'week') return isWithinInterval(expense.date, {
            start: startOfWeek(now),
            end: endOfWeek(now)
        });
        if (dateFilter === 'month') return isWithinInterval(expense.date, {
            start: startOfMonth(now),
            end: endOfMonth(now)
        });
        return true;
    })

    useEffect(() => {
        const expenseListTotal = filteredExpensesList.reduce((sum, expense) => {
            return sum + Number(expense.amount);
        }, 0);
        setTotal(expenseListTotal);
        setTotalExpense(expenseListTotal)
    }, [filteredExpensesList, setTotalExpense]);

    return (
        <div className="overflow-x-auto">
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => setDateFilter("all")}
                    className={`px-3 py-1 rounded-md ${dateFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setDateFilter("week")}
                    className={`px-3 py-1 rounded-md ${dateFilter === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    This Week
                </button>
                <button
                    onClick={() => setDateFilter("month")}
                    className={`px-3 py-1 rounded-md ${dateFilter === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    This Month
                </button>
            </div>

            {filteredExpensesList.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No expenses found</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredExpensesList.map((expense: ExpenseNode) => (
                            <ExpenseRow
                                key={expense.id}
                                expense={expense}
                                updateExpense={updateExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </tbody>
                    {total > 0 && (
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td className="px-4 py-3 font-medium">Total:</td>
                                <td className="px-4 py-3 font-medium">${total.toFixed(2)}</td>
                                <td className="px-4 py-3"></td>
                                <td className="px-4 py-3"></td>
                                <td className="px-4 py-3"></td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            )}

        </div>
    );
}

export default ExpenseViewer;