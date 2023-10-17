<script>


    import { Modal,Input, Button } from 'flowbite-svelte'
    export let popupModal = false;
    export let newBacthID

    export let functionProp = () => {}

</script>
<Modal  title="Select Batch Order" bind:open={popupModal} size="xs">
 
    <Input  bind:value={newBacthID} inputClass="w-full  rounded-lg " />
      
      <div class="flex gap-2 flex-row-reverse">
        <Button on:click={functionProp}>Ok</Button>
        <Button color="alternative">Cancel</Button>
      </div>
  </Modal>