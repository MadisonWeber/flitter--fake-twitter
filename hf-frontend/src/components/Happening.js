import React from 'react'
import "../css/happening.css"
import ReactTooltip from 'react-tooltip';

const Happening = () => {
    return (
        <div className = 'happening__section'>
            <form className = 'happening__section__form' data-tip data-for = 'working-tooltip-left'>
                <input type="search" className = "search__twitter" placeholder = 'Search Twitter'></input>
                <i className= 'fa fas-search' /> 
            </form>
            <div className="happening__container" >
                <h2 className = "happening__container__title">What's Happening</h2>
                <div className = "happening__item" data-tip data-for = 'working-tooltip-left'>
                    <p className="trending-heading">Trending in Canada</p>
                    <p className="trending-content">Justin Trudeau</p>
                    <p className="trending-tweet-count">123 Tweets</p>
                </div>
                <div className = "happening__item" data-tip data-for = 'working-tooltip-left'>
                        <p className="trending-heading">Politics - Trending</p>
                        <p className="trending-content">Lockdown Toronto</p>
                        <p className="trending-tweet-count">3453 Tweets</p>
                </div>
                <div className = "happening__item" data-tip data-for = 'working-tooltip-left'>
                        <p className="trending-heading">Sports - Trending</p>
                        <p className="trending-content">World Jr Hockey</p>
                        <p className="trending-tweet-count">1230 Tweets</p>
                </div>
                <div className = "happening__item" data-tip data-for = 'working-tooltip-left'>
                        <p className="trending-heading">Lifestyle - Trending</p>
                        <p className="trending-content">Butter Tarts</p>
                        <p className="trending-tweet-count">800 Tweets</p>
                </div>
            </div>
            <ReactTooltip  id = 'working-tooltip-left' place = 'left' effect = 'solid' type = 'light' textColor ="rgb(29,161,242)" backgroundColor = 'rgb(20,29,38)'>Feature Coming Soon</ReactTooltip>
        </div>
    )
}

export default Happening
