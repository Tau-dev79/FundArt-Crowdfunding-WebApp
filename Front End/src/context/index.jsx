import { formatEther, parseEther } from "ethers";
import { createContext, useContext } from "react";
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  resolveMethod,
} from "thirdweb";
import { sepolia } from "thirdweb/chains";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";

const StateContext = createContext();

const client = createThirdwebClient({
  clientId: "THIRDWEB_CLIENT_ADDRESS",
});

export const StateContextProvider = ({ children }) => {
  const fetchAccount = async () => {
    const address = await useActiveAccount();
    return address;
  };

  const contract = getContract({
    client,
    chain: sepolia,
    address: "WALLET_ADDRESS",
  });

  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();

  const publishCampaign = async (form) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: resolveMethod("createCampaign"),
        params: [
          form.address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      await sendTransaction(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const getCampaigns = async () => {
    const data = useReadContract({
      contract,
      method: resolveMethod("getCampaigns"),
      params: [],
    });
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filterCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === contract.address
    );
    return filterCampaigns;
  };

  const performDonations = async (pId, amount) => {
    try {
      const donate = prepareContractCall({
        contract,
        method: resolveMethod("donateToCampaign"),
        params: [pId],
        value: parseEther(amount),
      });
      await sendTransaction(donate);
    } catch (error) {
      if (error.code === 4001) {
        return "Rejected";
      } else if (error.code === 3) {
        return "Insufficient";
      } else {
        console.log(error);
      }
    }
  };

  const getDonators = async (pId) => {
    const { donators } = useReadContract({
      contract,
      method: resolveMethod("getDonators"),
      params: [pId],
    });
    const noOfDonations = donators[0].length;
    const parsedDonations = [];
    for (let i = 0; i < noOfDonations; i++) {
      parsedDonations.push({
        donator: donators[0][i],
        donation: formatEther(donators[0][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        fetchAccount,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        client,
        getUserCampaigns,
        performDonations,
        getDonators,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
