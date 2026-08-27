import type {Difficulty,Product,Question} from '../types';
const p=(name:string,formula:string):Product=>({name,formula});
const water=p('水','H₂O'), salt=p('食塩','NaCl'), carbon=p('二酸化炭素','CO₂'), ammonia=p('アンモニア','NH₃'), hcl=p('塩化水素','HCl'), methane=p('メタン','CH₄'), no2=p('二酸化窒素','NO₂');
const choices=(answer:Product,...others:Product[])=>[answer,...others];
export const questions:Question[]=[
 {id:'water',difficulty:'easy',sequence:['H','O','H'],product:water,choices:choices(water,carbon,salt),answerIndex:0},
 {id:'salt',difficulty:'easy',sequence:['Na','Cl'],product:salt,choices:choices(salt,hcl,water),answerIndex:0},
 {id:'carbon',difficulty:'easy',sequence:['O','C','O'],product:carbon,choices:choices(carbon,no2,water),answerIndex:0},
 {id:'hcl',difficulty:'easy',sequence:['H','Cl'],product:hcl,choices:choices(hcl,salt,methane),answerIndex:0},
 {id:'ammonia',difficulty:'normal',sequence:['H','N','H','H'],product:ammonia,choices:choices(ammonia,methane,water),answerIndex:0},
 {id:'methane',difficulty:'normal',sequence:['H','C','H','H','H'],product:methane,choices:choices(methane,ammonia,hcl),answerIndex:0},
 {id:'nitrogen-dioxide',difficulty:'normal',sequence:['O','N','O'],product:no2,choices:choices(no2,carbon,water),answerIndex:0},
 {id:'heated-carbon',difficulty:'normal',sequence:['C','O','O','heat'],product:carbon,choices:choices(carbon,no2,salt),answerIndex:0},
];
export const pickQuestions=(difficulty:Difficulty,rng=Math.random)=>questions
 .filter(q=>q.difficulty===difficulty).map(q=>({q,sort:rng()})).sort((a,b)=>a.sort-b.sort).slice(0,3)
 .map(({q})=>{const shuffled=q.choices.map(choice=>({choice,sort:rng()})).sort((a,b)=>a.sort-b.sort).map(x=>x.choice);return{...q,choices:shuffled,answerIndex:shuffled.findIndex(x=>x.formula===q.product.formula)}});
