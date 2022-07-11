import React, { useState, useEffect } from 'react';

const CRYPTO_PRICES_API_BASE_URL =
  'https://api.frontendexpert.io/api/fe/cryptocurrencies';

export default function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const res = await fetch(CRYPTO_PRICES_API_BASE_URL + `?page=${page}`);
      const data = await res.json();
      setCryptoData(data);
    };
    fetchCryptoData();
  }, [page]);

  const isFirstPage = page === 0 ? true : false;
  const isLastPage = cryptoData.hasNext === false ? true : false;

  return (
    <>
      <table>
        <caption>Crypto Prices</caption>
        <thead>
          <tr>
            <th scope='col'>Coin</th>
            <th scope='col'>Price</th>
            <th scope='col'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData?.coins?.length &&
            cryptoData.coins.map((coin) => {
              const { name, price, marketCap } = coin;
              return (
                <tr key={name}>
                  <th scope='row'>{name}</th>
                  <td>{price}</td>
                  <td>{marketCap}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button
        disabled={isFirstPage}
        onClick={() => setPage((prevPage) => prevPage - 1)}
      >
        Back
      </button>
      <button
        disabled={isLastPage}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Next
      </button>
    </>
  );
}
