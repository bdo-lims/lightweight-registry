import pool from "$lib/utils/pool";

export const get = async ({})=>{
 
    let getConditions = await pool.query(`select id "value", dict_entry "label" from clinlims.dictionary where is_active = 'Y' and dictionary_category_id = 137 order by 2`)

    return{
        body: getConditions.rows
    }
    
}
