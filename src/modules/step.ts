/*import {KeyPitch} from '@/types/custom';*/
export class Step {
  note: string; //TODO convert to index 0-11 and convert table
  accent: boolean;
  slide: boolean;
  octaveUp: boolean;
  octaveDown: boolean;

  constructor(note= 'rest', accent = false, slide = false, octaveUp = false, octaveDown = false) {
    this.note = note;
    this.accent = accent;
    this.slide = slide;
    this.octaveUp = octaveUp;
    this.octaveDown = octaveDown;
  }
}
