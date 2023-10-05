import React from "react";
import { useParams } from "react-router-dom";
import showStore from "../stores/showStore";
import Header from "../components/Header";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!store.data) return <></>;

  return (
    <div>
      <Header back />
      <header className="show-header">
        <img src={store.data.image.large} alt="Imagen de la Crypto" />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <div className="width">
        <div className="show-graph">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={store.graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Fecha" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Precio"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="show-details">
          <div className="width"></div>
          <h2>Detalles</h2>

          <div className="show-details-row">
            <h3>Clasificacion de capitalizacion en el mercado</h3>
            <span>{store.data.market_cap_rank}</span>
          </div>

          <div className="show-details-row">
            <h3> a la alza en las ultimas 24 horas</h3>
            <span>{store.data.market_data.high_24h.usd}</span>
          </div>

          <div className="show-details-row">
            <h3> a la Baja en las ultimas 24 horas</h3>
            <span>{store.data.market_data.low_24h.usd}</span>
          </div>

          <div className="show-details-row">
            <h3> Suministro circulante</h3>
            <span>{store.data.market_data.circulating_supply}</span>
          </div>

          <div className="show-details-row">
            <h3> Precio actual en dolares</h3>
            <span>${store.data.market_data.current_price.usd}</span>
          </div>

          <div className="show-details-row">
            <h3> Cambio en % del ultimo año </h3>
            <span>
              {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
