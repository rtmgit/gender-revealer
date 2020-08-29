/* eslint-env browser */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const videoType = 'video/webm';

export default class VideoRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videoURL: undefined,
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // show it to user
    this.video.srcObject = stream;
    this.video.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    this.video.play();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    this.saveVideo();
    this.video.pause();
  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    //const videos = this.state.videos.concat([videoURL]);
    this.setState({ videoURL: videoURL });
    this.props.setVideoContentToParentState(blob, videoURL);
  }

  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    console.log("Video Getting Deleted: ", videoURL);
    // const videos = this.state.videos.filter(v => v !== videoURL);
    // this.setState({videos});
    this.setState({ videoURL: undefined });
    //this.props.setVideoContentToParentState(undefined, undefined);
    this.video.play();
  }

  render() {
    const { recording, videoURL } = this.state;

    return (
      <div className="camera">
        <List>
          <ListItem>
            <Button autoFocus className={"videoBtns"} disabled={recording} onClick={e => this.startRecording(e)}>
              Start
            </Button>
            <Button autoFocus className={"videoBtns"} disabled={!recording} onClick={e => this.stopRecording(e)}>
              Stop
            </Button>
            <Button autoFocus className={"videoBtns"} disabled={(videoURL === undefined)} onClick={() => this.deleteVideo(videoURL)}>
              Remove
            </Button>
            <a href={videoURL}>DOWNLOAD</a>
          </ListItem>
          <Divider />
          {(videoURL !== undefined) &&
            (<React.Fragment><ListItem><h3>Recorded Video:</h3></ListItem><ListItem><video style={{ width: '100%' }} src={videoURL} autoPlay controls /></ListItem><Divider /></React.Fragment>)}
          <ListItem><h3>Current Streaming Video:</h3></ListItem>
          <ListItem>
            <div>
              <video
                style={{ width: '100%' }}
                ref={v => {
                  this.video = v;
                }}>
                Video stream not available.
              </video>
            </div>
          </ListItem>
        </List>

      </div>
    );
  }
}