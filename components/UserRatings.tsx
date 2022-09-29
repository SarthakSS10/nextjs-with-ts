import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactStars from "react-rating-stars-component";
import { fetchUserOnId, useEditRatingsMutation } from "../lib/userApi";

function UserRatings(props: any) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedUser, setSelectedUser] = useState<any>();
  const arr = [1, 2, 3, 4];
  const [images, setImages] = useState([]);

  const albumVal = [];
  const [trigger, { isLoading, isError, data, error }] =
    fetchUserOnId.useLazyQuery();
  const [editRatings, { data: editResponse }] = useEditRatingsMutation();

  const ratingChanged = async (rating: string, albumId: any, id: string) => {
    if (id === undefined) {
      alert("please select user");
      setRating(0);
    } else {
      console.log("ddddddddddddddd", id);
      editRatings({ uid: id, rating, albumId });
    }

    // const {data} = await axios.patch(`http://localhost:5000/user/updateAlbum/${id}`,{rating,albumId})
    // console.log("useraction edit dddddddddddddddd",data);
  };

  const selectedOptionChange = async (id: any) => {
    console.log("val", id);
    setSelectedUser(id.value);
    let { data }: any = await trigger(id.value);
    // const {data} = await axios.get(`http://localhost:5000/user/get/${id.value}`)
    console.log(data);
    if (data[0].ratings.length > 0) {
      let arr: any = [];
      let vax = [...images];
      vax.map((val: any) => {
        let temp: any = [];
        data[0].ratings.map((val1: any) => {
          if (val1.albumId._id === val._id) {
            temp.push({
              _id: val1.albumId._id,
              url: val1.albumId.url,
              rating: val1.rate,
            });
          }
        });
        if (temp.length > 0) {
          arr.push(temp[0]);
        } else {
          arr.push(val);
        }
      });

      setImages((): any => [...arr]);
    } else {
      const albumVal = images.map((val: any, index) => {
        return {
          _id: val._id,
          url: val.url,
          rating: 0,
        };
      });
      setImages((): any => [...albumVal]);
    }
  };

  useEffect(() => {
    // dispatch(userFetch())
    const arrayObj = props.users.map((item: any) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    setOptions(arrayObj);
    // console.log("holaaaaaaa",props.album);
    const albumVal = props.album.map((val: any, index: any) => {
      return {
        _id: val._id,
        url: val.url,
        rating: 0,
      };
    });
    setImages((): any => [...albumVal]);

    // setImages(props.album)

    // dispatch(artistFetch())
  }, [props]);

  console.log(" image sin ndsf ", images);

  return (
    <div>
      <div style={{ width: "400px", margin: "auto", marginTop: "20px" }}>
        <Select
          defaultValue={selectedOption}
          onChange={selectedOptionChange}
          options={options}
        />
      </div>
      <Container>
        <Row>
          {images.map((val: any, index) => {
            console.log("jssssssssssssssxxxxxxxxxxxxxxxx");
            return (
              <Col key={index} xs={3}>
                <Card
                  style={{ width: "18rem", margin: "auto", marginTop: "20px" }}
                >
                  <Card.Img
                    variant="top"
                    src={val.url}
                    style={{ height: "30vh" }}
                    // src="https://images.unsplash.com/photo-1659512590357-5137f1354aaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1921&q=80"
                  />
                  <Card.Body>
                    <Card.Title>
                      <ReactStars
                        count={5}
                        value={val.rating}
                        onChange={(id: any) =>
                          ratingChanged(id, val._id, selectedUser)
                        }
                        size={24}
                        activeColor="#ffd700"
                      />
                      <div>{val.rating}</div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default UserRatings;
