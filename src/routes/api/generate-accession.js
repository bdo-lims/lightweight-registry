import pool from "$lib/utils/pool";
import fetch from 'node-fetch';
let OE_HOST = process.env.OE_HOST
import https from 'https';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});


export const get = async ()=>{
        

    let cookieToken = await pool.query(`SELECT session_id cookie,csrf_token token FROM registry.auth_session`);
    
    const options = {
        agent: httpsAgent,
        method: 'GET',
        headers: {
        'cookie': `${cookieToken.rows[0].cookie}`,
        'x-csrf-token' : `${cookieToken.rows[0].token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
        
    };
    let getBarcode = await fetch(`https://${OE_HOST}/OpenELIS-Global/ajaxQueryXML?provider=SampleEntryGenerateScanProvider`,options)
    let bdata = await getBarcode.text() 
    return{
        body:  bdata.split('<formfield>')[1].split('</formfield>')[0]
    }
    
}
