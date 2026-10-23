import {Topping} from './topping.js';

/** Dishes customers order. A potato fills an order when its toppings match the recipe exactly. */
export enum Dish {
    ButteredMash = 'buttered-mash',
    Champ = 'champ',
    Colcannon = 'colcannon',
    BangersAndMash = 'bangers-and-mash',
}

export type DishDefinition = {
    dish: Dish;
    label: string;
    /** Exactly these toppings, no more, no fewer. */
    toppings: ReadonlyArray<Topping>;
};

export const dishDefinitions: Readonly<Record<Dish, Readonly<DishDefinition>>> = {
    [Dish.ButteredMash]: {
        dish: Dish.ButteredMash,
        label: 'Buttered Mash',
        toppings: [
            Topping.Butter,
        ],
    },
    [Dish.Champ]: {
        dish: Dish.Champ,
        label: 'Champ',
        toppings: [
            Topping.Scallions,
            Topping.Butter,
        ],
    },
    [Dish.Colcannon]: {
        dish: Dish.Colcannon,
        label: 'Colcannon',
        toppings: [
            Topping.Cabbage,
            Topping.Butter,
        ],
    },
    [Dish.BangersAndMash]: {
        dish: Dish.BangersAndMash,
        label: 'Bangers & Mash',
        toppings: [
            Topping.Gravy,
        ],
    },
};
