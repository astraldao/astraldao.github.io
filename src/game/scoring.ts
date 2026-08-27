export const speedBonus=(milliseconds:number)=>Math.max(0,Math.min(50,Math.round(50-(milliseconds-1200)/120)));
export const rankFor=(score:number)=>score>=700?['S','完全合成マスター']:score>=580?['A','安定反応タイプ']:score>=430?['B','触媒があれば伸びるタイプ']:score>=250?['C','副生成物多めタイプ']:['D','実験ノートを見直そう'];
