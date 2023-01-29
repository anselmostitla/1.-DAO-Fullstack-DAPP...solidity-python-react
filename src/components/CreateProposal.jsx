import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { generateProposal } from "../Blockchain.services";
import { setGlobalState, useGlobalState } from "../store";

const CreateProposal = () => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState(0);
  

  const addProposal = async () => {
    generateProposal(title, description, beneficiary, amount )
    setGlobalState("modal", "scale-0")
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center 
    justify-center bg-black bg-opacity-50 transform transition-transform
    duration-300 ${modal} z-50`}
    >
      <div
        className="bg-white dark:bg-[#212936] shadow-lg shadow-[#122643]
      dark:shadow-gray-500 rounded-xl w-11/12 md:w-2/5 h-712 p-6"
      >
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Raise Proposal</p>
            <button
              type="button"
              className="border-o bg-transparent focus:outline-none"
            >
              <FaTimes onClick={()=>{setGlobalState("modal", "scale-0")}}/>
            </button>
          </div>

          <div
            className="flex justify-between items-center border 
              border-gray-500 rounded-xl mt-5 px-2.5"  
          >
            <input
              className="block w-full text-sm bg-transparent border-0 
              focus:outline-none focus:right-0"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Title"
              required
            />
          </div>

          <div
            className="flex justify-between items-center border 
            border-gray-500 rounded-xl mt-5 px-2.5"
          >
            <input
              className="block w-full text-sm bg-transparent border-0 
              focus:outline-none focus:right-0"
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              name="amount"
              placeholder="E.g. 2.3 ETH"
              required
            />
          </div>

          <div
            className="flex justify-between items-center border 
            border-gray-500 rounded-xl mt-5 px-2.5"
          >
            <input
              className="block w-full text-sm bg-transparent border-0 
              focus:outline-none focus:right-0"
              onChange={(e)=>setBeneficiary(e.target.value)}
              type="text"
              name="beneficiary"
              placeholder="0x2e...2ea1"
              required
            />
          </div>

          <div
            className="flex justify-between items-center border 
            border-gray-500 rounded-xl mt-5 px-2.5"
          >
            <textarea
              className="block w-full text-sm bg-transparent border-0 
              focus:outline-none focus:ring-0"
              onChange={(e)=>setDescription(e.target.value)}
              type="text"
              name="beneficiary"
              placeholder="Description"
              required
            ></textarea>
          </div>

          <button
            className="px-4 py-2.5 mt-5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full
               text-white shadow-md shadow-gray-400 active:bg-blue-800 dark:shadow-transparent 
               transition duration-150 ease-in-out hover:text-blue-700 dark:border
              dark:border-blue-500 dark:bg-transparent "
            onClick={addProposal}
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
