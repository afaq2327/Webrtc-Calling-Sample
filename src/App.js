import React,{Component} from 'react'
import RTCMultiConnection from 'rtcmulticonnection'
import adapter from 'webrtc-adapter'
import io from "socket.io-client"
import RTCMultiConnectionServer  from 'rtcmulticonnection-server' 

class App extends Component{
  constructor(props){
    super(props)
    this.localVideoref = React.createRef()
    this.remoteVideoref = React.createRef()
    this.io = 'null'
  }

  componentDidMount=()=>{

    // this.io = io('localhost:5000/?open=true&sessionid=a&publicRoomIdentifier=live-session&username=b')

    // RTCMultiConnectionServer.addSocket(this.io)
    let connection = new RTCMultiConnection();
    // this line is VERY_important
    connection.socketURL = 'https://rtc-signalling.herokuapp.com/';
    

    // if you want audio+video conferencing
    connection.session = {
        audio: true,
        video: true
    };

    connection.openOrJoin('id');

    connection.onstream = (event)=>{
      if(event.type=='local'){
        this.localVideoref.current.srcObject = event.stream
      }else{
        this.remoteVideoref.current.srcObject = event.stream
      }
    }
    
  }

  render(){
    
    return (
      <div>
        <p>Testing</p>
        <video ref={this.localVideoref} autoPlay></video>
        <video ref={this.remoteVideoref} autoPlay></video>
      </div>
    );
  }
}

export default App;
