import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listVoters } from "../Blockchain.services";
import { truncate } from "../store";

const Voters = () => {

  const { id } = useParams()
  const [voters, setVoters] = useState([])
  const [data, setData] = useState([])

  useEffect(()=>{
      listVoters(id).then((res) => {
      setVoters(res)
      setData(res)
    })
  },[id])    


  const getAll = () => setVoters(data);  
  const getAccepted = () => setVoters(data.filter((vote)=>vote.choosen))
  const getRejected = () => setVoters(data.filter((vote)=>!vote.choosen))
  

  const active = `bg-blue-600 px-4 py-2.5 font-medium text-sm leading-tight uppercase text-white 
  text-sm shadow-md 
  shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:border
  dark:border-blue-500 border border-blue-600  hover:text-white`;
  
  const deactive = `bg-transparent px-4 py-2.5 font-medium text-sm leading-tight uppercase text-blue-600 
  text-sm shadow-md 
  shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:border
  dark:border-blue-500 border border-blue-600 hover:text-white hover:bg-blue-600`;
  
  return (
    <div className="flex flex-col p-8">
      <div className="flex justify-center items-center " role="group">
        <button onClick={getAll} className={`rounded-l-full ${active}`}>All</button>
        <button onClick={getAccepted} className={` ${deactive}`}>Acceptees</button>
        <button onClick={getRejected} className={`rounded-r-full ${deactive}`}>rejectees</button>
      </div>
      <div className="overflow-x-auto sm:mx-6">
      {/* lg:mx-8 */}
        <div className="py-2 inline-block min-w-full sm:px-6">
        {/* lg:px-8 */}
          <div className="h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounde-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                    Voter
                  </th>
                  <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                    Voted
                  </th>
                  <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                    Vote
                  </th>
                  {/* <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                    Action
                  </th> */}   
                </tr>
              </thead>
              <tbody>
                  {voters.map((voter,i)=>(
                    <Voter key = {i} vote = {voter} />
                  ))}

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


const Voter = ({ vote }) => {

  const active = `bg-blue-600 px-4 py-2.5 font-medium text-sm leading-tight uppercase text-white 
  text-sm shadow-md 
  shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:border
  dark:border-blue-500 border border-blue-600  hover:text-white`;

  const timeAgo = (timestamp) => moment(Number(timestamp + "000")).fromNow()

return (  
  <tr>
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <div className="flex justify-start items-center space-x-2">
        {/* <span>{truncate(vote[0],6,6,15)}</span> */}
        <span>{truncate(vote.voter,6,6,15)}</span>
      </div>
    </td>
    {/* <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      Should donate to save the...
    </td> */}
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      {/* {new Date().getTime()} */}
      {timeAgo(vote.timestamp)}
    </td>
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap space-x-2">
      {/* <a href={`/proposal/`+2} className={`rounded-full ${active}`}>view</a> */}
      {vote.choosen
      ? <a href="/" className={`rounded-full ${active}`}>Accepted</a>
      : <a href="/" className={`rounded-full ${active} bg-red-600 border-purple-600`}>Rejected</a>
      }
      
      
    </td>
  </tr>
)
}

export default Voters