import React from "react";
import FunCard from "./FunCard";
import { useNavigate } from "react-router-dom";
import { daysLeft } from "../utils";

const SearchCampaigns = ({ title, campaigns, search }) => {
  const navigate = useNavigate();
  const searchedCampaigns = campaigns.filter(
    (item) => item.title.includes(search) && daysLeft(Number(item.deadline)) > 0
  );

  const handleNavigate = (campaign, index) => {
    navigate(`/campaign-details/${campaign.title}`, {
      state: { ...campaign, pId: index },
    });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} 20
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {searchedCampaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            There are no campaigns on this search
          </p>
        )}

        {searchedCampaigns.length > 0 &&
          searchedCampaigns.map(
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
export default SearchCampaigns;
