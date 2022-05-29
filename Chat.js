import TextField from "@material-ui/core/TextField"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import { uname } from "./Signup";
import './Chat.css';
const socket = io.connect("http://localhost:3002");

function Chat() {


	const [message, setmessage] = useState('');
	const [userlist, setuserlist] = useState('');
	const [count, setcount] = useState([]);

	useEffect(() => {
		socket.on('reply', (datas) => {
			const { message, userlist } = datas;
			setcount([...count, { message, userlist }]);
			console.log(count);
		})
	}, [count])


	useEffect(() => {
		axios.get('http://localhost:3002/user').then((response) => {
			setuserlist(response.data[0].name);
			console.log(response.data[0].name)
		}).catch(() => {
			console.log('error')
		})
	}, [])

	const renderChat = () => {
        return count.map(({ userlist, message }, index) => (
            <div key={index}>
                <h3>
                    {userlist}: <span>{message}</span>
                </h3>
            </div>
        ))
    }

	const onMessageSubmit = (e) => {
		socket.emit('msg', { message, userlist });
		e.preventDefault();
	}
	return (
		<div className="card">
			<form onSubmit={onMessageSubmit} >
				<h1>Chat App Send Message</h1><br />
				<h5 className="text-2md text-lime-900 " >login as {userlist} </h5>
				<div className="name-field">

				</div>

				<div>
					<TextField
						id="outlined-multiline-static"
						name="msg"
						variant="outlined"
						onChange={(event) => { setmessage(event.target.value) }}
						label="Type a  Message"
						value={message}
					/>
				</div>
				<button
					className="border min-w-[21%] mt-4 bg-indigo-500 text-white py-2 px-6 rounded-2xl hover:bg-indigo-600" >Send</button>
			</form>
			<div className="render-chat">
				<h1>Chat App Recieve Message </h1>

				{renderChat()}

			</div>
		</div>

	)
}

export default Chat

