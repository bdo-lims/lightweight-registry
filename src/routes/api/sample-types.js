import pool from "$lib/utils/pool";

export const get = async ({request})=>{
 
    let getSampleTypes = await pool.query('select id, description from clinlims.type_of_sample where is_active = true')

    return{
        body: getSampleTypes.rows
    }
    
}
