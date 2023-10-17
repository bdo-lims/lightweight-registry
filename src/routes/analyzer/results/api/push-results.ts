import pool from "$lib/utils/pool";




export const put = async ({request , url})=>{

    let batch = url.searchParams.get('batch');
    let testID = url.searchParams.get('test');
 
 
    let orders = await  request.json();
 
 
     Object.values(orders).forEach(async (mapped)=>{
 
         let odata = orders[mapped.id]
         let findRec = await pool.query(`select id from registry.batch_results where batch = '${batch}' and  seq = '${odata.id}'`)
           if(findRec.rowCount == 0 && odata.mapped == 'true'){
         let putQuery = await pool.query(`
        INSERT INTO registry.batch_results
        ( seq, batch, well, "result", barcode, "order", mapped,test_id)
        VALUES( '${odata.id}', '${batch}', '${odata.well}', '${odata.result}' ,  '${odata.barcode}', '${odata.order}'::int, '${odata.mapped}', '${testID}');    
        `)
     
         }
         if(findRec.rowCount > 0 && odata.mapped == 'true'){
            let putQuery = await pool.query(`
                    UPDATE registry.batch_results
                       SET 
                        seq = '${odata.id}',
                        batch = '${batch}', 
          well   =   '${odata.well}', 
          "result"   =   '${odata.result}', 
          barcode   =   '${odata.barcode}' , 
          "order" = '${odata.order}'::int,
          mapped   =  '${odata.mapped}' ,
          test_id  =  '${testID}'
          where batch = '${batch}' and  seq = '${odata.id}'
      `)
   
       }
       if(findRec.rowCount == 0 && odata.mapped != 'true'){
        let putQuery = await pool.query(`
        INSERT INTO registry.batch_results
        ( seq, batch, well, "result", barcode, mapped,test_id)
        VALUES( '${odata.id}', '${batch}', '${odata.well}', '${odata.result}' ,  '${odata.barcode}',  '${odata.mapped}', '${testID}');    
        `)

        }
        if(findRec.rowCount > 0 && odata.mapped != 'true'){
            let putQuery = await pool.query(`
        UPDATE registry.batch_results
        SET 
         seq = '${odata.id}',
          batch = '${batch}', 
          well   =   '${odata.well}', 
          "result"   =   '${odata.result}', 
          barcode   =   '${odata.barcode}' , 
          mapped   =  '${odata.mapped}' ,
          test_id  =  '${testID}'
          where batch = '${batch}' and  seq = '${odata.id}'
      `)
   
       }
      
      })
                
            let batchString = JSON.stringify(orders)
            

            let addBatch = await pool.query(`
                        update 
                            registry.batch
                        set
                            orders = '${batchString}'
                        where 
                            id = '${batch}'
            `)

            console.log(addBatch.rowCount == 1 ? 'order mapping saved': 'order map not saved')
    
        return  {
            status:200
        }


}