import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import authApi from "../api/auth";

export default function useUserDetail() {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const { userName } = JSON.parse(localStorage.getItem("data_user"))??{};

  
  useEffect(() => {
    (async () => {
      try {
        if (userName) {
          setLoading(true);
          const userResult = await authApi.getDetails({username:userName});
          // console.log("useUserdetail",userResult);
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
