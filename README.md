
# This is a commonist [website](https://commoningtoys.github.io/commoningWebsite/). It means that everyone can contribute to it. The source will open. The contribution will be revised to avoid damaging contribution.
## How to contribute to the website
1. Each contributor has to define it's own _contribution style_ by adding it to the [css](https://github.com/commoningtoys/commoningWebsite/blob/master/style.css).
```
myName{
    /*
    various
    css
    style
    implementations
    (please use comic sans!)
    */
}
```
2. The contribution to website have to be done in the [index.html](https://github.com/commoningtoys/commoningWebsite/blob/master/index.html)
Each contribution should look like this:
```
<div class="(sBlog, team, moodBoard, project or german)">
    <myName>
        My very own wonderful and meaningful contribution
        <img src="img/NameOfYourImage.jpg">
    </myName>
</div>
```
* The `class="(sBlog, team, moodBoard, project or german)"` defines the kind of entry for the website.
    * sBlog --> is the serious blog similar to the our general channel of our slack

    * team --> are the descriptions of the team members

    * moodBoard --> is similar to the random channel of the slack

    * project --> are all the entries strictly related to the project

    * german --> are all the contributions in that are in german, even if they fit in other categories

* The tag `<myName>` defines the personal contributing style and ends with a `</myName>`
* Images have to be defined with the `<img>` tag [(a comprehensive description of the tag can be found here)](https://www.w3schools.com/tags/tag_img.asp).

    There are two ways to do it:
    * `<img src="https//www.someFancyWebsiteForImage.com/NameOfYourImage.jpg">` it is possible to define the source a.k.a. `src` with a hyperlink to an existing image. DIFFICULTY: VERY LOW

    * `<img src="img/NameOfYourImage.jpg">` it is also possible to have your own image uploaded to this [folder](https://github.com/commoningtoys/commoningWebsite/tree/master/img) and to define the source as `img/TheNameOfYourImage.jpg`. DIFFICULTY: MEDIUM
4. Once you're done you click at the bottom of the page **Commit changes**, and you're done!
*********************
## TESTING TESTING TESTING
For the first timers using HTML there is the possibility to test the blog/website entries [here](https://jsfiddle.net/yyyyaaaannnnoooo/x1k4sxpt/18/)
*********************
### Comprehensive CSS reference can be found [here](https://www.w3schools.com/cssref/default.asp) and for HTML can be found [here](https://www.w3schools.com/tags/default.asp) 
*********************
# WEBSITE MANIFESTO
Fight against corporativist design!
1. This approach is a teaching approach, to add a contribution you need to learn the basics of HTML and CSS. Hopefully creative minds will use it to empower they very own practice, creating interesting new visuals.
2. This approach aims to criticize the standardized beauty of the WP, CargoCollective, Format etc. way of designing web pages.
3. Web design is simple!
    * DIY website are cool
    * prebuilt website aren't
    * responsive design is awful, and you can force viewers to watch your website on a desktop!
***********************
## TO DO:
### 1. add explanation for adding images to blog
### 2. add german button to website
