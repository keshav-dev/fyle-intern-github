import axios from 'axios'
import { useRouter } from 'next/router'
import { Octokit } from 'octokit'
import React, { useEffect, useState } from 'react'
import { Audio, FidgetSpinner } from 'react-loader-spinner'
import PaginationComponent from '../components/PaginationComponent'
import UserDetailsComponent from '../components/UserDetailsComponent'

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

const userPage = () => {
    const router = useRouter()
    const {username} = router.query
    const [data,setData] = useState(null)
    const [repos,setRepos] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        const getAllDetails = async() => {
            setLoading(true)
            const resultUser = await octokit.request(`GET /users/{username}`, {
                username: username
            })
            setData(resultUser.data)
            const resultRepos = await octokit.request(`GET /users/{username}/repos?per_page=${10}&page=${page}`, {
                username: username
            })
            await getRepoLangs(resultRepos.data)
            setLoading(false)
        }

        const getRepoLangs = async(reposits) => {
            let calls = []
            for(const reposit of reposits){
                calls.push(fetch(reposit.languages_url));
            }
            calls = await Promise.all(calls)
            const calls2 = []
            for(const call of calls){
                calls2.push(call.json())
            }
            const repoLangs = await Promise.all(calls2)
            let counter=0
            for(const repo of reposits){
                repo.languages = repoLangs[counter]
                counter++
            }
            setRepos(reposits)
        }

        if(username){
            getAllDetails()
        }
    },[username,page])

    if(loading){
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Audio
                    height="150"
                    width="150"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        )
    }


    return (
        <div className='p-20'>
            <UserDetailsComponent data={data} username={username} />
            <PaginationComponent setPage={setPage} repos={repos} page={page} />
        </div>
    )
}

export default userPage

