# anon-feedback-slackbot

Slackbot that is triggered on slash command, publishing anonymous, public, and easy feedback to a channel.

# Motivations

## Background

I created this Slackbot for VandyHacks, the hackathon organization at Vanderbilt University in Nashville, Tennessee. In short, I am the current co-president, and wanted people to voice their feedback **anonymously**, **publicly**, and **easily**.

## Problems

We found that the feedback loop was inefficient for people that had criticism, but did not feel as if they had the power to speak up in meetings or in public Slack channels. Therefore, we needed something that was **anonymous**.

Furthermore, we needed something that was **public**. Our previous usages of Google Forms or private messages meant that it was difficult to see if information and criticisms were being created or not. Therefore, we wanted to be **transparent**.

Finally, we wanted something that was **easy to use** to reduce friction, allowing people to submit feedback in a centralized location–making Slack the obvious choice, since most non-meeting discussions are held on Slack.

# Solution

A Slackbot that could be called with a simple [slash command](https://api.slack.com/interactivity/slash-commands) was the **easiest way** for users to be able to submit feedback from a global context.

Furthermore, since the Slackbot would be the one outputting the feedback, it would be **anonymous**.

Finally, since the Slackbot was submitting it publicly to a channel where not only the recipient of the feedback could respond in a thread but also anyone else could view the feedback and respond, it would be **very public**.

# Demonstration

Video demonstration of using the slash command:
[![Photo Preview](https://img.youtube.com/vi/J1mZRLuweZY/maxresdefault.jpg)](https://youtu.be/J1mZRLuweZY)

# Installation

First, start off with installing npm and git if you do not have them.

You will need to create an application on your Slack workspace with permissions for `Incoming Webhooks` and for `Slash Commands`. Save the Webhook URL that's exposed for you–that will become the `SLACKBOT_WEBHOOK` private environment variable that you will utilize later.

Then, `git clone` the repository, and then `npm i` the repository. You will need to create a `.env` file with your `SLACKBOT_WEBHOOK`.

## Deployment

There are a couple of options for deployment–I used [Zeit Now](https://zeit.co/dashboard) for ease of rapid deployment.

-   If using it, then deploy your bot utilizing `now --prod` in your terminal. Use the resulting URL with `/action` afterwards for your slash command url.
-   In order to export the environment variables for Zeit Now, you must follow the syntax `now secrets add <secret-name> <secret-value>`. Here, you should therefore say `now secrets add SLACK_WEBHOOK <your_webhook_url_here>`. For more documentation on secrets, refer to [their article on severless functions here](https://zeit.co/docs/v2/serverless-functions/env-and-secrets).

# Future Steps

-   [ ] Integrate OAuth process for other organizations to adopt
-   [ ] Link up with interesting web interface; integrate with VandyHacks documentation systems and Notion if they come out with an API
-   [ ] OAuth for other organizations
-   [ ] Install button for homepage
