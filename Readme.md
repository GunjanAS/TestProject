# Test Project 



The application can be used to generate a table of many columns and ‘N’ rows which can be downloaded in the csv format at your own machine.  The user has to input:
1.  number of rows i.e. ‘N’
2. Column Name
3. Type of Attribute which can be String or Integer Range
4. A collection of string or Integer Range as per the type chosen 

The application will randomly choose a string from the set of strings or a number from integer range and will display the result in the field. It is hosted on AWS and the link is :
http://ec2-54-90-221-19.compute-1.amazonaws.com:3000/


# How to run the application?


1. Input the value of N which should be a positive number and greater than 0.
2. Select from the “Type” dropdown to choose the type of domain. It can be either String or an Integer Range
3. In the Attribute Name field, input the Column name
4. If the type chosen is String, enter the set of strings separated by commas
	Eg: “New jersey, New York, Florida, Georgia…. “
If the type is Integer range, enter the range separated by a comma
   Eg. 10,2000
5. Click on the “Add another column” if you want more than 1 column and repeat the steps from 2 to 4.
6. After adding all the columns and their required fields, click on the “Generate button”.      A csv file will be downloaded. Click on the csv file to see the required results.

## Application Structure
The application's frontend is built on **React** framework and backend's framework is built on **Flask**. It has two folders :
 1. Client: contains all the react files. App.js file has the main frontend code and calls the backend using API
 2. Server: has flask related files.
 i) Controller.py: This handles the API call by client and passes the values from the frontend to Manager.py file
 ii) Manager.py: This file contains the main logic of choosing the strings from a set or an integer from the range as per the user requirements. It also handles the function of saving the result into csv file.
                        
 
     

# Features
1. Validations on every field. The application will not run until all the field are filled. 
2. After clicking on Generate button, a download link is created which is then removed after the file is downloaded .
3. Every time a csv file is downloaded, the filename has an unique ID.
4. In order to handle large values of "N", it is divided in different batches and size of each batch size is 1000. By dividing it into batches , the application will run faster as the memory is being freed and data is being saved after completing one batch size.
5. After clicking on the "Generate" button , it is disabled until the file starts downloading.
6. Both frontend and backend are deployed on AWS.
7. Deployed React using Serve

## Observations
The run time of the application was monitored by changing the the batch size. The batch size ranged from 1 to 100000 and found that neither a very small batch size nor a large batch size would help in running the app faster. With batch size of 1000, the application worked the best.



# Improvements

1. Validation on the Domain field if the input is different from the type chosen from the dropdown.
2. To deploy on production level server like nginx 
