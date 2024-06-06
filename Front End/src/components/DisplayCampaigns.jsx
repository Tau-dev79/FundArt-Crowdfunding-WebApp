import React from "react";
import FunCard from "./FunCard";
import { useNavigate } from "react-router-dom";
import { daysLeft } from "../utils";

const DisplayCampaigns = ({ title, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign, index) => {
    navigate(`/campaign-details/${campaign.title}`, {
      state: { ...campaign, pId: index },
    });
  };

  const getCampaigns = (arr) => {
    let camp = 0;
    for (let i = 0; i < arr.length; i++) {
      if (!(daysLeft(Number(arr[i].deadline)) < 1)) {
        camp += 1;
      }
    }
    return camp;
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} {getCampaigns(campaigns)}
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns
          </p>
        )}

        {campaigns.length > 0 &&
          campaigns.map(
            (campaign, index) =>
              !(daysLeft(Number(campaign.deadline)) < 1) && (
                <FunCard
                  key={index}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign, index)}
                />
              )
          )}
      </div>
    </div>
  );
};
export default DisplayCampaigns;
