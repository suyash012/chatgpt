import React from 'react'
import Logo from './logo'
import userlogo from '../images/userlogo.png'



export default function Leftpanel() {
    const Chat_name=[
        {
            id:1,
            ChatName:"write the queries",
            Day:"today"
        },
        {
            id:2,
            ChatName:"write the queries",
            Day:"yesterday"
        },
        {
            id:3,
            ChatName:"write the queries",
            Day:"7 days ago"
        }
    ]
   
  return (
    <div className='flex flex-col justify-between bg-neutral-950'>
<div className="svg">
    <Logo value=" new chat" />
    </div>
    <div className='mx-6 mb-72'>{
  Chat_name.map(chat => (
    <div key={chat.id}>
        <h1 className='text-neutral-500 font-bold text-sm my-2'>{chat.Day}</h1>
      <p>{chat.ChatName}</p>
    </div>
  ))
}
</div>
<div className="image flex mx-5 mb-16 gap-2 ">
    <img src={userlogo} alt="the user"  className='h-6 w-6'/>
    <p>SUYASH SONI</p>
</div>

 </div>
  
)
}