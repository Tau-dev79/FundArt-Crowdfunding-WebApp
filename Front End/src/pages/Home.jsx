import { useStateContext } from "../context";
import { useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";
import DisplayCampaigns from "../components/DisplayCampaigns";
import Loader from "../components/Loader";

function Home() {
  const { contract } = useStateContext();

  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getCampaigns"),
    params: [],
  });

  return (
    <div>
      {!isLoading ? (
        <DisplayCampaigns title="All Campaigns" campaigns={data} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Home;
