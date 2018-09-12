# WORKING ON THE WEBSITE

This is a small guide on how to add content to the project [website](http://commoning.rocks/).

## Computer set up

1. Download `git` [here](https://git-scm.com/download/mac)

2. Copy the website repository to your computer

   1. go to the [repository](https://github.com/commoningtoys/commoningtoys.github.io)

   2. click on the green button `clone or download` and copy the url it should look like this:

      ```
      https://github.com/commoningtoys/commoningtoys.github.io.git
      ```

   3. open the terminal by typing terminal in the spotlight search

   4. in terminal type the following commands

      ```bash
      # this is a quick an dirty introduction to bash
      # the dollar sign represents a new line of command
      # it is usually followed by the name of the owner of the computer (Yann Martins in my case), or by the name of the computer (MacBook of Yann Martins) like this
      $MacBook of Yann Martins
      # or
      $Yann Martins
      # or the other way around 
      Yann Martins $
      # to simplify this I will use this form
      $you
      # when typing the commands I will list below ignore this $you just copy the commands after
      
      
      # first we use the command cd to [c]hange [d]irectory
      # you need to choose where to store the local version of the website
      # I usually have a folder called WEB inside my Documents folder therefore I usually type
      $you cd Documents/WEB/
      
      # but you may want to store it somewhere else therefore  
      $you cd /path/to/folder/where/you/want/to/keep/the/website
      
      $you git clone https://github.com/commoningtoys/commoningtoys.github.io.git
      # you type git clone and than you paste the url you copied from the repository, this should start the downloading process.
      ```

3. Open the repositiory with a good text editor I suggest VS Code (download it [here](https://code.visualstudio.com/))

4. To open a repository in a text editor, just drag and drop the repository folder on the application icon

5. Add extensions to VS Code

   1. Click the extension icon, the fourth from the top, or type ⬆ + ⌘ + X
   2. search for `Git History` and `Live Server`, download and enable them

6. VS Code comes with a built in terminal that you can open from the menu bar by clicking `view` => `Terminal`, alternatively you can open it by typing ⌃ (control)  + `

## Working on the website with git

This will explain how to work on the website using git as version control. By using it you will always create a working copy of the website where you do the changes that you can control locally for errors and so on. you can than merge the changes to the `master` branch of the repository.

Here below I will explain some git functions and HTML syntax

1. make a new working branch

   ```bash
   # git works like a tree there is a master branch and all the side branches to further develop or experiment the website / program. We will use this feature to develop the website safely. the idea is that we create a new branch everytime we need to add some content, we test it locally and than we merge it to the master branch and than we upload it to the web.
   
   $you git branch new-branch-name
   # this function creates a new branch named new-branch-name
   $you git checkout branch-name
   # this function switches between the existing branches
   $you git branch
     kayla-test
   * master <= this is the branch git is currently on
     nodeJS
     safeCopy
     shintaro
   # this function shows the existing branches
   
   # a shortcut command is to type 
   $you git checkout -b new-branch-name
   # this command creates a new branch and makes it as current active branch 
   
   $you git branch -d new-branch-name
   # this command deletes the branch
   
   ```

2. With the active working branch we start to add content to the website. In the index.html file there is clear position from where to insert the content. It is very important to put the newer entries at the top, better said directly under the comment that says `insert your contribution from here`

   ```html
   <!-- a div with an image -->
   <div class="process"> <!-- here you define the type of content | check the README for more info-->
       <div>
           <Shintaro>
               <h1>May 2018, Debriefing + Next Steps</h1> <!-- title of the content -->
           </Shintaro>
           <img src="img/may.JPG"> <!-- adding an image | check the README for more info-->
           <shintaro>
               SOME TEXT!
           </Shintaro>
       </div>
   </div>
   
   <!-- a div with a video -->
   
   <!-- April 2018, First Contact -->
   <!-- it is important that we leave some space between the divs so that we always now where one starts and ends, avoiding overlapping div tags. TO do this we put a commnet between the divs with the title of the following div-->
   
   <div class="process">
           <div>
               <Shintaro>
                   <h1>April 2018, First Contact</h1>
               </Shintaro>
               <img src="img/lena.JPG">
               <shintaro>
               TEXT
               </Shintaro>
               <img src="img/nena1_.png">
               <div class="video-container"> <!-- make a div that is a video container -->
                   <iframe src="https://player.vimeo.com/video/275850147" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
               </div>
           </div>
       </div>
   
   ```

3. Now that you added your content and it looks good locally is time to merge your changes to the master branch

   ```bash
   # first pull down all of the new content
   $you pull origin master
   
   # first we need to add the changes to git to do so we type
   $you git add . && git commit 
   # this command wil add the changes to the current branch and will ask you to leave a comment to comment it you need to write "update index.html with content 'title of the content'"
   
   # once this is done you need to merge the branches
   # first we change to the master branch
   $you git checkout master
   # than we merge the two branches
   $you git merge working-branch master
   # this will output the changes that have been done 
   # after that you need to delete the working-branch
   $you git branch -d working-branch
   
   # if you make to complex changes, the merge function will prompt you to check all the changes, this is a tedious work and if it happens is better if you contact me.
   
   # now you are ready to push your changes to the web
   
   $you git push origin master
   # now everything is online
   ```



## now we should be done!

 