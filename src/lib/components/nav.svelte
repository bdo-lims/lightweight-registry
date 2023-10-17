<script>
    import { Dropdown ,DropdownItem, Navbar, NavLi, NavUl, NavHamburger ,Avatar, DropdownDivider,DropdownHeader } from "flowbite-svelte";
    import { Logout  } from "svelte-heros";
    import { goto } from '$app/navigation';
    
</script>
<!-- 
<Navbar let:hidden let:toggle navClass='border-b-2 shadow-lg py-2 w-full '>

<div class="flex md:order-2 ">
    <Avatar id="avatar-menu"  class="cursor-pointer" slot="label" />
    <Dropdown arrowIcon={false} inline={true} triggeredBy="#avatar-menu" >
        
        <DropdownHeader>
            <span class="block text-sm"> Marcques Mouton </span>
            <span class="block truncate text-sm font-medium"> king@stor-systems.com </span>
        </DropdownHeader>
        <DropdownItem >Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownItem liClass='block align-middle font-medium cursor-pointer py-3 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'  > <Logout size='20'  class="inline-flex"/> Sign out</DropdownItem>
    </Dropdown>
    <NavHamburger on:click={toggle} />
</div> 
<div class="flex items-center md:order-2 cursor-pointer">
    <Avatar id="avatar-menu" />
    <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
    <span class="block text-sm"> Marcques Mouton </span>
    <span class="block truncate text-sm font-medium"> king@stor-systems.com </span>
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownDivider />
    <DropdownItem liClass='block align-middle font-medium cursor-pointer py-3 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'  > <Logout size='20'  class="inline-flex"/> Sign out</DropdownItem>
  </Dropdown>

<NavUl {hidden}>
    <NavLi sveltekit:prefetch href="/" >Home</NavLi>
    <NavLi sveltekit:prefetch href="/registry" >Registry</NavLi> 
    <NavLi id="epi-menu" class="cursor-pointer">Epidemiology</NavLi> 
      
      <Dropdown triggeredBy="#epi-menu" placement="bottom-start" inline={true} >  
        <DropdownItem on:click={()=>{goto("/epi-data")}} >Epi-Data</DropdownItem>
        <DropdownItem on:click={()=>{goto("/analyzer/plate-setup")}} >Analyzer plate setup</DropdownItem>
        <DropdownItem on:click={()=>{goto("/analyzer/results")}}>Analyzer Results</DropdownItem>
        <DropdownItem>Reports</DropdownItem>
    </Dropdown>

</NavUl>
</Navbar> -->


<Navbar let:hidden let:toggle class='border-b-2 shadow-lg ' >  
    <div class="flex items-center md:order-2 cursor-pointer">
      <Avatar id="avatar-menu" src='/placeholder.svg' />
      <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
      <DropdownHeader>
        <span class="block text-sm"> Marcques Mouton </span>
        <span class="block truncate text-sm font-medium"> king@stor-systems.com </span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem  sveltekit:prefetch href="/registry" >Settings</DropdownItem>
      <DropdownDivider />
      <DropdownItem liClass='block align-middle font-medium cursor-pointer py-3 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'  > <Logout size='20'  class="inline-flex"/> Sign out</DropdownItem>
    </Dropdown>
    <NavUl {hidden}>
      <NavLi sveltekit:prefetch href="/">Home</NavLi>
      <NavLi sveltekit:prefetch href="/registry">Registry</NavLi>
      <NavLi id="epi" class="cursor-pointer">Epidemiology</NavLi>
      
        <Dropdown placement="bottom" triggeredBy="#epi">
            <DropdownItem sveltekit:prefetch href="/epi-data">Epi-Data</DropdownItem>
            <DropdownItem sveltekit:prefetch href="/analyzer/plate-setup">Plate-Setup</DropdownItem>
            <DropdownItem sveltekit:prefetch href="/analyzer/results">Analyzer-Resulting</DropdownItem>
        </Dropdown>

    </NavUl>
  </Navbar> 