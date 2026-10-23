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

/**
 * Whether a topping can go on this potato now: not served and not already on it. Toppings can go on
 * at any mash stage (playtest 3), so plating can start as soon as a potato enters the belt.
 */
export function canApplyTopping(
    potato: Readonly<{served: boolean} & PotatoToppings>,
    topping: Topping,
): boolean {
    return !potato.served && !potato[topping];
}
