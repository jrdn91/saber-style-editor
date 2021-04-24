# saber-style-editor

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changes since the last commit.

[Read more about testing.](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run generate`

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s and `container`s.

### `npm run deploy` or `yarn deploy`

Install and configure AWS CLI [following the instructions here](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

`npm version {patch|minor|major}` will increase the version number and make a commit and tag in git.

`npm run deploy` or `yarn deploy` creates a `build` directory with a production build of your app. It then uploads the app to the specified bucket name in the `scripts` property of `package.json`.

`npm run deploy:staging` or `yarn deploy:staging` will upload the built code to the staging environment.