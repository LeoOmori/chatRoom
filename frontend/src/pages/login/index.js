
import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from "react-router-dom";



const Chat = () => {

  const history = useHistory();

  const [nickname, setNickname] = useState('')
  const [selectValue, setSelectValue] = useState('Python');

  const handleOnChange = (e) => {
    setNickname(e.target.value);
  }

  const handleOnChangeSelect = (e) => {
    setSelectValue(e.target.value);
  }

  const handleSubmit = (e) => {
    history.push({

        pathname:`/chat`, 
        state:{nickname,selectValue},

      }
    );
    e.preventDefault();
  }

  return (
    
      <div className="w-full  h-full flex items-center justify-center">

        <div className="bg-white h-5/6 sm:h-96 w-full sm:w-2/5 flex-col flex items-center border border-grey">

          <h1 className="text-4xl text-center mb-5 mt-10">Enter in a chatRoom</h1>

          <form onSubmit={handleSubmit}>
            <div>

              <p>Nickname:</p>
              <input className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="write your Nickname" 
              type="text"
              onChange={handleOnChange}
              value={nickname}
              />

              <p>select your server</p>
              <div className="relative w-64">
                <select 
                value={selectValue} 
                onChange={handleOnChangeSelect}
                className="text-grey block appearance-none w-full bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="Python">Python</option>
                  <option value="Nodejs">Nodejs</option>
                  <option value="MongoDB">MongoDB</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                </div>
              </div>

              <button type="submit" className=" rounded mt-10 bg-blue-700 w-96 h-10">
                <p className="text-white">Enter</p>
              </button>

            </div>
          </form>
        </div>
      </div>
  );
}

export default Chat;
