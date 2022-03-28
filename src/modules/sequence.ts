import {Sequence} from "@/types/custom";
import {Step} from '@/modules/step';

export let sequence: Step[];

function addNote(note: Step){
  sequence.push(note);
}
