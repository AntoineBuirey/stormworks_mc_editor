import { Component } from '../../core/component';
import { NumberSignal, BoolSignal, CompositeSignal, VideoSignal, AudioSignal } from '../../core/types';


/**
 * Select between two audio inputs based on a switch signal.
 */
export class AudioSwitchboxBlock extends Component {
    public readonly output: AudioSignal;

    constructor(public readonly onInput: AudioSignal, public readonly offInput: AudioSignal, public readonly switchSignal: BoolSignal) {
        super(1, 'composite_audio_switchbox', { onInput, offInput, switchSignal });
        this.output = new AudioSignal(this.id);
    }
}

/**
 * Select between two composite inputs based on a switch signal.
 */
export class CompositeSwitchboxBlock extends Component {
    public readonly output: CompositeSignal;

    constructor(public readonly onInput: CompositeSignal, public readonly offInput: CompositeSignal, public readonly switchSignal: BoolSignal) {
        super(1, 'composite_switchbox', { onInput, offInput, switchSignal });
        this.output = new CompositeSignal(this.id);
    }
}

/**
 * Select between two video inputs based on a switch signal.
 */
export class VideoSwitchboxBlock extends Component {
    public readonly output: VideoSignal;

    constructor(public readonly onInput: VideoSignal, public readonly offInput: VideoSignal, public readonly switchSignal: BoolSignal) {
        super(1, 'composite_video_switchbox', { onInput, offInput, switchSignal });
        this.output = new VideoSignal(this.id);
    }
}

/**
 * Select between on/off values based on a switch signal.
 */
export class NumericalSwitchBoxBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly onValue: NumberSignal, public readonly offValue: NumberSignal, public readonly switchSignal: BoolSignal) {
        super(1, 'control_num_switchbox', { onValue, offValue, switchSignal });
        this.output = new NumberSignal(this.id);
    }
}
