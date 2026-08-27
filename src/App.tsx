import {useEffect} from 'react';
import {useSynthAudio} from './audio/useSynthAudio';
import {ControlPad,Quiz} from './components/ControlPad';
import {LedDisplay} from './components/LedDisplay';
import {useGame} from './game/useGame';
import {rankFor} from './game/scoring';
import type {ElementKey} from './types';
import './styles.css';

const keyboardControls:ElementKey[]=['H','O','C','N','Cl','Na','heat','light','catalyst'];

export default function App(){
  const audio=useSynthAudio();const game=useGame(audio.play);const rank=rankFor(game.score);
  useEffect(()=>{const keydown=(event:KeyboardEvent)=>{
    if(event.repeat)return;
    if(event.key>='1'&&event.key<='9')game.press(keyboardControls[Number(event.key)-1]);
    if(game.phase==='quiz'&&['a','b','c'].includes(event.key.toLowerCase()))game.answer(event.key.toLowerCase().charCodeAt(0)-97);
    if(event.key==='Enter')game.start();
  };window.addEventListener('keydown',keydown);return()=>window.removeEventListener('keydown',keydown)},[game]);
  const tone=game.phase==='inputFailure'||(game.phase==='quizResult'&&!game.quizCorrect)?'red':game.phase==='inputSuccess'||(game.phase==='quizResult'&&!!game.quizCorrect)?'green':'amber';
  const sub=game.phase==='input'?`${game.inputCount} / ${game.q?.sequence.length}`:game.phase==='quizResult'?(game.quizCorrect?`CORRECT  +${game.lastGain}`:'MISS  +'+game.lastGain):game.phase==='roundTransition'?`SCORE ${String(game.score).padStart(3,'0')}`:undefined;
  return <main>
    <header><div><p>CHEMISTRY MEMORY SYNTHESIZER <em>CMS–03</em></p><h1>分子合成メモリズム</h1><h2>光る元素を覚えて、できた分子を当てろ！</h2></div><button className="mute" onClick={audio.toggleMute} aria-pressed={audio.muted}><span aria-hidden="true">{audio.muted?'×':'●'}</span>{audio.muted?' SOUND OFF':' SOUND ON'}</button></header>
    <section className="machine" aria-label="分子合成装置">
      <i className="screw screw-a"/><i className="screw screw-b"/><i className="screw screw-c"/><i className="screw screw-d"/>
      <div className="status-strip"><b>REACTION CONTROL</b><span className={game.phase!=='idle'?'active':''}/><small>{game.phase==='idle'?'STANDBY':'SYSTEM ACTIVE'}</small><em>UNIT E–03</em></div>
      <LedDisplay phase={game.phase} sub={sub} tone={tone} text={game.phase==='quizResult'?(game.quizCorrect?'CORRECT':'MISS'):undefined}/>
      <div className="work-area">
        <ControlPad phase={game.phase} lit={game.lit} onPress={game.press}/>
        {game.phase==='quiz'&&game.q&&<Quiz choices={game.q.choices} onAnswer={game.answer}/>}
      </div>
      {game.phase==='difficultySelect'&&<div className="overlay level"><p>SELECT REACTION LEVEL</p><h3>反応レベルを選択</h3><div><button onClick={()=>game.chooseDifficulty('easy')}><strong>EASY</strong><span>2〜3手・元素のみ</span></button><button onClick={()=>game.chooseDifficulty('normal')}><strong>NORMAL</strong><span>3〜5手・反応条件あり</span></button></div></div>}
      {game.phase==='gameResult'&&<div className="overlay result"><p>REACTION COMPLETE</p><h3>FINAL SCORE</h3><strong>{String(game.score).padStart(3,'0')}<small> / 750</small></strong><div>RANK <b>{rank[0]}</b></div><span>{rank[1]}</span><button onClick={game.reset}>↻ RESTART</button></div>}
      <div className="console-bottom"><div className="meter"><label>SCORE</label><strong>{String(game.score).padStart(3,'0')}</strong></div><button className="start" disabled={game.phase!=='idle'} onClick={game.start}><i/>START<small>PRESS ENTER</small></button><div className="meter"><label>REACTION</label><strong>{Math.min(game.round+1,3)}<small> / 3</small></strong></div></div>
    </section>
    <aside><b>HOW TO PLAY / 遊び方</b><p>光った元素や反応条件の順番を覚えて押し、その組み合わせからできる物質を当てます。化学を知らなくても遊べます。分子式を知っている人は少し有利です。</p></aside>
    <footer>このゲームは化学反応をわかりやすく単純化したものです。実際の実験手順や反応条件を正確に再現するものではありません。</footer>
  </main>;
}
