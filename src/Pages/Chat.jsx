import React, { useEffect, useRef, useState } from 'react';
import { url } from '../utils/BackEndUrl';
import Avatar from '../compoenets/Avatar';
import Contact from '../compoenets/Contact';
import axios from 'axios';
import { uniqBy } from "lodash";


const Chat = () => {
    const [wsConnector, setWsConnector] = useState(null)
    const [imageMessage, setImageMessage] = useState(null)
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({})
    const [selectedUserId, setSelectedUserId] = useState('')
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))
    const [offlinePeople, setOfflinePeople] = useState('');


    const divUnderMessages = useRef();
    useEffect(() => {
        connectToWs();
    }, [selectedUserId]);

    function connectToWs() {
        const ws = new WebSocket('ws://localhost:8005');
        setWs(ws);
        ws.addEventListener('message', handleMessage);
        // ws.addEventListener('close', () => {
        //     setTimeout(() => {
        //         console.log('Disconnected. Trying to reconnect.');
        //         connectToWs();
        //     }, 1000);
        // });
    }
    const handleMessage = (e) => {
        const message = JSON.parse(e.data)
        console.log(message)
        //not sending anything than online user will be there
        if ('online' in message) {
            showOnlinePeople(message.online)
        } else if ('text' in message) {
            if (message.sender === selectedUserId) {
                setMessages(prev => ([...prev, { ...message }]));
            }
        }
        //else data wil come from sender
    }

    const showOnlinePeople = (peoplesdata) => {

        const people = {}
        peoplesdata.forEach(element => {
            people[element.userId] = element.username
        });
        setOnlinePeople(people)


    }
    const sendMessage = (ev) => {
        if (ev) ev.preventDefault();
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: newMessageText,

        }));
        setNewMessageText('');
        setMessages(prev => ([...prev, {
            text: newMessageText,
            sender: user?._id,
            recipient: selectedUserId,
            _id: Date.now(),
        }]));


        // if (file) {
        //     axios.get('/messages/' + selectedUserId).then(res => {
        //         setMessages(res.data);
        //     });
        // } else {
        //     setNewMessageText('');
        //     setMessages(prev => ([...prev, {
        //         text: newMessageText,
        //         sender: id,
        //         recipient: selectedUserId,
        //         _id: Date.now(),
        //     }]));
        // }
    }



    useEffect(() => {
        axios.get(`${url}/api/user/getalluser`).then(res => {
            const offlinePeopleArr = res?.data?.users
                .filter(p => p._id !== user?._id)
                .filter(p => !Object.keys(onlinePeople).includes(p._id));
            const offlinePeople = {};
            offlinePeopleArr.forEach(p => {

                offlinePeople[p._id] = p.email;
            });
            setOfflinePeople(offlinePeople);
        });
    }, [onlinePeople]);

    useEffect(() => {
        const div = divUnderMessages.current;
        if (div) {
            div.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);


    useEffect(() => {
        if (selectedUserId) {
            axios.get(`${url}/api/message/messages/${selectedUserId}`, {
                withCredentials: true,
            }).then(res => {
                console.log(res.data)
                setMessages(res.data);
            });
        }
    }, [selectedUserId]);



    const onlinePeopleExclOurUser = { ...onlinePeople };

    delete onlinePeopleExclOurUser[user?._id];

    const messagesWithoutDupes = uniqBy(messages, '_id');
    
    console.log(messagesWithoutDupes)

    return (
        <div className='bg-gray-200 flex justify-center items-center h-screen'>
            <div className='w-[92%] h-[90%] flex flex-col gap-10 bg-white overflow-y-auto  custom-scrollbar rounded-lg shadow-md'>
                <div className="flex justify-between p-4 border-b border-gray-300">
                    {
                        Object.keys(onlinePeopleExclOurUser)?.map(userid => (
                            <>
                                <Contact key={userid}
                                    id={userid}
                                    online={true}
                                    username={onlinePeopleExclOurUser[userid]}
                                    onClick={() => { setSelectedUserId(userid); console.log({ userid }) }}
                                    selected={userid === selectedUserId} />
                            </>
                        ))
                    }
                    {Object.keys(offlinePeople)?.map(userId => (
                        <Contact
                            key={userId}
                            id={userId}
                            online={false}
                            username={offlinePeople[userId]}
                            onClick={() => setSelectedUserId(userId)}
                            selected={userId === selectedUserId} />
                    ))}


                </div>


                <div className="flex-1 overflow-y-auto p-4">


                    {!selectedUserId && (
                        <div className="flex h-full flex-grow items-center justify-center">
                            <div className="text-gray-300">&larr; Select a person from the sidebar</div>
                        </div>
                    )}
                    {!!selectedUserId && (
                        <div className='  w-full h-full'>
                            {messagesWithoutDupes.map(message => (
                                <div key={message._id} className={(message.sender === user?._id ? 'text-right flex w-full justify-start ' : 'text-left flex w-full justify-end')}>
                                    <div className={"text-left w-max flex flex-col gap-2 py-3 px-6  my-2 rounded-3xl text-sm "}>
                                        <span className={(message.sender === user?._id ? 'px-6 py-2 rounded-3xl bg-blue-500 justify-end text-white' : 'bg-gray-200 px-6 py-2 rounded-3xl justify-start text-gray-500')} >{message.text}</span>
                                        <span className=' text-xs'> {new Date(message?.createdAt).toLocaleTimeString()} </span>
                                        {message.file && (
                                            <div className="">
                                                <a target="_blank" className="flex items-center gap-1 border-b" href={axios.defaults.baseURL + '/uploads/' + message.file}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                                    </svg>
                                                    {message.file}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={divUnderMessages}></div>
                        </div>

                    )}


                </div>

                {!selectedUserId && (
                    <div className="flex h-full flex-grow items-center justify-center">
                        <div className="text-gray-300">&larr; Select a person from the sidebar</div>
                    </div>
                )}
                {!!selectedUserId && (
                    <div className="p-4 border-t border-gray-300">
                        <form onSubmit={sendMessage}>
                            <div className="flex">
                                <textarea className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Type your message..." value={newMessageText} onChange={ev => setNewMessageText(ev.target.value)}></textarea>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" type="submit">Send</button>
                            </div>
                            <input value={imageMessage} type='file' />
                        </form>

                    </div>)}
            </div>
        </div>
    );
};

export default Chat;
