import { writable } from "svelte/store";
export const plate = writable([
    {row:'A',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
    {row:'B',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
    {row:'C',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
    {row:'D',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
    {row:'E',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
    {row:'F',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
    {row:'G',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'' },
    {row:'H',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'' },
])
export function setNull(){
    plate.update(n=> n =[
        {row:'A',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
        {row:'B',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
        {row:'C',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
        {row:'D',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
        {row:'E',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
        {row:'F',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'0000' },
        {row:'G',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'' },
        {row:'H',c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'0000',c8:'0000',c9:'0000',c10:'0000',c11:'0000',c12:'' },
    ] )
}
export const sampData = writable([])
