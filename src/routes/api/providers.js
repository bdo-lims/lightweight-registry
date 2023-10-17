import pool from "$lib/utils/pool";
export const get = async ({})=>{
        
        let sites = await pool.query(`select per.last_name ||', '||per.first_name "name", max(p.id) id from clinlims.provider p 
        join clinlims.person per on per.id = p.person_id
        group by per.last_name ||', '||per.first_name limit 500`)
    

    return{
        body: sites.rows
    }

       
}
