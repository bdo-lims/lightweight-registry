import pool from '$lib/utils/pool'


export async function get({url}){

    // let labnumber = url.searchParams.get('labno')
    let query = pool.query(

        `
        select dd.dict_entry  "name", tr.value  from clinlims.test_result tr
  
        join
        clinlims.dictionary dd on dd.id = tr.value::int
        
        where dd.is_active = 'Y'
        and 
        tr.is_active = true
        and tr.test_id  = '404'
        order by dd.id asc`
        )
    return{
        body:  (await query).rows
    }

}


