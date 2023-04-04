import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import authApi from "../api/auth";

export default function useUserDetail() {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const { username } = JSON.parse(localStorage.getItem("data_user"))??{};

  useEffect(() => {
    (async () => {
      try {
        if (username) {
          setLoading(true);
          const userResult = await authApi.getDetails(username);
          setUserDetail({ ...userResult.data });
        }
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
      setLoading(false);
    })();
  },[]);

  return userDetail;
}
