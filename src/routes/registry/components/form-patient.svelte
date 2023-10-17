<script>
  import {  Input,Textarea, Label , Button ,Iconinput , Search  ,Select } from 'flowbite-svelte';
import moment from 'moment';
  import { patientTemplate ,resetPatientTemplate } from '$lib/stores/newOrder';
import { Search as Srch} from "svelte-heros";

  $: $patientTemplate.nic = ($patientTemplate.nic).toUpperCase()
  let findPatient = async (nic)=>{
    
      resetPatientTemplate()
      $patientTemplate.nic = nic
      let queryPatient = await fetch(`/api/patient?nic=${nic}`)
      if (queryPatient.status == 200){
        let patient_data = await queryPatient.json()

        $patientTemplate.id = patient_data.id
        $patientTemplate.name = patient_data.names
        $patientTemplate.surname = patient_data.surname
        $patientTemplate.sex = patient_data.sex
        $patientTemplate.dob =  moment(patient_data.date_of_birth,'YYYY/MM/DDTHH:mm:ss.sssz').format('YYYY-MM-DD'),
        $patientTemplate.nic = nic
      }else{      
        $patientTemplate.nic = nic
      }
  }

  $: console.log($patientTemplate.dob )
  
  let genderList = [
    {value:"M", name: "Male"},
    {value:"F", name: "Female"},
  ]
  </script>
  <div class="relative px-8 pt-6 pb-8 flex flex-col mt-5 right-0 left-0  " >
    
    
      <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3">
              <Label for='default-input' class='block mb-2'>National ID</Label>            
              <div class="relative">       
                <Iconinput noBorder  id='nic' placeholder="N123456878D"   bind:value={$patientTemplate.nic}  > 
                <Srch />
                </Iconinput>
                <Button on:click={()=>findPatient($patientTemplate.nic)} textSize="text-sm" class="absolute rounded-l-none  top-0 bottom-0 right-0" type="button">Search</Button>
              </div>
                <p class="text-grey-dark text-xs italic">Please enter patient national identification number</p>
          </div>
  
      </div>
    
        
      <div class="-mx-3 md:flex mb-6">
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <Label for='fn' class='block mb-2'>First Name</Label>            
          <Input   id='fn'  bind:value={$patientTemplate.name}   />
        <!-- <p class="text-red text-xs italic">Please fill out this field.</p> -->
      </div>
      <div class="md:w-1/2 px-3">
        <Label for='lm' class='block mb-2'>Last Name</Label>            
        <Input id='lm'   bind:value={$patientTemplate.surname}   />
      </div>
      
      <div class="md:w-1/2 px-3">
       
          <Label for='gn' class='block mb-2'>Gender</Label>            
        
          <div class="relative">
              <Select id='gn' items={genderList}   bind:value={$patientTemplate.sex}  />
          </div>
        </div>
  


    </div>
    
    <div class="-mx-3 md:flex mb-2">
     
    
      <div class="md:w-1/2 px-3">
  
        <Label for='dob' class='block mb-2'>Date of birth</Label>         
         <div class="relative">
            <Input id='dob'  type='date' bind:value={$patientTemplate.dob} />
        </div>
      </div>
    </div>
  
<!--   
  
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <Textarea  {...textareaprops} bind  />
       </div>
    </div>
   -->
  
  </div>
