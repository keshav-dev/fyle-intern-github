import Image from 'next/image'
import React from 'react'
import {LinkIcon, MapPinIcon} from "@heroicons/react/24/solid"


const UserDetailsComponent = ({data,username}) => {
    if(!data){
        return <></>
    }
    return (
        <div>
            <div className='flex items-center'>
                <div className='px-10 py-5'>
                    <Image className='rounded-full' src={data.avatar_url} height={200} width={200} />
                </div>
                <div className='px-10'>
                    <div className='font-bold text-lg py-2'>{data.name}</div>
                    <div className='py-2'>{data.bio}</div>
                    <div className='flex items-center py-2'>
                        <MapPinIcon height={20} width={20}/>
                        <div>{data.location}</div>
                    </div>
                    <div className='py-2'>
                        {`Twitter: https://twitter.com/${data.twitter_username}`}
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <LinkIcon height={20} width={20} className='m-2'/>
                https://github.com/{username}
            </div>
        </div>
    )
}

export default UserDetailsComponent