import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../utils/BackEndUrl';
import { FaLink } from "react-icons/fa";

const ReferenceVideo = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const CallForTheApi = async () => {
            const resdata = await axios.get(`${url}/api/notes/allvideos`)
            if (resdata) {
                console.log(resdata.data)
                setContent(resdata.data);
            } else {
                throw new Error('Failed to fetch blog data');
            }
        }
        CallForTheApi()
    }, [])
    console.log(content)
    return (
        <div className='bg-gray-200  flex justify-center items-center h-screen'>
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto overflow-hidden custom-scrollbar rounded-lg shadow-md'>
                <div className='w-full justify-between p-4 flex'>
                    <h3 className='uppercase'>Important Tutorials</h3>

                </div>
                <div>
                    {content.length === 0 ? <span> Loading...</span> : content?.map((article, ind) => (
                        <div key={ind} className='m-4 p-4 border-[1px] border-gray-300 h-max w-[90%] shadow-md'>

                            <div className="flex  items-center">
                                <iframe className='video'
                                    title='Youtube player'
                                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                    src={`https://youtube.com/embed/${(article.URL.split('/').pop().split('?')[0])}?autoplay=0`}
                                    width="560"
                                    height="315">
                                </iframe>
                            </div>
                            <p className='text-lg font-bold '>{article.Description}</p>
                            <span className='mt-3 flex h-max text-gray w-max p-2 font-semibold text-xs bg-green-100 rounded-2xl' >{article?.subject?.subjectName}</span>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReferenceVideo