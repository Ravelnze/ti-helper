# Twilight Imperium 4 Helper

This project is an app designed to assist while playing the 4th edition of the board game Twilight Imperium. The inspiration for this app came from a particular issue experienced in my play group where people will often miss or forget about a card, technology, ability, etc. until one or more turns later and the famous "Ugh... if only I'd remembered to use 'x' this game would be completely different!!" line comes out.

The premise of this app is to allow each player to input details about their game such as the faction they are playing, their planets, technology, any active laws (agendas), action cards, etc. and choose different game phases or combat round categories where all relevant information will be displayed.

While the app still works on bigger screens, it is designed to be viewed on mobile or tablet ideally using the "Add to homescreen" share option on iOS or the Android equivalent. Give it a try [here](https://ti.ravels.net/)! 

Hopefully it is fairly self explanatory but here is a brief overview of the flow: pick your faction and start the game, then choose the edit icon (notepad and pen) in the top right to start adding game components. Close the modal when done adding and choose various phases using the bottom navigation and tabs on screen when done. Rinse and repeat editing and viewing until you are the ruler of the galaxy!

Find a bug? Feel free to open an issue or better yet, submit a pull request :)

## Data
All data and images have been borrowed from the [Fandom Wiki](https://twilight-imperium.fandom.com/wiki/Twilight_Imperium_Wiki) for this project, a huge thanks to everyone who has contributed there! 

Some fields have been added to the data by myself for the purpose of creating this app, such as tagging all relevant components with their phase.

If there are errors in the game data feel free to open an issue or pull request to fix them. All game data is under the `src/data` directory and is in json format.

## Technical Details
This project is written in javascript using the [React framework](https://reactjs.org/), initialised with [Create React App](https://create-react-app.dev/) and under the hood uses a service worker to turn the app into a basic implementation of a PWA (Progressive Web App) which preloads all static files and allows offline capability. This basic implementation is a bit yucky with updates, if there is an update detected it will automatically force reload the user session which results in a flicker on the page however all state data is stored in the browsers local storage (there is nothing sensitive to worry about) and will resume directly after the refresh. 

This does however make for a nice experience on mobile using it as an 'app' by adding to homescreen, especially with the inclusion of some links in the information page which open as full screen pages.

To run the project, first install all dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) and get hacking!

## Build
There is a pipeline setup under Actions to automatically build and deploy the project when commits are made to the master branch in the github repository, this is not configurable and will only deploy to the specified S3 bucket.

## Future Plans
I intend to add some more functionality to this app including the following:
- Technology planner
- Build planner
- Turn planner
- Possible backend with multi-player capability/integration, eg. invite others to join a game, so everyone can easily view all public information.

I am open to suggestions/feedback for improvements or changes to streamline the app.

Hopefully this app helps some of you out there with your conquest of the galaxy.

PAX MAGNIFICA BELLUM GLORIOSUM!
