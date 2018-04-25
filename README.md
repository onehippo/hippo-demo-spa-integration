# hippo-addon-spa-integration

Hippo SPA Integration Demo

Provides ready-to-use APIs and components to integrate SPAs with the CMS.

## Release Version Compatibility

| Add-on Version | CMS Version  |
|:--------------:|:------------:|
| 2.x            | 12.3+        |

## Run the Demo CMS project

The demo project is located in the `./demo` folder. Build and install using the regular commands:
```bash
    $ cd demo
    $ mvn clean verify
    $ mvn -P cargo.run
```

### Run the Demo React app
 
To install the React app. This requires you to either have the Node or Yarn package manager 
installed. If you do not have any of these installed, either go to the [Node website](https://www.npmjs.com/get-npm) or 
the [Yarn website](https://yarnpkg.com).

To install the React application using Node, run the following commands from the `demo` folder:
```bash
    $ cd app-examples/react
    $ npm install
    $ npm start
```

Alternatively, to install the React application using Yarn, run the following commands from the `demo` folder:
```bash
    $ cd app-examples/react
    $ yarn install
    $ yarn start
```

You should now be able to access the React app at `http://localhost:3000/site`. Please note that `http://localhost:3000`
will not work locally, because you need to pass the context-path of the site through the URL.

When viewing the site in the CMS, select `React` as the front-end renderer in 
`Channel Settings` in the Channel Manager of the CMS.

All done! For those that used the old version of the React app, you no longer need to run a separate WebSockets server.
