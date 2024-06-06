import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { formatEther } from "ethers";
import { useStateContext } from "../context";
import CustomButton from "../components/CustomButton";
import CountBox from "../components/CountBox";
import Loader from "../components/Loader";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { contract, performDonations } = useStateContext();
  const [loading, setLoading] = useState();

  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getDonators"),
    params: [state.pId],
  });
  const user = useActiveAccount();
  function getBackers(arr) {
    const test = [];
    for (let i = 0; i < arr.length; i++) {
      if (!test.includes(arr[i])) {
        test.push(arr[i]);
      }
    }
    return test;
  }

  const [amount, setAmount] = useState("");

  const remainingDays = daysLeft(Number(state.deadline));

  const handleDonate = async () => {
    if (user.address === state.owner) {
      alert("You cannot donate your own account");
      return;
    } else if (!(Number(amount) > 0)) {
      alert("Enter some ether value greater than 0");
      return;
    }
    setLoading(true);

    const test = await performDonations(state.pId, amount);
    if (test === "Rejected") {
      alert("You have rejected your transaction");
    } else if (test === "Insufficient") {
      alert("You don't have enough balance");
    } else {
      setAmount("");
    }

    setLoading(false);
  };

  function mergeList(arr) {
    if (arr.length === 0) {
      return;
    }
    const sum = arr.reduce((prev, current) => (prev += current));
    return sum;
  }

  const handleAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  return (
    <div>
      {(loading || isLoading) && <Loader />}

      {!isLoading && (
        <div>
          <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={state.image}
                alt="campaign"
                className="w-full h-[410px] p-3 object-contain bg-[#1c1c24] rounded-xl"
              />
              <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                <div
                  className="absolute h-full bg-[#4acd8d]"
                  style={{
                    width: `${calculateBarPercentage(
                      formatEther(state.target.toString()),
                      data[1].length === 0
                        ? 0
                        : formatEther(mergeList(data[1]).toString())
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
              <CountBox title="Days Left" value={remainingDays} />
              <CountBox
                title={`Raised of ${formatEther(state.target.toString())}`}
                value={
                  data[1].length === 0
                    ? 0
                    : formatEther(mergeList(data[1]).toString())
                }
              />
              <CountBox
                title="Total Backers"
                value={getBackers(data[0]).length}
              />
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Creator
                </h4>

                <div className="mt-[20px] flex flex-row flex-wrap items-center gap-[14px]">
                  <div className="w-[52px] h-[52px] flex justify-center items-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={thirdweb}
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>

                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                      {state.owner}
                    </h4>
                    <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                      10 Campaigns
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Story
                </h4>

                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {state.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Donators
                </h4>

                <div className="mt-[20px] flex flex-col gap-4">
                  {data[0].length > 0 ? (
                    data[0].map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex justify-between items-center gap-4"
                      >
                        <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                          {index + 1}. {item}
                        </p>
                        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                          {formatEther(data[1][index].toString())}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      No donators yet. Be the first one to donate!!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Fund
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Fund The Campaign
                </p>

                <div className="mt-[30px]">
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.01"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={amount}
                    onChange={(e) => handleAmount(e)}
                  />

                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project for no reward, just because it speaks
                      to you.
                    </p>
                  </div>

                  <CustomButton
                    btnType="button"
                    title="Fund Button"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
