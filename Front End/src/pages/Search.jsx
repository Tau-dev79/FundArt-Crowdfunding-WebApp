import { useStateContext } from "../context";
import { useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";
import { useLocation } from "react-router-dom";
import SearchCampaigns from "../components/SearchCampaigns";
import Loader from "../components/Loader";

function Search() {
  const { client, contract } = useStateContext();
  const { state } = useLocation();

  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getCampaigns"),
    params: [],
  });

  return (
    <div>
      {!isLoading ? (
        <SearchCampaigns
          title="All Campaigns"
          campaigns={data}
          search={state.searchItem}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Search;
