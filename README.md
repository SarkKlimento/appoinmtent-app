For the Angular Code We have a separate repository to be able to clear deploy it to Heroku

Step 1:
With help of UI, create sObject Appointment__c
And it's fields:
    Account__c - Lookup(Account)
    Account_Name__c - Text(255)
    Appointment_Date__c - Date
    Client_First_Name__c - Text(255)
    Client_Last_Name__c - Text(255)
    End_Time__c - Time
    Start_Time__c - Time

Step 2:
    Create Custom label:
        Name: AppointmentBadRequestMessage
        Value: Data of the request is empty or in invalid format.

Step 3:
    Deploy code from branch (Apex)

To test Angular page you can use my own page (https://sark-appointment-app.herokuapp.com)
Or host it on your own Heroku account.
To do so, you need to create a new app on Heroku,
Then in "Deployment method" select GitHubConnect them and choose the branch needed to deploy (With angular code)
After successful connection press "Deploy Branch"

Step 1:
    From setup find the "CORS"
    Create new
    For Origin URL Pattern - enter https://*.herokuapp.com
    Create new
    For Origin URL Pattern - enter your Heroku app address (https://sark-appointment-app.herokuapp.com as for me)
    
Step 2:
    From setup find the "Remote Sites Settings"
    Create new 
    For Remote Site URL - enter your Heroku app address (https://sark-appointment-app.herokuapp.com as for me)

Step 3:
    From setup find the "App Manager"
    Create "New Connected App"
    Select Enable OAuth Settings
    For callback URL - enter your heroku app page URL
    Selected OAuth Scopes - > Full Access(full)

Step 4: 
    In angular code find the service by path:
    src/app/shared/services/salesforce-restcallout-service

    And change consumerKey field value for your Connected app (Consumer Key)
    Change baseEndpoint to your developer edition endpoint with addition of "/services/apexrest/"
    Change redirect_uri to address of your Heroku app page 

Step 5:
    Once again in your Heroku UI click Deploy Branch

