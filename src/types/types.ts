export interface ExpenseNode {
    name: string;
    amount: number | "";
    category: Category;
}

export enum Category {
    None = "None",
    Food = "Food",
    Bill = "Bill"
};