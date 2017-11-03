# hippo-addon-spa-integration

Hippo SPA Integration Addon

Provides ready-to-use APIs and components to integrate SPAs with the CMS. Uses the Generic Resource Entity Builder for 
generating API responses.

## Release Version Compatibility

| Add-on Version | CMS Version  |
|:--------------:|:------------:|
| 1.x            | 12.x         |
 
For release processes, see [Hippo Forge Release Process](https://onehippo-forge.github.io/release-process.html).

## Adding the module to an existing project

Add the following dependency to your root pom.xml:
```mvn
    <properties>
        ...
        <hippo-addon-spa-integration.version>CHANGE_TO_LATEST_VERSION</hippo-addon-spa-integration.version>
    </properties>
    
    ...
    
    <dependencyManagement>
        <dependencies>
            ...
            <dependency>
                <groupId>com.onehippo.cms7</groupId>
                <artifactId>hippo-addon-spa-integration</artifactId>
                <version>${hippo-addon-spa-integration.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

Then, add the following dependency to your site pom.xml:
```mvn
    <dependencies>
        ...
        <dependency>
            <groupId>com.onehippo.cms7</groupId>
            <artifactId>hippo-addon-spa-integration</artifactId>
        </dependency>
    </dependencies>
```

Finally, copy `extend-do-before-render.xml` from `src/main/resources/META-INF/hst-assembly/overrides` to the site 
module of your project. For example:
```bash
    $ cp src/main/resources/META-INF/hst-assembly/overrides/extend-do-before-render.xml PATH_TO_YOUR_PROJECT/site/src/main/resources/META-INF/hst-assembly/overrides
```

### Enabling API through mount configuration

To enable the API, you will have to configure an additional mount in the hosts configuration of your project.

Create an hst:mount node under the `hst:root` node. e.g, `resourceapi`, and set `@hst:namedpipeline` to 
`GenericResourceEntitySitePipeline`. Optionally, set `@hst:alias`, e.g. `resourceapi`.

Finally, to ensure generated site URLs link to the site and not the API, you have to configure a parameter on the mount 
that you just created. Before you do this, set `@hst:alias` on the `hst:root` node, or on the node of the mount you want 
to be used for generating site URLS. Specify a name for the alias, e.g. `main`. Now add the following properties to the 
new mount you created in the previous step: 
* `@hst:parameternames = renderMount`  
* `@hst:parametervalues = main` (the name you specified as the alias)

See `/hst:hst/hst:hosts/dev-localhost/localhost/hst:root/resourceapi` node of the demo project through CMS Console for 
an example.

## Customize the module

In case you want to customize the API response, you can either fork the project or copy all the classes and resources of 
the `src` folder to the site module of your project. Make sure to also copy over the dependencies from the pom.xml.

## Running the demo

The demo project is located in the `./demo` folder. Build and install using the regular commands:
```bash
    $ cd demo
    $ mvn clean verify
    $ mvn -P cargo.run
```

After startup, access the CMS at `http://localhost:8080/cms` and the site at `http://localhost:8080/site`.

### Installing the SPA / React sample application
 
The next step is to install the SPA / React application. This requires you to have the Yarn package manager installed. 
If you do not have yarn installed, go to the [Yarn website](https://yarnpkg.com).

To install the SPA / React application, run the following commands from the `demo` folder:
```bash
    $ cd spa-app
    $ yarn install
    $ npm start
```

You will also need to run an additional websockets server, which handles updates of the state of the React application 
when changes are made to a page in the CMS. Run the following command from the `demo` folder:
```bash
    $ node src/server
```

## Using the API

You can access the API by requesting any regular site URL and prefixing it with the mount URL that has been setup in 
`Adding the module to your project`.

For example:
```bash
    $ curl http://localhost:8080/site/resourceapi/news
```
