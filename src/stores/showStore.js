import {create} from 'zustand';
import axios from 'axios'




const showStore = create((set) => ({
   graphData: [],
   data:null,
   
    fetchData: async (id) => {
     const [graphRes, dataRes] = await Promise.all([
       
        //* SOLICITUD DE VARIANTE DE DIAS
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=120`),
       
        //* SOLICITUD DE ID DE LA MONEDA
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
     ]);
      
      const graphData = graphRes.data.prices.map(price => {
        const [timestamp, p] = price;
        const date = new Date(timestamp).toLocaleDateString("es-co")
        return {
            Fecha: date,
            Precio: p
          };
      });

      console.log(dataRes);
      set({graphData, data: dataRes.data })
     
    },
}));


export default showStore;