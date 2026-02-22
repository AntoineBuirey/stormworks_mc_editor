import { Component } from '../../core/component';
import { NumberSignal, BoolSignal, NumberSignalOrUndef, BoolSignalOrUndef } from '../../core/types';
import { InputRegistry } from '../../core/compiler-context';

/**
 * Configurable dropdown property with custom options and values.
 */
export class PropertyDropdownBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly name: string, public readonly options: { text: string, value: number }[], public readonly defaultValueIndex: number = 0) {
        super('property_dropdown');
        this.attributes.name = name;

        this.properties.items = options.map((opt, index) => ({
            l: opt.text,
            v: { text: opt.value.toString(), value: opt.value }
        }));
        this.attributes.i = defaultValueIndex;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Configurable numeric property with a default value.
 */
export class PropertyNumberBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly name: string, public readonly defaultValue: number = 0) {
        super('property_number');
        this.attributes.n = name;
        this.properties.v = defaultValue; //will be translated to <value text="0" value="0"/> (if defaultValue is 0)
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Configurable slider property with min/max bounds and rounding.
 */
export class PropertySliderBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly name: string,
        public readonly min: number,
        public readonly max: number,
        public readonly rounding: number,
        public readonly defaultValue: number = 0
    ) {
        super('property_slider');
        this.attributes.name = name;
        this.properties.min = min; //will be translated to <min text="0" value="0"/> (if min is 0)
        this.properties.max = max; //will be translated to <max text="1" value="1"/> (if max is 1)
        this.properties.int = rounding; //will be translated to <int text="0" value="0"/> (if rounding is 0)
        this.properties.v = defaultValue; //will be translated to <value text="0" value="0"/> (if defaultValue is 0)
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Display-only text property for labeling or documentation.
 */
export class PropertyTextBlock extends Component {

    constructor(public readonly name: string, public readonly value: string) {
        super('property_text');
        this.attributes.n = name;
        this.attributes.v = value; //will be translated to <value text="default" value="default"/> (if value is "default")
    }
}

/**
 * Configurable toggle property with custom on/off labels.
 */
export class PropertyToggleBlock extends Component {
    public readonly output: BoolSignal;

    constructor(
        public readonly name: string,
        public readonly onLabel: string,
        public readonly offLabel: string,
        public readonly value: boolean = false
    ) {
        super('property_toggle');
        this.attributes.n = name;
        this.attributes.on = onLabel;
        this.attributes.off = offLabel;
        this.attributes.v = value ? 'true' : 'false';

        this.output = new BoolSignal(this.id);
    }
}

/**
 * Display a numeric value in a tooltip with conditional visibility.
 */
export class TooltipNumberBlock extends Component {

    private displayModeMap : Record<string, number> = {
        'Always': 0,
        'If Error': 1,
        'if No Error': 2
    };

    constructor(
        public readonly name: string,
        public readonly display: 'Always' | 'If Error' | 'if No Error',
        public readonly value: NumberSignalOrUndef,
        public readonly error: BoolSignalOrUndef
    ) {
        super('property_tooltip_number');
        this.attributes.l = name;
        this.attributes.m = this.displayModeMap[display];
        InputRegistry.setInputs(this.id, { value, error });
    }
}

/**
 * Display a boolean value in a tooltip with on/off labels and conditional visibility.
 */
export class TooltipOnOffBlock extends Component {

    private displayModeMap : Record<string, number> = {
        'Always': 0,
        'If On': 1,
        'if Off': 2
    };

    constructor(
        public readonly name: string,
        public readonly onLabel: string,
        public readonly offLabel: string,
        public readonly display: 'Always' | 'If On' | 'if Off',
        public readonly value: BoolSignalOrUndef,
    ) {
        super('property_tooltip_bool');
        this.attributes.l = name;
        this.attributes.on = onLabel;
        this.attributes.off = offLabel;
        this.attributes.m = this.displayModeMap[display];
        InputRegistry.setInputs(this.id, { value });
    }
}
