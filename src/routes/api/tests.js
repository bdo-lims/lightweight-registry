import pool from "$lib/utils/pool";

export const get = async ({url})=>{
 
    let id = url.searchParams.get('id')
    let tests = await pool.query(`
    SELECT tst.id "value", tst.name "label"  FROM  clinlims.sampletype_test stt  
    join clinlims.test tst on tst.id = stt.test_id 
    where 1=1
    and
    tst.is_active = 'Y'
    and
    stt.sample_type_id = ${id}
    `)

    return{
        body: tests.rows
    }
    
}
