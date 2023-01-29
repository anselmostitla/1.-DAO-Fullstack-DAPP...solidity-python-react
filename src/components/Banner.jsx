import { useState } from "react";
import { performContribute } from "../Blockchain.services";
import { setGlobalState, useGlobalState } from "../store";
import Proposal from "../views/Proposal";

const Banner = () => {
  const [amount, setAmount] = useState("");
  const [proposals] = useGlobalState("proposals");
  const [isStakeholder] = useGlobalState("isStakeholder");
  const [balance] = useGlobalState("balance");
  const [mybalance] = useGlobalState("mybalance");

  const onContribute = async () => {
    if (!!!amount || amount === "") return;
    await performContribute(amount);
    setAmount("");
  };

  const getOpened = () => 
    proposals.filter(
      (proposal) => new Date().getTime() < Number(proposal.duration) + '000'
    ).length

  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">
        {getOpened()} Proposals Currently Open
      </h2>
      <p>
        Current DAO Balance: <strong> {balance} ETH</strong> <br />
        Your Contributions:{" "}
        <span>
          <strong>{mybalance} ETH</strong>
          {isStakeholder ? ", and you are now a stakeholder" : null}
        </span>
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>
        {isStakeholder
          ? "You can now raise proposals on this platform"
          : `Hey, when you contribute up to ${balance} ETH you become stakeholder`}
      </p>
      <div className="flex justify-start items-center md_w-1/3 w-full mt-4">
        <input
          type="number"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
          bg-clip-padding border-solid border-gray-700 dark:bg-transparent rounded transition 
          ease-in-out m-0 shadow-md focus:text-gray-500 focus:outline-none dark:border-gray-500"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder="E.g. 3.2 ETH"
          required
        />
      </div>
      <div className="flex justify-start items-center mt-4 space-x-2">
        <button
          onClick={onContribute}
          className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-sm 
          leading-tight uppercase shadow-md shadow-gray-500 rounded-full 
          dark:shadow-transparent hover:bg-blue-700 transition duration-150 ease-in-out "
        >
          Contribute
        </button>

        {isStakeholder ? (
          <button
            className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-sm 
            leading-tight uppercase shadow-md shadow-gray-500 rounded-full dark:shadow-transparent
           hover:bg-blue-700 transition duration-150 ease-in-out "
            onClick={() => setGlobalState("modal", "scale-100")}
          >
            Propose
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Banner;
