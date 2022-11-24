import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Home: NextPage = () => {
  const [username,setUsername] = useState("");
  const router = useRouter()

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-300">
      <div className='bg-black text-white p-12 w-1/2 h-1/3 flex flex-col items-center'>
        <div className='font-bold text-3xl mb-8'>Serach for github user</div>
        <div className='w-full flex flex-col items-center'>
          <input placeholder='username...' className='flex-1 p-1 w-full mb-8 rounded-md px-2 text-black' onChange={(e)=>setUsername(e.target.value)}/>
          <div className='cursor-pointer bg-blue-600 p-2 font-bold px-4 rounded-md' onClick={()=>router.push(`/${username}`)}>Serach</div>
        </div>
      </div>
    </div>
  )
}

export default Home
