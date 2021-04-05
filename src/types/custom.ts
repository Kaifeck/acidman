/* export interface Note {
    pitch: number,
    octave: number,
    keyName: string
} */

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