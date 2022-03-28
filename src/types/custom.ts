/* export interface Note {
    pitch: number,
    octave: number,
    keyName: string
} */
import {Step} from "@/modules/step";
export interface Keyboard {
    octave: Octave[]
}

export interface Octave {
    pitches: KeyPitch[]
}

export interface KeyPitch {
    keyName: string,
    pitch: number
}

/*export interface Step {
    pitch: KeyPitch,
    accent: boolean,
    slide: boolean,
}*/

export interface Sequence{
    sequence: Step[]
}
