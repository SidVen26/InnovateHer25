# Safe-space

## Inspiration
An average of 24 people per minute are victims of rape, physical violence, or stalking by an intimate partner in the United States — more than 12 million women and men over a single year. On top of that, with the laws regarding women's health changing daily, we thought of creating a web application that provides resources and a community for women in crisis. 

## What it does
Our app begins with each user logging in or signing up with an account to ensure their data is private to them, we also disclaim that if there is a life-pressing situation to call the domestic violence hotline or 911 we note that this app is a tool and not a replacement for serious help.  After logging in users are greeted with a  Ai chat bot that explains our features, and also is trained to talk and provide quick, concise information to anyone seeking help in situations relating to women's health and safety. In addition to our chatbot, we have a map feature that automatically finds nearby women's shelters, clinics, and or emergency services near the user and a cohesive resource page that has the phone numbers and website links to national organizations relating to mental health, LQBTQ, domestic violence, and more.

## How we built it
We first drew a page layout/flow chart to get an idea of how we wanted the app to look and work and then from there we decided what our tech stack would be here's a rundown:

- We used Next.js and React as our front-end framework to create an easy-to-use UI that projected a calm, welcoming feeling to anyone opening our app.

- For our log-in/sign-up page we utilized Auth0 as recommended by MLH, this allowed us to integrate user authentication seamlessly into our app.

- For our chatbot, we wanted to utilize Groq APIs but in a way where we could integrate them into our Next.js framework, we did our research and found some tutorials online this one was, especially useful [link](https://dev.to/gregharis/build-your-first-ai-chatbot-a-react-and-typescript-project-with-groq-cloud-api-1dp3), and from there we also used groq playground to create a custom system prompt and API key to make our chatbot more focused on women health and safety.

- For our Locator we utilized Google Maps API to create a "women-focused" map that allows users to find resources near them with a click of a button.

## Challenges we ran into
One of our biggest challenges was implementing our locator feature. During our initial research, Google Maps API seemed like the ideal choice for our locater as it was the most common and reliable way to create a locating application but as we started building our locator we kept running into errors, our map was not correctly identifying specifically women's shelters and clinics. To debug, we utilized AI resources such as chatGPT and online resources such as StackOverflow and Google API documentation. In the end, after researching we learned that because we were using the free "find places" version of the API we were limited to what we could locate, in the future we would consider using another API or investing in the more advanced features such as "text search" and "nearby places" from the google API. 
## Accomplishments that we're proud of
We are excited to have a functioning app with a user-friendly UI and a knowledgeable chatbot that is quick and accurate in information. We are also proud of all the new skills we have developed from learning how to utilize groq API to refining our front-end development skills.
## What we learned
As a team we learned the importance of project management and planning, because we took the time to solidify our layout and goals for the project we mitigated unnecessary stress as the hack-a-thon went on, in addition, we all gained skills in all the new technology we utilized as mentioned before we learned how to integrate groq into our projects, use Auth0 to create a safe log in pages, and google Maps API to create locating features. 
## What's next for Safe Space
In the future, we hope to focus on improving the discreet features of our app such as creating a changeable icon to allow that app to be hidden on a user's phone,  further refining our front-end, and making our locator more accurate. 
