import 'bootstrap/dist/css/bootstrap.css';
import { useLocation } from 'react-router-dom';
import { fetchEvent } from './handles/fetchEvent';
import { useEffect, useState } from "react";
import EventLocationMap from './components/EventLocationMap';
//import { ToggleButton } from '@material-ui/lab';
//import { styled } from '@material-ui/styles';
import { modifyCount } from './handles/modifyCount';
import CommentSection from './components/CommentSection'
import { fetchDocs } from './handles/fetchDocs';

function Event(props) {
  const key = useLocation().state
  const [currEvent, setCurrEvent] = useState([])
  const [count, setCount] = useState([])
  const [interested, setInterested] = useState(true)
  const [comments, setComments] = useState([])
  const id = key.entryId

  /*const StyledToggle = styled(ToggleButton)({
    "&&, &&:hover": {
      color: "white",
      backgroundColor: '#0d6efd'
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: '#0a3ebd'
    }
  });*/

  useEffect(() => {
		fetchEvent(id, setCurrEvent, setCount)
    fetchDocs("events/"+id+"/comments", setComments)
	}, [id])

  return (
    <div>
      <br/>
      <div className="container">
        <div className="card"> 
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="container text-left justify-content-center">
                  <div className="d-flex justify-content-between">
                    <h2 className="card-title">{currEvent.title}</h2>
                    <h4 className="card-text float-end text-danger">
                    <img src={require("./heart.png")} width="30" height="30" alt="Interested "/>{" : "+count+" !"}</h4>
                  </div>
                  <br/>
                  <h4 className="d-flex card-subtitle mb-2 text-body-secondary">{currEvent.date} From: {currEvent.startTime} To: {currEvent.endTime}</h4>
                  <p className="d-flex card-text">{currEvent.description}</p>
                </div>
              </div>
              <div className="col">
                {currEvent.location && 
                <EventLocationMap 
                  google={props.google} 
                  location={{ lat: currEvent.location.latitude, lng: currEvent.location.longitude }} 
                />}
                <br/>
                <div class="d-grid gap-2">
                  <button class="btn btn-primary w-100" data-bs-toggle="button" onClick={() => modifyCount(key.entryId, interested, setCount, setInterested)} >I'm interested!!</button>
                  <a href={"//"+currEvent.grpLink} class="btn btn-outline-primary w-100" >Group Chat Link</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <CommentSection comments={comments} id={id} />
      <br/>
    </div>
  );
}
 
export default Event;

/*<StyledToggle
value="check"
selected={selected}
onChange={() => {
  setSelected(!selected);
}}
>
I'm interested!!!
</StyledToggle>*/