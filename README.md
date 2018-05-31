<h1>TwitterFeels </h1>

TwitterFeels is a project that asked the question: "How do people feel about Home Depot in different parts of the United States?"
To answer this question, we took 3 steps:

<ol>
  <li>
    We used Node and Express to make calls to the Twitter API to gather tweets within 120 miles of Home Depot stores in cities 
    across the United States.
  </li>
  <li> 
    We implemented a sentiment analysis package called retext-sentiment to analyse the tweets and return a sentiment score 
    between -5 and 5 for each tweet. We calculated an average score for each coprus of tweets in a location.
  </li>
  <li>
    We plotted the sentiment using the Google Maps API and React. The front-end of this project can be found
    <a href="https://github.com/02-2018GroupRepo/twitterFeels">here.</a>
    We got back average sentiment scores between -1 and 1, 
    so we increased our sensitivity and made the following buckets to distinguish between the sentiment at each location:
<ul>
  <li>  -1 to -0.5 = Angry </li>
  <li>  -0.5 to -0.2 = Sad </li>
  <li>  -0.2 to 0.2 = Neutral </li>
  <li>  0.2 to 0.5 = Happy </li>
  <li>  0.5 to 1 = Very Happy </li>
</ul>
We plotted the sentiment using custom emoji icons on Google Maps.
</ol>

<h3>Screenshots </h3>
<br>

<p>
  The map view, showing sentiment of @HomeDepot and #HomeDepot tweets across the United States:
  <img src="https://github.com/02-2018GroupRepo/twitterFeels/blob/master/src/TwitterFeels_Screenshots/map.PNG"/>
  
  The data view, showing average sentiment at each location:
  <img src="https://github.com/02-2018GroupRepo/twitterFeels/blob/master/src/TwitterFeels_Screenshots/data.PNG"/>
</p>

