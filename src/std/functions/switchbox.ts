import * as blocks from "../blocks/switchbox";
import { NumberSignal, BoolSignal, CompositeSignal, VideoSignal, AudioSignal, HasSwitchBoxType } from '../../core/types';

export function SwitchBox<T extends HasSwitchBoxType>(
    onValue: T,
    offValue: T,
    switchSignal: BoolSignal
): T {
    switch (onValue.type) {
        case 'Audio':
            return new blocks.AudioSwitchboxBlock(onValue as AudioSignal, offValue as AudioSignal, switchSignal).output as T;
        case 'Composite':
            return new blocks.CompositeSwitchboxBlock(onValue as CompositeSignal, offValue as CompositeSignal, switchSignal).output as T;
        case 'Video':
            return new blocks.VideoSwitchboxBlock(onValue as VideoSignal, offValue as VideoSignal, switchSignal).output as T;
        case 'Number':
            return new blocks.NumericalSwitchBoxBlock(onValue as NumberSignal, offValue as NumberSignal, switchSignal).output as T;
    }
}