<script lang="ts">
import {uiForm} from '../store'

import Deng from "./comp/deng.svelte";
import Sars from "./comp/sars.svelte";
import Inf from "./comp/inf.svelte";
    
    
</script>

    {#if $uiForm == 1}
    <Sars/>
    {:else if  $uiForm == 2 }
    <Inf/>
    {:else if $uiForm == 3 }         
    <Deng/>
    {/if}

    