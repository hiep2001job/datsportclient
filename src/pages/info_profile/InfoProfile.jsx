import React from "react";
import Button from "../../share/button/Button";

const InfoProfile = () => {
  return (
    <div className="flex justify-between">
      <div className="pt-12 pl-20 pb-10 border w-70%">
        <form>
          <div className="mb-2">
            <label className="font-semibold pr-1" htmlFor="">
              Username:
            </label>
            <input type="text" value="David Passenger" />
          </div>
          <div className="mb-2">
            <label className="font-semibold  pr-1" htmlFor="">
              Email:
            </label>
            <input type="text" value="hminhnhut99@gmail.com" />
          </div>
          <div className="mb-2">
            <label className="font-semibold  pr-1" htmlFor="">
              Phone:
            </label>
            <input type="text" value="038 972 8084" />
          </div>
          <div className="mb-2">
            <label className="font-semibold  pr-1" htmlFor="">
              Address:
            </label>
            <input type="text" value="Can Tho" />
          </div>
          {/* gender  */}
          <div className="w-full mb-2 relative">
            <h4 className="font-semibold">Gender:</h4>
            <div className="flex items-center">
              <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
                <input
                  id="men"
                  name="gender"
                  // {...register("gender", loginOptions.gender)}
                  type="radio"
                  value="0"
                  className="mr-1"
                />
                <label class htmlFor="men">
                  Men
                </label>
              </div>
              <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
                <input
                  type="radio"
                  id="women"
                  value="1"
                  className="mr-1"
                  name="gender"
                  // {...register("gender", loginOptions.gender)}
                />
                <label htmlFor="women">Women</label>
              </div>
              <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
                <input
                  type="radio"
                  id="other"
                  value="2"
                  className="mr-1"
                  name="gender"
                  // {...register("gender", loginOptions.gender)}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <Button text="Save" fontsize="text-15" height="h-8" />
        </form>
      </div>
      {/* choose avatar  */}
      <div className="flex flex-col items-center mr-20">
        <img
          className="w-80 h-80 rounded-full mb-5"
          src="https://images.unsplash.com/photo-1678626666675-d637950a4780?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <label className="border inline-block cursor-pointer px-2 py-1">
          Change
          <input type="file" className="hidden" />
        </label>
        <div className="mt-3">
          <p className="text-15">
            Maximum file size 1 MB <br /> Format: .JPEG, .PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoProfile;
