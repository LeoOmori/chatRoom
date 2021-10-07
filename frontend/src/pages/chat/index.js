
import React, { useState, useEffect, useContext } from 'react';
import { useLocation} from 'react-router-dom';
import {SocketContext} from '../../context/socketContext'



const Chat = () => {

  const location = useLocation();
  const socket = useContext(SocketContext);

  const [textMsg, setTextMsg] = useState('');
  const [history, setHistory] = useState([]);
  const [roomUsers,setRoomUsers] = useState([]);


  useEffect(() => {

    socket.emit('joinRoom',{userName:location.state.nickname,room:location.state.selectValue});

    socket.on('roomUsers', ({users}) => {
      setRoomUsers( users )
    })

    socket.on('message', (msg) => {
      setHistory( state => [msg , ...state] );      
    })
    
  },[socket]);
  
  const handlesubmit = (e) => {   
    e.preventDefault();
    if(textMsg == '') return
    socket.emit("chatMessage", textMsg);
    setTextMsg('')

  }

  const handleChange = (e) => {

    setTextMsg(e.target.value)
  }

  return (
    <div className='grid grid-cols-5 h-full'>

      <div className="flex flex-col px-10 border-r border-grey h-full bg-gray-100 max-h-screen">

        <h1 className="mt-10 text-2xl font-bold">Room {location.state.selectValue}</h1>
        <p className="text-grey mb-5 mt-20">All users</p>
        <div className="h-full verflow-hidden overflow-y-auto">
          {
            roomUsers.map((e,index) => (

              <p className="text-blue-300">{e.username}</p>

            ))
          }
        </div>
      
      </div>

      <div className="col-span-4 flex flex-col h-full max-h-screen w-full">

        <div className="h-full w-full p-5 flex flex-col-reverse overflow-hidden overflow-y-auto ">


          {
            history.map((e,index) => {

              if(e.user == 'server'){
                return (
                  <div className="mb-5 h-20 flex flex-col justify-center  p-2 rounded-lg">
                    <p className="font-bold text-blue-900">{e.msg}</p>
                  </div>

                )
              }
              return(
                <div key={index} className="mb-5 bg-blue-200  h-20 flex flex-col justify-center  p-2 rounded-lg">
                  <p className="mb-2 text-blue-900 text-sm">{e.user}</p>
                  <p className="font-bold ">{e.msg}</p>
                </div>
              )

            })
          }
          

        </div>

        <div className=" bg-gray-500">
          <form className="flex" onSubmit={handlesubmit}>
            <input onChange={handleChange} value={textMsg} className="h10 appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="write your message" 
            type="text"
            />
            <button type='submite' className="rounded bg-blue-700 hover:bg-blue-600 w-96 h-12">
              <p className="text-white">Send</p>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Chat;
