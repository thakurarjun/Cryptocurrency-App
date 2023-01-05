import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptosList) {
      const filterData = cryptosList?.data?.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      setcryptos(filterData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader/>;

  console.log(cryptos,"data");

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos ? (
          cryptos?.map((currency) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              className="crypto-card"
              key={currency.id}
            >
              <Link to={`/crypto/${currency.uuid}`
              }>
                <Card
                  title={`${currency.rank}.${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} alt="crypto" />
                  }
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Typography>helll</Typography>
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
