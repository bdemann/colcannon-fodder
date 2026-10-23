import {Dish, dishDefinitions} from './dish.js';
import {Topping, type PotatoToppings} from './topping.js';

const allToppings = Object.values(Topping);

/** The toppings on a potato, read from its params (keys match Topping values). */
export function getPotatoToppings(params: Readonly<PotatoToppings>): PotatoToppings {
    return {
        [Topping.Butter]: params[Topping.Butter],
        [Topping.Scallions]: params[Topping.Scallions],
        [Topping.Cabbage]: params[Topping.Cabbage],
        [Topping.Gravy]: params[Topping.Gravy],
    };
}

/** The dish these toppings make exactly, or undefined. No toppings gives undefined. */
export function matchDish(toppings: Readonly<PotatoToppings>): Dish | undefined {
    return Object.values(Dish).find((dish) => {
        const recipe = dishDefinitions[dish].toppings;
        return allToppings.every((topping) => toppings[topping] === recipe.includes(topping));
    });
}

/** Whether a topping can go on this potato now: fully mashed, not served, not already on it. */
export function canApplyTopping(
    potato: Readonly<{mashHp: number; served: boolean} & PotatoToppings>,
    topping: Topping,
): boolean {
    return potato.mashHp <= 0 && !potato.served && !potato[topping];
}
