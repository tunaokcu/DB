import { useState } from "react";

//Each message should include with it an associated userID
function Messages({msgs=[], userId=0}){
    const [messages, setMessages] = useState(msgs);

    
}

export default Messages;