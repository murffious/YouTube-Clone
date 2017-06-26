import React from 'react'
import {Component} from 'react';
import bullet from './../Header/img/bullet.png'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import watch_later from './../Header/img/watch_later.png';
import dropdown from '../Header/img/drop_down_arrow.png';
import './SearchResults.css'

class SearchResults extends Component{

    constructor(props){
        super(props);
        this.state = {
            videoArr: [
                {
                    snippet:{
                        thumbnails: {
                            medium: {},
                        },
                    },
                    id: {
                        videoId: ''
                    }
                },
            ],
            filterClicked: false
        }

        this.getViews = this.getViews.bind(this)
        this.getResults = this.getResults.bind(this)
        this.filterClickedFn = this.filterClickedFn.bind(this)
    }

    componentDidMount(){
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&pageToken=CAoQAA&q=${this.props.userInput }&type=video&key=AIzaSyA6QnEmVEZ_b2ZQO8GLc7CTEU3g-xDyhFY`).then( videoArr => {
            this.setState({
                videoArr: videoArr.data.items
            })
            console.log(this.state)
        })
        
    }

    displayDate(dateStr){
        let dateObj = new Date(dateStr);
        let postedYear = dateObj.getFullYear();
        let postedMonth = dateObj.getMonth();
        let today= new Date();
        let todayMonth = today.getMonth();
        let thisYear = today.getFullYear();
        let howLongYear = thisYear - postedYear;
        let howLong = todayMonth - postedMonth;
        if(thisYear - postedYear === 0){
        if(Math.abs(howLong) > 1){
            return Math.abs(howLong) + ' months ago';
        } else{
            return Math.abs(howLong) + ' month ago';
            }
        }
        if(thisYear - postedYear > 0){
        if(Math.abs(howLongYear > 1)){
            return Math.abs(howLongYear) + ' years ago';
        } else {
            return Math.abs(howLongYear) + ' year ago';
        }
        
        }
        
    }

    getViews(){
       return Math.floor(Math.random() * 899 + 1) + ',' + Math.floor(Math.random() * 899 + 100) + ' views';
    }

    getResults(){
        return 'About ' + Math.floor(Math.random() * 5 + 1) + ',' + Math.floor(Math.random() * 899 +100) + ',' + Math.floor(Math.random() * 899 + 100) + ' results'
    }
    filterClickedFn(){
        this.setState({
            filterClicked: !this.state.filterClicked
        })
    }


    render(){
        let filterBttn = null
        if(this.state.filterClicked){
            filterBttn = <section id="menu_dropdown">
                <ul className="first_column">
                    <li>Upload date</li>
                    <li>Today</li>
                    <li>This week</li>
                    <li>This month</li>
                    <li>This year</li>
                </ul>
                <ul className="second_column">
                    <li>Type</li>
                    <li>Video</li>
                    <li>Channel</li>
                    <li>Playlist</li>
                    <li>Movie</li>
                    <li>Show</li>
                </ul>
                <ul className="third_column">
                    <li>Duration</li>
                    <li>Short</li>
                    <li>Long (> 20 minutes)</li>
                </ul>
                <ul className="fourth_column">
                    <li>Features</li>
                    <li>4K</li>
                    <li>HD</li>
                    <li>Subtitles/CC</li>
                    <li>Creative Commons</li>
                    <li>3D</li>
                    <li>Live</li>
                    <li>Purchased</li>
                    <li>360&deg;</li>
                </ul>
                <ul className="fifth_column">
                    <li>Sort by</li>
                    <li>Relevance</li>
                    <li>Upload date</li>
                    <li>Rating</li>
                </ul>
            </section>
        } else {
            filterBttn = null;
        }
        let videos = this.state.videoArr;
        console.log(videos)
        return (
            <section className='main_search_container'>
                <section id="first_box">
                    {/*<p>Some results have been removed because Restricted Mode is enabled</p>*/}
                    <div id="filter_bttn" onClick={ this.filterClickedFn }>
                        <h1>Filters</h1>
                        <img src={ dropdown } />
                    </div>
                    <h2>{ this.getResults() }</h2>
                </section>
                { filterBttn }
                <section className='main_video_search_container'>
                    {videos.map( (video, id) => {
                        return <div  key={ id }id='search_video_container'>
                        <Link to={ '/video/' + videos[id].id.videoId }><div id="video_display_container">
                            <img id="search_video_img" src={ videos[id].snippet.thumbnails.medium.url} />
                            <div className="watch_container">
                                <img id="watch_later" src={watch_later}/>
                            </div>
                        </div></Link>
                        <div className="search_words_container">
                            <Link to={ '/video/' + videos[id].id.videoId }><h1 id="search_video_title">{videos[id].snippet.title}</h1></Link>
                            <h2 id="search_video_channel">{videos[id].snippet.channelTitle}</h2>
                            <ul>
                                <li>{this.displayDate(videos[id].snippet.publishedAt)}</li>
                                <li><img id="bullet_img" src={bullet}/></li>
                                <li>{this.getViews()}</li>
                            </ul>
                            <p id="search_video_desc">{videos[id].snippet.description}</p>
                        </div>
                    </div>
                    }
                    )}
                </section>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        userInput: ownProps.match.params.userInput
    }
}

export default connect(mapStateToProps, {})(SearchResults);