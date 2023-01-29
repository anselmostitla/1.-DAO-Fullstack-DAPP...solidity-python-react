import { useEffect, useState } from "react";
import { payoutBeneficiary } from "../Blockchain.services";
import { daysRemaining, truncate, useGlobalState } from "../store";
// import Proposal from "../views/Proposal";

// import Identicon from 'react-identicons';
const Proposals = () => {
  const [data] = useGlobalState("proposals");
  const [proposals, setProposals] = useState(data);

  const active = `bg-blue-600 px-4 py-2.5 font-medium text-sm leading-tight uppercase text-white 
  text-sm shadow-md 
  shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:border
  dark:border-blue-500 border border-blue-600  hover:text-white`;

  const deactive = `bg-transparent px-4 py-2.5 font-medium text-sm leading-tight uppercase text-blue-600 
  text-sm shadow-md 
  shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:border
  dark:border-blue-500 border border-blue-600 hover:text-white hover:bg-blue-600`;

  const getAll = () => setProposals(data);
  const getOpened = () =>
    setProposals(
      data.filter(
        (proposal) => new Date().getTime() < Number(proposal.duration + "000")
      )
    );
  const getClosed = () =>
  setProposals(
    data.filter(
      (proposal) => new Date().getTime() > Number(proposal.duration + "000")
    )
  );

  useEffect(()=>{
    getAll()
  },[data])

  return (
    <div className="flex flex-col p-8 ">
      <div className="flex justify-center items-center " role="group">
        <button onClick={getAll} className={`rounded-l-full ${active}`}>All</button>
        <button onClick={getOpened} className={` ${deactive}`}>Open</button>
        <button onClick={getClosed} className={`rounded-r-full ${deactive}`}>Close</button>
      </div>

      <div className="overflow-x-auto sm:mx-6">
        {/* lg:mx-8 */}
        <div className="py-2 inline-block min-w-full sm:px-6">
          {/* lg:px-8 */}
          <div className="h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounde-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Beneficiary
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Expires
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal, i) => (
                  <Proposal key={i} proposal={proposal}/>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


const Proposal = ({proposal}) => {
  const active = `bg-blue-600 px-4 py-2.5 font-medium text-sm leading-tight uppercase text-white 
  text-sm shadow-md 
  shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:border
  dark:border-blue-500 border border-blue-600  hover:text-white`;

  const handlePayout = async() => {
    await payoutBeneficiary(proposal.id)
  }

  return (
    <tr>
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <div className="flex justify-start items-center space-x-2">
        <span>{truncate(proposal.beneficiary,4,4,11)}</span>
      </div>
    </td>
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      {proposal.title.substring(0,80) + '...' }
    </td>
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      {new Date().getTime() > Number(proposal.duration +'000') ? 'Expired': daysRemaining(Number(proposal.duration))}
    </td>
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap space-x-2">
      <a
        href={`/proposal/` + proposal.id}
        className={`rounded-full ${active}`}
      >
        view
      </a>
      {new Date().getTime() > Number(proposal.duration)+'000' ?(
        proposal.upvotes > proposal.downvotes ? (
          !proposal.paid ? (
            <button className={`rounded-full ${active} bg-green-600`}
            onClick = {handlePayout}
            >
              Paid   
            </button>
          ):            
            <button className={`rounded-full ${active} bg-yellow-600`}>
              Payout 
            </button>
        ):          
        <button className={`rounded-full ${active} bg-orange-600`}>
          Rejected 
      </button>
      ):null}
      
      {/* <a href="/" className={`rounded-full ${active}`}>paid</a> */}
      {/* <a href="/" className={`rounded-full ${active}`}>Payout</a> */}
    </td>
  </tr>
  )
}

export default Proposals;
