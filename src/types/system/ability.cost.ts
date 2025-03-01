import { AbilityResources } from "./ability.resource";

export default class AbilityCost {

    /**
     *
     */
    constructor(json: string) {        
        const {amount, unit, resource} = JSON.parse(json);
        this.amount = amount;
        this.unit = unit;
        this.resource = resource;
    }
    
    toString() {
        return `${this.amount}${this.unit}${this.resource}`;
    }

    declare amount: number;
    /**
     * Always assign using AbilityUnits static class.
     * ie: ability.unity = AbilityUnits.percent;
     */
    declare unit: string; // points or % of Base
    /**
     * Always assign using AbilityResource static class.
     * ie: ability.unity = AbilityUnits.percent;
     */
    declare resource: string;    
}
