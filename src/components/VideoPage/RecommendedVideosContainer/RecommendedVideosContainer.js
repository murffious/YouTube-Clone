import React, { Component } from 'react';
import axios from 'axios';

import './RecommendedVideosContainer.css';

class RecommendedVideosContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            videoList: [1, 2, 3, 4, 5, 6]
        }
    }

    componentDidMount(){
        axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${ this.props.search }&type=video&key=AIzaSyA6QnEmVEZ_b2ZQO8GLc7CTEU3g-xDyhFY')
        .then( res => {
            this.setState({
                videoList: res.data.items
            })
            console.log(this.state);
        })
    }

    render() {
        let videos = this.state.videoList;
        return (
            <div className='more_videos_container'>
                { 
                videos.map( (video, index) => {
                    return  <div key={ index } className='video_box'>
                                <img src='' />
                                <h4>{ videos[index].snippet.title || '' }</h4>
                                <h6>{ videos[index].snippet.channelTitle || '' }</h6>
                                <p>num of views</p>
                            </div>
                }) 
                }
            </div>
        );
    }
}

export default RecommendedVideosContainer;


// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${ this.props.search }&type=video&key=AIzaSyCuuFUnpR3Gm-ai-tS252apbm0adv10PAI
