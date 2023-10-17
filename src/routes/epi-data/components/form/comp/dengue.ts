import { writable } from "svelte/store";
import moment from "moment";

export let form = writable({ id: 0,
     epiWk: 0, 
     dateReq: moment().format('yyyy-MM-DD'), 
     sex: '', 
     age: 0, 
     surname: '', 
     name:'',
     hospital:'',
     ward:'',
     card:'', 
     blood:false,
     dbs:false,
     travel:false,
     results: {
        den:'' ,
        den1:'',
        chik:'',
        ns1_ag:'',
        ns1_IgM:'',
        ns1_IgG:'', 
        eia_ns1:''
     },
     result_pcr:'',
     comments:[{user:'',message:''}],
     exist:false,
     test_id:0,
     sample_id:0,
     order_id:0
    })



    export function resetForm(){
      form.set({ id: 0,
         epiWk: 0, 
         dateReq: moment().format('yyyy-MM-DD'), 
         sex: '', 
         age: 0, 
         surname: '', 
         name:'',
         hospital:'',
         ward:'',
         card:'', 
         blood:false,
         dbs:false,
         travel:false,
         results: {
            den:'' ,
            den1:'',
            chik:'',
            ns1_ag:'',
            ns1_IgM:'',
            ns1_IgG:'', 
            eia_ns1:''
         },
         result_pcr:'',
         comments:[{user:'',message:''}],
         exist:false,
         test_id:0,
         sample_id:0,
         order_id:0
 
        })
    }