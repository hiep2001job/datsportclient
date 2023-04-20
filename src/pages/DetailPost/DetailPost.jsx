import React, { useState, useEffect } from "react";
import { Markup } from "react-render-markup";
import { Link, useParams } from "react-router-dom";
import postsApi from "../../api/posts";
import DefaultImg from '../../assets/images/default.png'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, Col, Container, Row } from "reactstrap";
import Loader from '../../component/Common/Loader';
import './DetailPost.scss';

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const rs = await postsApi.getById(id);
    if (rs) setPost(rs);
  }

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
            <BreadcrumbItem active>Post</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      {!loading&&
      <Row>
        <Col>
          <Card>
            <CardImg top src={post.posts_image} alt="Post Image" />
            <CardBody>
              <Row>
                <Col>
                  <h1>{post.posts_title}</h1>
                  <p>Published on {post.posts_create_date && new Date(post.posts_create_date).toISOString().slice(0, 10).replace(/-/g, '/')}</p>
                </Col>
              </Row>
              <Markup markup={post.posts_content} />
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <h4>Other posts</h4>
              <div className="d-flex flex-column justify-content-between">
                <Card className="mx-2">
                  <div className="d-flex align-items-center">
                    <img className="mr-5 rounded" width={80} src={DefaultImg} alt="" />
                    <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. </CardText>
                  </div>
                </Card>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      ||<Loader/>}
    </Container>
  );
};

export default DetailPost;
