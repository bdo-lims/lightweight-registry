import pool from "$lib/utils/pool";

export const get = async ()=>{
 
    let cookieToken = await pool.query(`SELECT session_id cookie,csrf_token token FROM registry.auth_session`)

    return{
        body: cookieToken.rows
    }
    
}
