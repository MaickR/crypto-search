import React from "react";
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";
import Header from "../components/Header";
import Listitems from "../components/Listitems";
import classNames from "classnames"


export default function Home() {
  const store = homeStore();

  React.useEffect(() => {
    if(store.trending.length === 0)store.fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="width">
          <h2>Busca una Crypto</h2>
          <div className= { classNames ("home-search-input", {searching: store.searching,})}>
            <input type="text" value={store.query} onChange={store.setQuery} />
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" width="20"><path fill="currentColor" d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/></svg>
          </div>
        </div>
      </header>

      <div className="home-cryptos">
        <div className="width">
          <h2>{store.searched ? "Resultados de Busqueda" : "Cryptos Populares"}</h2>

          <div className="home-cryptos-list">
            {store.coins.map((coin) => {
              return <Listitems key={coin.id} coin={coin} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
