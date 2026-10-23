/** Toppings the player puts on fully mashed potatoes by hand. */
export enum Topping {
    Butter = 'butter',
    Scallions = 'scallions',
    Cabbage = 'cabbage',
    Gravy = 'gravy',
}

export type ToppingDefinition = {
    topping: Topping;
    label: string;
    /** `KeyboardEvent.key` that selects this topping (lowercase; also accept uppercase). */
    hotkey: string;
    color: string;
};

export const toppingDefinitions: Readonly<Record<Topping, Readonly<ToppingDefinition>>> = {
    [Topping.Butter]: {
        topping: Topping.Butter,
        label: 'Butter',
        hotkey: 'q',
        color: '#ffd84a',
    },
    [Topping.Scallions]: {
        topping: Topping.Scallions,
        label: 'Scallions',
        hotkey: 'w',
        color: '#5cb85c',
    },
    [Topping.Cabbage]: {
        topping: Topping.Cabbage,
        label: 'Cabbage',
        hotkey: 'e',
        color: '#2e7d32',
    },
    [Topping.Gravy]: {
        topping: Topping.Gravy,
        label: 'Gravy',
        hotkey: 'r',
        color: '#7b4a1e',
    },
};

/** Which toppings a potato has. Stored flat on potato params so it stays JSON. */
export type PotatoToppings = Record<Topping, boolean>;

export function createNoToppings(): PotatoToppings {
    return {
        [Topping.Butter]: false,
        [Topping.Scallions]: false,
        [Topping.Cabbage]: false,
        [Topping.Gravy]: false,
    };
}
