import React, {useEffect, useState, useRef} from 'react'
import {getAuth} from "firebase/auth";
import {collection, query, onSnapshot, getFirestore, orderBy} from "firebase/firestore";
import moment from "moment";
export const MsgBody = ({chatToId}) => {
  const [messages, setMessages] = useState([]);
  const {uid} = getAuth().currentUser;
  const messagesEndRef = useRef(null);

  const mapTimestamp = (timestamp)=>{ 
    return moment(timestamp.toDate()).calendar();
  }
  useEffect (()=>{
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(()=>{
    const db = getFirestore();
    const chatMsgPath = ["chats", getAuth().currentUser.uid, "to", chatToId, "messages"];
    const q = query(collection(db, ...chatMsgPath), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });
      setMessages(data);
    });
    return ()=>{
      unsubscribe();
    }
  }, [chatToId]);

  return (
    <ul className='mt-12 mb-16 px-6 py-2 flex flex-col-reverse h-screen'> 
      <li ref={messagesEndRef}/>
      {messages.map((message, i)=>{
        return(
          <li key={message.id} className={`mb-2`}>
                <p className={`flex ${message.by===uid? "flex-row-reverse": "flex-row"}`}> 
                  <h4 className={`px-4 py-1 rounded-full flex-0 ${message.by===uid? "bg-sky-500 text-white": "bg-gray-200 text-black"}`}>
                    {message.content}
                  </h4>
                </p>
                <p className={`flex ${message.by===uid? "flex-row-reverse": "flex-row"}`}>
                  <h4 className='text-xs'>{mapTimestamp(message.timestamp)}</h4>
                </p> 
          </li>
        ) 
      })}
    </ul>
  )
}
