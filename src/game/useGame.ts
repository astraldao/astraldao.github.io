import {useCallback,useEffect,useRef,useState} from 'react';
import type {Sound} from '../audio/useSynthAudio';
import {pickQuestions} from '../data/questions';
import type {Difficulty,ElementKey,Phase,Question} from '../types';
import {speedBonus} from './scoring';

export function useGame(play:(sound:Sound)=>void){
  const [phase,setPhase]=useState<Phase>('idle');
  const [difficulty,setDifficulty]=useState<Difficulty>('easy');
  const [round,setRound]=useState(0);
  const [score,setScore]=useState(0);
  const [questionSet,setQuestionSet]=useState<Question[]>([]);
  const [lit,setLit]=useState<ElementKey|null>(null);
  const [inputCount,setInputCount]=useState(0);
  const [lastGain,setLastGain]=useState(0);
  const [quizCorrect,setQuizCorrect]=useState<boolean|null>(null);
  const startedAt=useRef(0);
  const timers=useRef<number[]>([]);
  const phaseRef=useRef<Phase>('idle');
  const inputRef=useRef(0);
  const currentQuestion=questionSet[round];

  const enterPhase=useCallback((next:Phase)=>{phaseRef.current=next;setPhase(next)},[]);
  const clearTimers=useCallback(()=>{timers.current.forEach(clearTimeout);timers.current=[]},[]);
  const wait=useCallback((fn:()=>void,delay:number)=>{const id=window.setTimeout(()=>{timers.current=timers.current.filter(x=>x!==id);fn()},delay);timers.current.push(id)},[]);
  useEffect(()=>clearTimers,[clearTimers]);

  const showSequence=useCallback((question:Question)=>{
    enterPhase('memorize');setInputCount(0);inputRef.current=0;setLit(null);
    let index=0;
    const step=()=>{
      if(index===question.sequence.length){wait(()=>{startedAt.current=performance.now();enterPhase('input')},300);return}
      setLit(question.sequence[index]);play('memory');
      wait(()=>{setLit(null);index+=1;wait(step,250)},550);
    };
    wait(step,450);
  },[enterPhase,play,wait]);

  const start=useCallback(()=>{if(phaseRef.current!=='idle')return;enterPhase('difficultySelect')},[enterPhase]);
  const chooseDifficulty=useCallback((choice:Difficulty)=>{
    if(phaseRef.current!=='difficultySelect')return;
    clearTimers();const selected=pickQuestions(choice);setDifficulty(choice);setQuestionSet(selected);setRound(0);setScore(0);setLastGain(0);setQuizCorrect(null);enterPhase('ready');
    wait(()=>showSequence(selected[0]),700);
  },[clearTimers,enterPhase,showSequence,wait]);

  const press=useCallback((key:ElementKey)=>{
    if(phaseRef.current!=='input'||!currentQuestion)return;
    enterPhase('input');play('press');setLit(key);wait(()=>setLit(null),140);
    const position=inputRef.current;
    if(key!==currentQuestion.sequence[position]){
      enterPhase('inputFailure');setLastGain(0);play('failure');
      wait(()=>showSequence(currentQuestion),1050);return;
    }
    const next=position+1;inputRef.current=next;setInputCount(next);
    if(next===currentQuestion.sequence.length){
      const gain=100+speedBonus(performance.now()-startedAt.current);setLastGain(gain);setScore(value=>value+gain);enterPhase('inputSuccess');play('success');
      wait(()=>enterPhase('quiz'),950);
    }
  },[currentQuestion,enterPhase,play,showSequence,wait]);

  const answer=useCallback((index:number)=>{
    if(phaseRef.current!=='quiz'||!currentQuestion)return;
    const correct=index===currentQuestion.answerIndex;setQuizCorrect(correct);setLastGain(value=>value+(correct?100:0));
    if(correct)setScore(value=>value+100);enterPhase('quizResult');play(correct?'correct':'failure');
    wait(()=>{
      if(round===2){enterPhase('gameResult');play('result');return}
      enterPhase('roundTransition');
      wait(()=>{const next=round+1;setRound(next);setQuizCorrect(null);showSequence(questionSet[next])},700);
    },1250);
  },[currentQuestion,enterPhase,play,questionSet,round,showSequence,wait]);

  const reset=useCallback(()=>{
    if(phaseRef.current!=='gameResult')return;clearTimers();setQuestionSet([]);setRound(0);setScore(0);setLit(null);setInputCount(0);inputRef.current=0;setLastGain(0);setQuizCorrect(null);enterPhase('idle');
  },[clearTimers,enterPhase]);

  return{phase,difficulty,round,score,q:currentQuestion,lit,inputCount,lastGain,quizCorrect,start,chooseDifficulty,press,answer,reset};
}
