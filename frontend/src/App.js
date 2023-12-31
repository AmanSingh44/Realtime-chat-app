import { useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';
import "./App.css";


const socket = io.connect('http://localhost:8000')

function App() {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)


    const joinRoom = () => {
        if (name !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true)
        }
    }

    return ( <
        div className = "App" > {!showChat ? ( <
                div className = 'joinChatContainer' >
                <
                h3 > Join Chat < /h3> <
                input type = 'text'
                placeholder = 'Ram...'
                onChange = {
                    (e) => { setName(e.target.value) } }
                /> <
                input type = 'text'
                placeholder = 'Room ID...'
                onChange = {
                    (e) => { setRoom(e.target.value) } }
                /> <
                button onClick = { joinRoom } > Join A Room < /button> <
                /div>
            ) :
                ( <
                Chat socket = { socket }
                name = { name }
                room = { room }
                />
            )
        } <
        /div>
    );
}

export default App;