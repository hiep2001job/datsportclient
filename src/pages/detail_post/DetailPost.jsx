import React, { useState, useEffect } from "react";
import { Markup } from "react-render-markup";
import { Link, useParams } from "react-router-dom";
import postsApi from "../../api/posts";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const fetchData = async () => {
    const rs =await postsApi.getById(id);
    if (rs) setPost(rs);
  }

  useEffect(() => {
    fetchData();   
  }, [id]);

  return (
    <div class="container mt-5">
      <div class="mt-5">&nbsp;</div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div
              class="card-header"
              style={{
                backgroundImage: `url('${post.posts_image}')`,
                backgroundSize: "cover",
                height: "400px",
              }}
            ></div>
            <div class="card-body">
              <h5 class="card-title">{post.posts_title}</h5>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <Markup markup={post.posts_content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
