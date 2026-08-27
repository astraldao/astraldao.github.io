import type {Phase} from '../types';
const labels:Record<Phase,string>={idle:'PUSH START',difficultySelect:'SELECT LEVEL',ready:'GET READY',memorize:'MEMORIZE',input:'INPUT NOW',inputSuccess:'SYNTHESIS OK',inputFailure:'BYPRODUCT!',quiz:'WHAT MADE?',quizResult:'ANALYSIS',roundTransition:'NEXT REACTION',gameResult:'COMPLETE'};
export function LedDisplay({phase,sub,tone='amber',text}:{phase:Phase;sub?:string;tone?:'amber'|'red'|'green';text?:string}){
  return <div className={`led led--${tone}`} role="status" aria-live="polite"><div className="led-grid" aria-hidden="true"/><span>{text??labels[phase]}</span>{sub&&<small>{sub}</small>}</div>;
}
