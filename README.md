# Breaking Bad API

### What Is This Project...!

This project was a practice for me on APIs. So i found [**The Breaking Bad API**](https://breakingbadapi.com/) by Tim Biles.  
After reading API documantation the idea of this website came up to my mind why not..!


### What I Used For This Website:

1. HTML
2. CSS
3. Javascript
4. SASS


### Pages Of The Website :

The website consists of **6** pages:
1. **Home Page.** Demo For Other Pages
2. **Characters Page.** Contains All Breaking Bad & Better Call Saul Characters.
3. **Episodes Page.** Contains All Breaking Bad & Better Call Saul Episodes.
4. **Quotes Page.** Contains Characters Famous Quotes.
5. **Death Page.** Contains Breaking Bad & Better Call Saul Dead Characters.
6. **About Page.** Contains My Accounts & Notes About Copyrights.


### Website Features:

* **Search**: You can search almost for everything. You can search for ***characters***, ***episodes***, ***quotes*** and ***dead characters***.
  > How to use search the right way:
  >   * For Searching Characters: Write character name, and the characters will be filtered.
  >   * For Searching Episodes: you ***must*** write episode ***full name***. WHY that because API *doesn't support* searching episodes with name only with id .So i did a tricky solution ,but the problem with it that you must write episode's full name . (i 'll find better way soon).
  >   * For Searching Quotes: you ***must*** write character ***full name***. WHY, unfortunately API works that way :(
  >   * For Searching Dead Characters: Write character name, and the characters will be filtered.

* **Results Related To Specific Series:**
  > API doesn't support this functionality for **quotes** & **Dead characters**.
  
  > Here you have **3** options:
  >   * ***All***: Here you get all available data about characters, episodes, quotes and etc...
  >   * ***Breaking Bad***:  Here you get all available data Only about breaking bad series.
  >   * ***Better Call Saul***: Here you get all available data Only about better call saul series.
 
 * **Seasons**: API returns episodes. just episodes with `season` attribute , there is no array of seasons. So i looped through all episodes and make array for every season episodes for the two series. Then i used these arraies to came up with result you have already seen.
    > API doesn't support this functionality by default.

* **Responsive**: This website is responsive for all devices.

That it guys. Hoping that you like it.  
Have A Good Day & See You In Another Project.
