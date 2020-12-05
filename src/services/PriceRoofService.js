import BaseService from './BaseService';
//import request from 'superagent';

export class PriceRoofService extends BaseService {
    find({headers,params}) {
      let result = super.request({
        url: '/krovlya',
        method: 'GET',
        type: 'form',
        headers: {...headers},
        query: {...params},
      });
    console.log(result);    
    return result;   
   };

    post_roof({headers, params, price_roof}) {
      let result = super.request({
        url: '/krovlya',    
        method: 'POST',
        headers: {...headers},
        body: {...price_roof, ...params},
        type: 'form'       
     });
     console.log(result);    
     return result;      
   };

/*
   findById (appointmentId) {
       return super.request({
           url: `/appointments/${appointmentId}`
       })
   }

   count () {
       return super.request({
           url: '/appointments/count'
       })
   }
*/
}

export default new PriceRoofService()