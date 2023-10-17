<script lang="ts">
    import { msg ,  visible } from './toast'
    import { Toast   } from ".";
    
    import { CheckCircle  } from 'svelte-heros';
  


  
  </script>
  
    
    <Toast bind:visible={$visible}  position="tr" simple transition='blur'  >
          <CheckCircle slot="icon"/> <span class="font-black">{$msg}</span>
    
    </Toast>