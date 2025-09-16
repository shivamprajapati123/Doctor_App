import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";

const MyTest = () => {
  const { testId } = useParams();
  const { tests, currencySymbol } = useContext(AppContext);

  const [testInfo, setTestInfo] = useState(null);

  const fetchtestInfo = async () => {
    const testInfo = tests.find((t) => t._id === testId);
    setTestInfo(testInfo);
    console.log(testInfo);
  };

  useEffect(() => {
    fetchtestInfo();
  }, [tests, testId]);

  return (
    testInfo && (
      <div>
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#5f6fff] w-full sm:max-w-72 rounded-lg"
              src={assets.about_image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px]sm:mt-0">
            {/* tests - name, degree  */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {testInfo.name}{" "}
              {/* <img className="w-5" src={assets.verified_icon} alt="" /> */}
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <p>
                {testInfo.disease_type} - {testInfo.disease_cat}
              </p>
              {/* <button className="py-0.5 px-2 border text-xs rounded-full">
                {testInfo.experience}
              </button> */}
            </div>

            {/* tests - about */}

            <div>
              <p className="flex items-center gap-1 text-s, font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />{" "}
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {testInfo.description}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Test Fee:{" "}
              <span className="text-gray-600">
                
                {testInfo.price}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default MyTest;
