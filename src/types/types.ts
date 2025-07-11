export interface ExpenseNode {
    id: string;
    name: string;
    amount: number | "";
    category: Category;
}

export enum Category {
    None = "None",
    Food = "Food",
    Bill = "Bill"
};