import type {ElementKey,Phase,Product} from '../types';

const controls:{key:ElementKey;symbol:string;name:string;hotkey:string}[]=[
  {key:'H',symbol:'H',name:'水素',hotkey:'1'},{key:'O',symbol:'O',name:'酸素',hotkey:'2'},{key:'C',symbol:'C',name:'炭素',hotkey:'3'},
  {key:'N',symbol:'N',name:'窒素',hotkey:'4'},{key:'Cl',symbol:'Cl',name:'塩素',hotkey:'5'},{key:'Na',symbol:'Na',name:'ナトリウム',hotkey:'6'},
  {key:'heat',symbol:'熱',name:'HEAT',hotkey:'7'},{key:'light',symbol:'光',name:'LIGHT',hotkey:'8'},{key:'catalyst',symbol:'触媒',name:'CATALYST',hotkey:'9'},
];

export function ControlPad({phase,lit,onPress}:{phase:Phase;lit:ElementKey|null;onPress:(key:ElementKey)=>void}){
  return <div className="pad" aria-label="元素・反応条件 操作盤">{controls.map(control=><button
    type="button" key={control.key} data-key={control.key} disabled={phase!=='input'} onClick={()=>onPress(control.key)}
    className={`chem-button ${control.key===lit?'is-lit':''}`} aria-label={`${control.name}、キー ${control.hotkey}`} aria-pressed={control.key===lit}>
    <kbd>{control.hotkey}</kbd><strong>{control.symbol}</strong><span>{control.name}</span><i aria-hidden="true" />
  </button>)}</div>;
}

export function Quiz({choices,onAnswer}:{choices:Product[];onAnswer:(index:number)=>void}){
  return <div className="quiz" aria-label="生成物の選択肢">{choices.map((choice,index)=><button type="button" key={`${choice.formula}-${index}`} onClick={()=>onAnswer(index)}>
    <b>{'ABC'[index]}</b><span>{choice.name}</span><strong>{choice.formula}</strong><small>{'ABC'[index]} キー</small>
  </button>)}</div>;
}
