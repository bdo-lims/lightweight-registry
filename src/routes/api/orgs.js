import pool from "$lib/utils/pool";
export const get = async ({url})=>{
    let id = url.searchParams.get('id')
    let type = url.searchParams.get('type')

    if(type == 'site'){
        
        let sites = await pool.query(`select distinct org.name, org.id   from clinlims.organization org
        join clinlims.clinlims.organization_organization_type oot on org.id = oot.org_id 
        join  organization_type ot on ot.id = oot.org_type_id 
        where ot.short_name  <> 'dept'
        and is_active = 'Y'
        order by  org.name asc`)
    

    return{
        body: sites.rows
    }

    
    }
    if(type == 'ward'){
            let wards = await pool.query(`select  distinct org.name, org.id , org.org_id  from clinlims.organization org
    join clinlims.clinlims.organization_organization_type oot on org.id = oot.org_id 
    join  organization_type ot on ot.id = oot.org_type_id 
    where ot.short_name  = 'dept'
    and is_active = 'Y'
    and org.org_id = ${id}
    `)

        return{
            body: wards.rows
        }
    
        
        }
    // let cookieToken = await pool.query(`select org.name, org.id , org.org_id  from clinlims.organization org
    // join clinlims.clinlims.organization_organization_type oot on org.id = oot.org_id 
    // join  organization_type ot on ot.id = oot.org_type_id 
    // where ot.short_name  = 'dept'
    // and is_active = 'Y'`)
    

    return{

        status: 403
    }
    
}
