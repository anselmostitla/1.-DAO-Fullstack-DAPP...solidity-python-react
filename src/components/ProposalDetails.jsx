// npm install --save recharts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend } from "recharts";
import { Tooltip, XAxis, YAxis } from "recharts";

import { fromWei, getProposal, voteOnProposal } from "../Blockchain.services";
import { daysRemaining, useGlobalState } from "../store";

const ProposalDetails = () => {  
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const [data, setData] = useState([]);
  const [isStakeholder] = useGlobalState("isStakeholder");
  const [amountProposalInEth, setAmountProposalInEth] = useState(null)

  const retreiveProposal = async () => {
    await getProposal(id).then((res) => {
      setProposal(res);
      setData([
        { 
          name: "Voters",
          Acceptees: res?.upvotes,
          Rejectees: res?.downvotes,
        },
      ]);
      setAmountProposalInEth((res?.amount)/10**18)
    });
  };

  const onVote = async (choice) => {
    if (new Date().getTime() > Number(proposal.duration + "000")) {
      return;
    } else {
      await voteOnProposal(id, choice);
      return;
    }
  };

  const messageExpiration = () => {
    if (daysRemaining(Number(proposal?.duration)).trimStart().charAt(0)==="-") {
      return "expired"    
    }
  } 
  

  useEffect(() => {
    retreiveProposal();    
  });
  
  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">{proposal?.title}</h2>
      <p>
      
        This proposal is to payout {" "}
        <strong>
          {proposal?.amount} Wei {" "}
        </strong>
        and currently have{" "}
        <strong>
          {Number(proposal?.upvotes) + Number(proposal?.downvotes)} votes{" "}
        </strong>
        and 
        {messageExpiration()==="expired"? " it has already expired." : 
        " will expire in " + daysRemaining(Number(proposal?.duration))
        }    
         
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>{proposal?.description}</p>
      <div className="flex justify-start items-center w-full mt-4 overflow-auto">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />    
          <Legend />
          <Bar dataKey="Acceptees" fill="#2563eb" />
          <Bar dataKey="Rejectees" fill="#dc2626" />
        </BarChart>
      </div>
      {isStakeholder ? (
        <div
          className="flex justify-start items-center space-x-3 mt-4"
          role="group"
        >
          <button
            type="button"
            className="bg-transparent px-4 py-2.5 font-medium leading-tight 
        uppercase text-blue-600 text-xs rounded-full shadow-md shadow-gray-400 active:bg-blue-800 
        dark:shadow-transparent transition duration-150 ease-in-out dark:border
        dark:border-blue-500 border border-blue-600 hover:text-white hover:bg-blue-600"
            onClick={() => onVote(true)}
          >
            Accept
          </button>
          <button
            type="button"
            className="bg-transparent px-4 py-2.5 font-medium leading-tight 
        uppercase text-red-600 text-xs rounded-full shadow-md shadow-gray-400 active:bg-red-800 
        dark:shadow-transparent transition duration-150 ease-in-out dark:border
        dark:border-red-500 border border-red-600 hover:text-white hover:bg-red-600"
            onClick={() => onVote(false)}
          >
            Reject
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProposalDetails;
