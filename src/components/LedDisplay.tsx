import type{Phase}from'../types';
const labels:Record<Phase,string>={idle:'PUSH START',difficultySelect:'SELECT LEVEL',ready:'GET READY',memorize:'MEMORIZE',input:'INPUT NOW',inputSuccess:'SYNTHESIS OK',inputFailure:'BYPRODUCT!',quiz:'WHAT MADE?',quizResult:'ANALYSIS DONE',roundTransition:'NEXT REACTION',gameResult:'COMPLETE'};
export function LedDisplay({phase,sub,tone='orange'}:{phase:Phase;sub?:string;tone?:string}){return <div className={`led ${tone}`} aria-live="polite"><span>{labels[phase]}</span>{sub&&<small>{sub}</small>}</div>}
