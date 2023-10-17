import dotenv from 'dotenv/config';
import pool from "./pool.js";
import fetch from 'node-fetch';
import https from 'https';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});


let OE_HOST = process.env.OE_HOST



console.log(OE_HOST);


async function getAuthTokens(){





        let cookieToken = await pool.query(`SELECT session_id cookie,csrf_token token FROM registry.auth_session`);
        console.log(cookieToken.rows)

         const options = {
        agent: httpsAgent,
        method: 'GET',
        headers: {
        'cookie': `${cookieToken.rows[0].cookie}`,
        'x-csrf-token' : `${cookieToken.rows[0].token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
	}
        
		let getBarcode = await fetch(`https://${OE_HOST}/OpenELIS-Global/ajaxQueryXML?provider=SampleEntryGenerateScanProvider`,options)
          let bdata = await getBarcode.text()
                console.log(bdata)
}   

getAuthTokens()
