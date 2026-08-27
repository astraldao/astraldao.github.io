export type ElementKey='H'|'O'|'C'|'N'|'Cl'|'Na'|'heat'|'light'|'catalyst';
export type Difficulty='easy'|'normal';
export type Phase='idle'|'difficultySelect'|'ready'|'memorize'|'input'|'inputSuccess'|'inputFailure'|'quiz'|'quizResult'|'roundTransition'|'gameResult';
export type Product={name:string;formula:string};
export type Question={id:string;difficulty:Difficulty;sequence:ElementKey[];product:Product;choices:Product[];answerIndex:number};
