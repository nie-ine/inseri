
# 5. Data Visualisations
## 5.1. Apps already existing in Inseri

Data visualisation is a very important aspect of the academic data presentation, and it allows the reader grasping the logic of the presentation in a matter of seconds. 
For the scholar, this block is of importance because visualisation helps in all of the 7 areas of academic work listed in the introduction. For example,

1. It allows to control raw data, for example, "how many images from Japan from 2005 do I have?"
2. It allows to correct the metadata, as the faults become visible.
3. It is the most basic tool helping the comparison of the data subsets.
4. The visualisation of the data model and the SWT results can even lead to the unexpected academic discoveries.
5. Finally, it helps the reader to understand the data.

There is a multitude of applications to visualise data that have been already incorporated into Inseri and are stable.
Let us make a list of them and explore them one by one via modifying data in JSON. (Other options, such as direct addressing the RDF data and the desktop upload are under development.)
The applications that can be used as per 2020.03.31 include:
				
1. Bar Chart 	d3.js, interactive			
2. Stacked Bar Chart 	d3.js, data visualisation
3. Pie Chart 	d3.js, data visualisation
4. Radial Bar Chart 	d3.js, data visualisation
5. Sankey 	d3.js, data visualisation	
6. Line Chart 	d3.js, interactive	
7. Chord diagram 	d3.js, data visualisation

### 5.1.1. Bar Chart 
This visualisation format fits best to visualize the simplest data sets, which are uniform and flat. For example, we have collected images from many different countries, and we would like to see how many images do we have per each country. 
(If we would need to add the year of collect, or the gender of the author of the image, for example, the Stacked Bar Chart is more appropriate.)

Click on the "Lighthouse" and select Bar Chart from the list of applications.
It will open a form with a predefined visualisation, which is very useful as the beginners can modify it directly.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.01.png" alt="Preconfigured Bar Chart upon opening of the app" width="500"></p>

Following the same procedure as we learn in O. Introduction, the user should click on the name of the application to access the options. What we need, is an option for Input data.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.02.png" alt="Bar Chart input data options" width="500"></p>

Within that frame, the user should select "Change current data". Other options shall be explained later, i.e. for queries, there will be a special block of Tutorials.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.03.png" alt="Bar Chart input data options 2" width="200"></p>

A new frame will open, which includes the file name (as in Inseri storage), date of modification, and the server URL. The user should click on "Get JSON object".

<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.04.png" alt="Accessing JSON" width="500"></p>

In the empty frame a modifiable JSON code appears.
<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.05.png" alt="Accessing JSON 2" width="500"></p>

Suppose we need to add some real project data, for that we shall use (with Project permission) the data of the "Drawings of Gods" project, from the University of Lausanne, state 2020.03.31, and that data is from [https://ddd.unil.ch/](https://ddd.unil.ch/)

We shall create a Bar Chart representing visually how many images were collected in each country, and the data is as follows:

1. Argentina, 82 images
2. Brazil, 139 images
3. Iran, 3032 images
4. Japan, 142 images
5. Nepal, 13 images
6. Netherlands, 195 images
7. Romania, 756 images
8. Russia, 753 images
9. Switzerland, 1031 images
10. USA, 982 images

In order to do that, we need to do 3 things:

* update the number of columns, by copy-pasting the part of code for a single column.
* we need to update the labels, by replacing the "first bar", etc. with a name of the country.
* Finally, we need to update the values with the real numbers of images.

The modified part of Json is now as follows:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.06.png" alt="Modified JSON" width="500"></p>

Before closing, it is an absolute must to click on "Save and update Json object."

Having clicked on save and reload, we obtain the following result:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.07.png" alt="Number of images per country" width="900"></p>

Finally, the user can try to find better scale options by simply modifying the number in "Scale Bar Chart" above. It is also possible  to rename the whole, so it is not called a "Bar Chart", but a real name. In order to do this, the user should click on the "Bar Chart", and select the first option, which is "Title and size", and simply give the Chart a new name and save it.

<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.08.png" alt="Options frame with the Bar Chart as name selected" width="700"></p>

Resulting name modification:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-03/Tutorials/Your%20scientific%20publication%20A-Z/1.%20Introduction/5V.09.png" alt="Name of Bar Chart modified" width="700"></p>

<p>As of June 2020, there is a new option, allowing to add a short description either of the application itself or of the data being presented. (Under implementation)</p>

### 5.1.2. Stacked Bar Chart 
The Stacked Bar Chart is a perfect visualisation tool for those cases, when the datasets are uniform, all like in the Bar Chart above, but what is important, is to also make the viewer aware of the subgroups of data within each single data set. 

Addressing again the data from Bar Chart example, we would need the Stacked Bar Chart if we would like to see during which years the images where collected in each country, or who drew those images (gender), of what was the age of the participants. Let us visualise the 2nd proposal, in which we shall add 3 genders to the existing data: female, male and unknown. 

1. Argentina, 82 images: F: M: U:
2. Brazil, 139 images: F: M: U:
3. Iran, 3032 images: F: M: U:
4. Japan, 142 images: F: M: U:
5. Nepal, 13 images: F: M: U:
6. Netherlands, 195 images: F: M: U:
7. Romania, 756 images: F: M: U:
8. Russia, 753 images: F: M: U:
9. Switzerland, 1031 images: F: M: U:
10. USA, 982 images: F: M: U:

Let us open a Stacked Bar Chart, as before (see Bar Chart above.)
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.10.png" alt="Stacked Bar Chart, view on opening" width="500"></p>

Let us modify the Json by the same steps as we did in Bar Chart above.
Here is the preset Json:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.11.png" alt="Original Json" width="500"></p>

Here we need to 
* add missing columns
* delete unnecessary subcolumns
* rename the columns
* add the numerical data to each of the subpart of each column.

Resulting Json (part):
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.12.png" alt="Modified Json (part)" width="500"></p>

And here is the resulting Stacked Bar Chart after renaming:
<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.13.png" alt="Final Stacked Bar Chart" width="900"></p>

### 5.1.3 Pie Chart

This visualisation tool is a good choice when we need to represent the non-overlapping parts constituting whole. The app comes with a preset example, below:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.14.png" alt="Preset Pie Chart" width="700"></p>

Following the procedure described in 5.1.1, in the Bar Chart, please get the Json object:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.15.png" alt="Preset Pie Chart Json" width="500"></p>

We shall use the same example from DDD project, namely, how many images do we have by country, from the set of 7125 images, addressed in the Bar Chart, 5.1.1.

All we need to do, is 

* to add more parts of the pie
* to rename the labels by countries
* to change the numerical values.

The resulting Json looks like this:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.16.png" alt="Modified Json" width="500"></p>

The final Pie Chart, after renaming and some rearrangements of the parts of the pie, looks as follows:

<p><img src="https://github.com/nie-ine/inseri/blob/2020-04/Tutorials/Your%20scientific%20publication%20A-Z/5.%20Visualise%20Data/5V.17.png" alt="Pie Chart with DDD project data" width="700"></p>

The trick to make parts visible, if they are of very unequal size, like in our example, is the following. Let us imagine the Pie Chart as a clock, and the first part of the pie that we script in Json starts at midnight. Knowing that, the user should arrange the slices of the data in such a way, that the smallest are placed between 2 and 4 a.m. Then their labels are better visible.
Another suggestion, is to alternate the slightly bigger and the smaller slices in that 2-4 a.m. range.


## 5.2. Apps which are external, but useful
