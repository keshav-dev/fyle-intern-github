import { ArrowLeftIcon, ArrowRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { Octokit } from 'octokit'
import React, { useEffect, useState } from 'react'

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

const PaginationComponent = ({setPage,repos,page}) => {
    const [start,setStart] = useState(1);

    const handleStart = (delta) => {
        if(delta===-1 && start===1)return;
        const newStart = start+delta
        setStart(newStart)
    }

    const handlePage = (delta) => {
        if(delta===-1 && page===1)return;
        const newPage = page+delta
        setPage(newPage)
    }

    return (
        <div className='mt-10'>
            {repos.length===0 && <div className='text-red-500 text-center font-bold'>
                    No more repositories found
                </div>
            }
            <div className='grid grid-cols-2 gap-x-4 gap-y-4 mb-8'>
                {repos.map((repo)=>(
                    <div className='border border-black w-full p-4'>
                        <div className='font-bold text-lg text-blue-600 mb-2'>{repo.name}</div>
                        <div className='text-gray-600 mb-2'>{repo.description}</div>
                        <div className='flex items-center flex-start mb-2'>
                            {Object.keys(repo.languages).slice(0,5).map((language)=>(
                                <div className='px-1.5 bg-blue-600 text-white rounded-md mr-1'>{language}</div>
                            ))}
                        </div>
                    </div>
                ))}
                
            </div>
            <div className='flex flex-col items-center justify-center w-[29rem] mx-auto'>
                <div className='text-blue-600 flex items-center'>
                    <div className={`border p-2 py-2.5 border-gray-600 cursor-pointer`} onClick={()=>handleStart(-1)}>
                        <ChevronDoubleLeftIcon height={20} width={20} />
                    </div>
                    {Array.from(Array(9).keys()).map((elem)=>(
                        <div className={`border border-gray-600 p-2 px-4 cursor-pointer ${elem+start===page && "bg-blue-600 text-white"}`} onClick={()=>setPage(elem+start)}>{elem+start}</div>
                    ))}
                    <div className={`border p-2.5 border-gray-600 cursor-pointer`} onClick={()=>handleStart(1)}>
                        <ChevronDoubleRightIcon height={20} width={20} />
                    </div>
                </div>
                <div className='flex items-center justify-between w-full mt-4'>
                    <div className='border border-gray-600 rounded-full p-4 py-1 text-gray-600 flex items-center cursor-pointer' onClick={()=>handlePage(-1)}><ArrowLeftIcon height={20} width={20} className='mr-2' /> Older</div>
                    <div className='border border-gray-600 rounded-full p-4 py-1 text-blue-600 flex items-center cursor-pointer' onClick={()=>handlePage(1)}>Newer <ArrowRightIcon height={20} width={20} className='ml-2' /></div>
                </div>
            </div>
        </div>
    )
}

export default PaginationComponent