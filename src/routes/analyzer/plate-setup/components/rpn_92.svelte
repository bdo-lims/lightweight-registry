<script>
    let hover =''
    import { plate  } from "./store-rpn92";
    import { selectedField ,orderMap } from "../store.js";
    function zer0(num) {
        return String(num).padStart(4, '0');
    }
   export let firstNum = '' 
    $: $plate[0].c1 = zer0(firstNum)
    

    // $: if($plate[0].c1 == '0000'){ setNull()}
    
    // $: if($plate[0].c7 == '0000'){ setNull()}
    

    $: if($plate[0].c1 != '0000'){
        for(let i = 0; i < $plate.length; i++){
              
            $plate[0].c2 = zer0(parseInt($plate[0].c1)+8)  
            $plate[0].c3 = zer0(parseInt($plate[0].c2)+8)  
            $plate[0].c4 = zer0(parseInt($plate[0].c3)+8)  
            $plate[0].c5 = zer0(parseInt($plate[0].c4)+8)  
            $plate[0].c6 = zer0(parseInt($plate[0].c5)+8)  
            $plate[0].c7 = zer0(parseInt($plate[0].c6)+8)  
            $plate[0].c8 = zer0(parseInt($plate[0].c7)+8)  
            $plate[0].c9 = zer0(parseInt($plate[0].c8)+8)  
            $plate[0].c10 = zer0(parseInt($plate[0].c9)+8)  
            $plate[0].c11 = zer0(parseInt($plate[0].c10)+8)  
            $plate[0].c12 = zer0(parseInt($plate[0].c11)+8)
            
             if(i > 0){  
                $plate[i].c1 = zer0(parseInt($plate[i-1].c1)+1)
                $plate[i].c2 = zer0(parseInt($plate[i-1].c2)+1)
                $plate[i].c3 = zer0(parseInt($plate[i-1].c3)+1)
                $plate[i].c4 = zer0(parseInt($plate[i-1].c4)+1)
                $plate[i].c5 = zer0(parseInt($plate[i-1].c5)+1)
                $plate[i].c6 = zer0(parseInt($plate[i-1].c6)+1)
                $plate[i].c7 = zer0(parseInt($plate[i-1].c7)+1)
                $plate[i].c8 = zer0(parseInt($plate[i-1].c8)+1)
                $plate[i].c9 = zer0(parseInt($plate[i-1].c9)+1)
                $plate[i].c10 = zer0(parseInt($plate[i-1].c10)+1)
                $plate[i].c11 =  zer0(parseInt($plate[i-1].c11)+1)
                $plate[i].c12 = i == 4 ? 'NTC': i == 5 ? 'NTC': i == 6 ? 'CNEG': i == 7 ? 'CPOS' :  zer0(parseInt($plate[i-1].c12)+1)
            }
        }
    }
    
    
    // text input as number only 

$: firstNum = firstNum.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
</script>

         <!-- 
            
            PLATE STARTS
            
          -->
             <table class="shadow-xl bg-white  ">
                <tr>
                    <td></td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td class="text-xs text-center font-extrabold">RP-N GENE</td>
                    <td></td>
                </tr>
                            <tr class="bg-gray-100">
                                <th class="px-6 py-2 text-sm text-gray-700  border-b border-r border-gray-200 ">
                                     
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b  border-gray-200">
                                    1
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b  border-gray-200">
                                    2
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    3
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    4
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    5
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    6
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    7
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    8
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    9
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    10
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    11
                                </th>
                                <th class="px-6 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    12
                                </th>
                                
                                <th class="px-6 py-2 text-sm text-gray-700  border-b border-l border-gray-200 ">
                                     
                                </th>
                            </tr>
                    <tbody class="bg-white">
      
      {#each $plate as p , i }
{#if i == 3 }
<tr class="whitespace-nowrap hover:bg-gray-100">
    <td class="px-6 py-4 text-sm text-gray-700 bg-gray-100 border-r border-gray-200 ">
        {p.row}
    </td>
    <td class="{$selectedField.location == p.row+'1' ? ' bg-blue-200' : $orderMap[p.c1] !== undefined ? $orderMap[p.c1].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c1].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c1'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c1 ; $selectedField.iterator= i ; $selectedField.column = 1 ; $selectedField.location = p.row+'1' }} on:mouseenter="{()=>hover = 'c1'}" on:mouseleave="{()=>hover = ''}" >
        {p.c1}
    </td>
    <td class="{$selectedField.location == p.row+'2' ? ' bg-blue-200' : $orderMap[p.c2] !== undefined ? $orderMap[p.c2].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c2].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b  border-gray-200 {hover=='c2'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c2 ; $selectedField.iterator= i ; $selectedField.column = 2 ; $selectedField.location = p.row+'2' }} on:mouseenter="{()=>hover = 'c2'}" on:mouseleave="{()=>hover = ''}">
        {p.c2}
    </td>
    <td class="{$selectedField.location == p.row+'3' ? ' bg-blue-200' : $orderMap[p.c3] !== undefined ? $orderMap[p.c1].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c3].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c3'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c3 ; $selectedField.iterator= i ; $selectedField.column = 3 ; $selectedField.location = p.row+'3' }} on:mouseenter="{()=>hover = 'c3'}" on:mouseleave="{()=>hover = ''}">
        {p.c3}
    </td>
    <td class="{$selectedField.location == p.row+'4' ? ' bg-blue-200' : $orderMap[p.c4] !== undefined ? $orderMap[p.c4].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c4].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c4'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c4 ; $selectedField.iterator= i ; $selectedField.column = 4 ; $selectedField.location = p.row+'4' }} on:mouseenter="{()=>hover = 'c4'}" on:mouseleave="{()=>hover = ''}">
        {p.c4}
    </td>
    <td class="{$selectedField.location == p.row+'5' ? ' bg-blue-200' : $orderMap[p.c5] !== undefined ? $orderMap[p.c5].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c5].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c5'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c5 ; $selectedField.iterator= i ; $selectedField.column = 5 ; $selectedField.location = p.row+'5' }} on:mouseenter="{()=>hover = 'c5'}" on:mouseleave="{()=>hover = ''}">
        {p.c5}
    </td>
    <td class="{$selectedField.location == p.row+'6' ? ' bg-blue-200' : $orderMap[p.c6] !== undefined ? $orderMap[p.c6].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c6].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c6'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c6 ; $selectedField.iterator= i ; $selectedField.column = 6 ; $selectedField.location = p.row+'6' }} on:mouseenter="{()=>hover = 'c6'}" on:mouseleave="{()=>hover = ''}">
        {p.c6}
    </td>
    <td class="{$selectedField.location == p.row+'7' ? ' bg-blue-200' : $orderMap[p.c7] !== undefined ? $orderMap[p.c7].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c7].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-max text-sm text-gray-700 text-right border-r border-b border-l-4 border-gray-200 {hover=='c7'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c7 ; $selectedField.iterator= i ; $selectedField.column = 7 ; $selectedField.location = p.row+'7' }} on:mouseenter="{()=>hover = 'c7'}" on:mouseleave="{()=>hover = ''}">
        {p.c7}
    </td>
    <td class="{$selectedField.location == p.row+'8' ? ' bg-blue-200' : $orderMap[p.c8] !== undefined ? $orderMap[p.c8].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c1].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c8'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c8 ; $selectedField.iterator= i ; $selectedField.column = 8 ; $selectedField.location = p.row+'8' }} on:mouseenter="{()=>hover = 'c8'}" on:mouseleave="{()=>hover = ''}">
        {p.c8}
    </td>
    <td class="{$selectedField.location == p.row+'9' ? ' bg-blue-200' : $orderMap[p.c1] !== undefined ? $orderMap[p.c9].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c9].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c9'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c9 ; $selectedField.iterator= i ; $selectedField.column = 9 ; $selectedField.location = p.row+'9' }} on:mouseenter="{()=>hover = 'c9'}" on:mouseleave="{()=>hover = ''}">
        {p.c9}
    </td>
    <td class="{$selectedField.location == p.row+'10' ? ' bg-blue-200' : $orderMap[p.c10] !== undefined ? $orderMap[p.c10].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c10].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c10'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c10 ; $selectedField.iterator= i ; $selectedField.column = 10 ; $selectedField.location = p.row+'10' }} on:mouseenter="{()=>hover = 'c10'}" on:mouseleave="{()=>hover = ''}">
        {p.c10}
    </td>
    <td class="{$selectedField.location == p.row+'11' ? ' bg-blue-200' : $orderMap[p.c11] !== undefined ? $orderMap[p.c11].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c11].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c11'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c11 ; $selectedField.iterator= i ; $selectedField.column = 11 ; $selectedField.location = p.row+'11' }} on:mouseenter="{()=>hover = 'c11'}" on:mouseleave="{()=>hover = ''}">
        {p.c11}
    </td>
    <td class="{$selectedField.location == p.row+'12' ? ' bg-blue-200' : $orderMap[p.c12] !== undefined ? $orderMap[p.c12].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c12].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-b border-r  border-gray-200 {hover=='c12'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c12 ; $selectedField.iterator= i ; $selectedField.column = 12 ; $selectedField.location = p.row+'12' }} on:mouseenter="{()=>hover = 'c12'}" on:mouseleave="{()=>hover = ''}">
        {p.c12}
    </td>
    <td class="px-6 py-4 text-sm text-gray-700 bg-gray-100 border-r border-gray-200">
        {p.row}
    </td>
</tr>

<tr class="whitespace-nowrap hover:bg-gray-100">
    <td class=" bg-gray-100 border-r border-gray-200 ">
     
    </td>
    <td class="text-xs text-center font-extrabold border-r border-b border-gray-200 {hover=='c1'?'bg-gray-100':''} "
     on:mouseenter="{()=>hover = 'c1'}" on:mouseleave="{()=>hover = ''}" >
     RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold border-r border-b  border-gray-200 {hover=='c2'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c2'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold border-r border-b border-gray-200 {hover=='c3'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c3'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold border-r border-b border-gray-200 {hover=='c4'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c4'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold border-r border-b border-gray-200 {hover=='c5'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c5'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold border-r border-b border-gray-200 {hover=='c6'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c6'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold  border-r border-b border-l-4 border-gray-200 {hover=='c7'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c7'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold  border-r border-b border-gray-200 {hover=='c8'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c8'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold  border-r border-b border-gray-200 {hover=='c9'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c9'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center font-extrabold  border-r border-b border-gray-200 {hover=='c10'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c10'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center  font-extrabold border-r border-b border-gray-200 {hover=='c11'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c11'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class="text-xs text-center  font-extrabold border-b border-r  border-gray-200 {hover=='c12'?'bg-gray-100':''} "
    on:mouseenter="{()=>hover = 'c12'}" on:mouseleave="{()=>hover = ''}">
    RP-N GENE
    </td>
    <td class=" bg-gray-100 border-r border-gray-200">
        
    </td>
</tr>

{:else}
<tr class="whitespace-nowrap hover:bg-gray-100">
    <td class="px-6 py-4 text-sm text-gray-700 bg-gray-100 border-r border-gray-200 ">
        {p.row}
    </td>
    <td class="{$selectedField.location == p.row+'1' ? ' bg-blue-200' : $orderMap[p.c1] !== undefined ? $orderMap[p.c1].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c1].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c1'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c1 ; $selectedField.iterator= i ; $selectedField.column = 1 ; $selectedField.location = p.row+'1' }}  on:mouseenter="{()=>hover = 'c1'}" on:mouseleave="{()=>hover = ''}" >
        {p.c1}
    </td>
    <td class="{$selectedField.location == p.row+'2' ? ' bg-blue-200' : $orderMap[p.c2] !== undefined ? $orderMap[p.c2].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c2].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b  border-gray-200 {hover=='c2'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c2 ; $selectedField.iterator= i ; $selectedField.column = 2 ; $selectedField.location = p.row+'2' }} on:mouseenter="{()=>hover = 'c2'}" on:mouseleave="{()=>hover = ''}">
        {p.c2}
    </td>
    <td class="{$selectedField.location == p.row+'3' ? ' bg-blue-200' : $orderMap[p.c3] !== undefined ? $orderMap[p.c3].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c3].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c3'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c3 ; $selectedField.iterator= i ; $selectedField.column = 3 ; $selectedField.location = p.row+'3' }} on:mouseenter="{()=>hover = 'c3'}" on:mouseleave="{()=>hover = ''}">
        {p.c3}
    </td>
    <td class="{$selectedField.location == p.row+'4' ? ' bg-blue-200' : $orderMap[p.c4] !== undefined ? $orderMap[p.c4].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c4].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c4'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c4 ; $selectedField.iterator= i ; $selectedField.column = 4 ; $selectedField.location = p.row+'4' }} on:mouseenter="{()=>hover = 'c4'}" on:mouseleave="{()=>hover = ''}">
        {p.c4}
    </td>
    <td class="{$selectedField.location == p.row+'5' ? ' bg-blue-200' : $orderMap[p.c5] !== undefined ? $orderMap[p.c5].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c5].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c5'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c5 ; $selectedField.iterator= i ; $selectedField.column = 5 ; $selectedField.location = p.row+'5' }} on:mouseenter="{()=>hover = 'c5'}" on:mouseleave="{()=>hover = ''}">
        {p.c5}
    </td>
    <td class="{$selectedField.location == p.row+'6' ? ' bg-blue-200' : $orderMap[p.c6] !== undefined ? $orderMap[p.c6].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c6].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-20 text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c6'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c6 ; $selectedField.iterator= i ; $selectedField.column = 6 ; $selectedField.location = p.row+'6' }} on:mouseenter="{()=>hover = 'c6'}" on:mouseleave="{()=>hover = ''}">
        {p.c6}
    </td>
    <td class="{$selectedField.location == p.row+'7' ? ' bg-blue-200' : $orderMap[p.c7] !== undefined ? $orderMap[p.c7].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c7].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-max text-sm text-gray-700 text-right border-r border-b border-l-4 border-gray-200 {hover=='c7'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c7 ; $selectedField.iterator= i ; $selectedField.column = 7 ; $selectedField.location = p.row+'7' }} on:mouseenter="{()=>hover = 'c7'}" on:mouseleave="{()=>hover = ''}">
        {p.c7}
    </td>
    <td class="{$selectedField.location == p.row+'8' ? ' bg-blue-200' : $orderMap[p.c8] !== undefined ? $orderMap[p.c8].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c8].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c8'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c8 ; $selectedField.iterator= i ; $selectedField.column = 8 ; $selectedField.location = p.row+'8' }} on:mouseenter="{()=>hover = 'c8'}" on:mouseleave="{()=>hover = ''}">
        {p.c8}
    </td>
    <td class="{$selectedField.location == p.row+'9' ? ' bg-blue-200' : $orderMap[p.c9] !== undefined ? $orderMap[p.c9].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c9].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4  cursor-pointer w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c9'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c9; $selectedField.iterator= i ; $selectedField.column = 9 ; $selectedField.location = p.row+'9' }} on:mouseenter="{()=>hover = 'c9'}" on:mouseleave="{()=>hover = ''}">
        {p.c9}
    </td>
    <td class="{$selectedField.location == p.row+'10' ? ' bg-blue-200' : $orderMap[p.c10] !== undefined ? $orderMap[p.c10].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c10].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c10'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c10 ; $selectedField.iterator= i ; $selectedField.column = 10 ; $selectedField.location = p.row+'10' }} on:mouseenter="{()=>hover = 'c10'}" on:mouseleave="{()=>hover = ''}">
        {p.c10}
    </td>
    <td class="{$selectedField.location == p.row+'11' ? ' bg-blue-200' : $orderMap[p.c11] !== undefined ? $orderMap[p.c11].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c11].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-r border-b border-gray-200 {hover=='c11'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c11 ; $selectedField.iterator= i ; $selectedField.column = 11 ; $selectedField.location = p.row+'11' }} on:mouseenter="{()=>hover = 'c11'}" on:mouseleave="{()=>hover = ''}">
        {p.c11}
    </td>
    <td class="{$selectedField.location == p.row+'12' ? ' bg-blue-200' : $orderMap[p.c12] !== undefined ? $orderMap[p.c12].mapped == 'true' ? 'bg-blue-100': $orderMap[p.c12].mapped == 'not found' ? 'bg-red-100' : ''  :''	} px-6 py-4 cursor-pointer  w-max text-sm text-gray-700 text-right border-b border-r  border-gray-200 {hover=='c12'?'bg-gray-100':''} "
    on:click={()=> { $selectedField.id= p.c12 ; $selectedField.iterator= i ; $selectedField.column = 12 ; $selectedField.location = p.row+'12' }} on:mouseenter="{()=>hover = 'c12'}" on:mouseleave="{()=>hover = ''}">
        {p.c12}
    </td>
    <td class="px-6 py-4 text-sm text-gray-700 bg-gray-100 border-r border-gray-200">
        {p.row}
    </td>
</tr>
{/if}
      

      {/each}       </tbody>
      <tr class="bg-gray-100">
            <th class="px-6 py-2 text-sm text-gray-700  border-t border-r border-gray-200 " >
                 
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 boborder-t border-gray-200">
                1
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                2
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                3
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                4
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                5
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                6
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                7
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                8
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                9
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                10
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                11
            </th>
            <th class="px-6 py-2 text-sm text-gray-700 border-t border-gray-200">
                12
            </th>
            
            <th class="px-6 py-2 text-sm text-gray-700  border-t border-l border-gray-200 ">
                 
            </th>
        </tr>
                </table>

          <!-- 

            PLATE ENDS

           -->
  