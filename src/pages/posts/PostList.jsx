import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../redux/postActions";
import { useNavigate, Link } from "react-router-dom";

function PostList() {
  const dispatch = useDispatch();
  const { dataAllPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsActions.getAll(1));
    console.log(dataAllPosts); 
  }, [dispatch]);

  return (
    <div class="container mt-5">
      <div class="mt-5">&nbsp;</div>
      <div class="row mt-5">
        {dataAllPosts.map((post) => (
          <div class="col-md-4">
            <div class="card">
              <img
                src={post.posts_image}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{post.posts_title}</h5>
               
                <Link to={`/detail-post/${post.posts_id}`} class="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
