import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProgressBar } from "react-bootstrap";

function AlbumRatings(props: any) {
  const arr = [1, 2, 4, 4, 5];
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data);
  }, [props]);
  return (
    <div>
      {data.map((val: any, index) => {
        return (
          <Container key={index}>
            <div>User rating</div>
            <div style={{ marginLeft: 10 }}> {val.totalCount} reviews</div>
            <Row>
              <Col xs={4}>
                <Card
                  style={{ width: "18rem", margin: "auto", marginTop: "20px" }}
                >
                  <Card.Img
                    variant="top"
                    src={val.url}
                    style={{ height: "30vh" }}
                    //   src="https://images.unsplash.com/photo-1659512590357-5137f1354aaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1921&q=80"
                  />
                </Card>
                <div>{val.name}</div>
              </Col>
              <Col xs={8}>
                {val.ratings.map((vl: any, index: any) => {
                  return (
                    <Container key={index} style={{ marginBottom: 4 }}>
                      <Row>
                        <Col>{`${index + 1} star`}</Col>
                        <Col>
                          <ProgressBar
                            now={(vl / val.totalCount) * 100}
                            label={(vl / val.totalCount) * 100}
                          />
                        </Col>
                        <Col>{vl}</Col>
                      </Row>
                    </Container>
                  );
                })}
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
}

export default AlbumRatings;
