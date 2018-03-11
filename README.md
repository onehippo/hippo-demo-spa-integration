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

The next step is to install and run one of the SPA's. Either follow the instructions for the Angular app or the React 
app below.

### Installing the example Angular application

To install the Angular application you require to have the Node package manager installed. Go to the 
[Node website](https://www.npmjs.com/get-npm) to download it.

To install the Angular application, run the following commands from the main folder:
```bash
    $ cd app-examples/angular
    $ npm install
    $ npm start
```

You should now be able to access the Angular app at `http://localhost:3000/site`. Please note that 
`http://localhost:3000` will not work locally, because you need to pass the context-path of the site through the URL.

When viewing the site in the CMS, you will first have to select `Angular` as the front-end renderer in 
`Channel Settings` in the Channel Manager of the CMS.

### Installing the example React application
 
To install the React application. This requires you to either have the Node or Yarn package manager 
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

When viewing the site in the CMS, you will first have to select `React` as the front-end renderer in 
`Channel Settings` in the Channel Manager of the CMS.

All done! For those that used the old version of the React app, you no longer need to run a separate WebSockets server.

## Enabling CORS

You can add CORS supporting response headers by adding the following in 
`site/src/main/resources/META-INF/hst-assembly/overrides/addon/com/onehippo/cms7/genericresource/entitybuilder/cors.xml` 
(the filename can be different):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.1.xsd">

  <bean id="genericResourceEntityCustomResponseHeadersValveSettableHeaders"
        class="org.springframework.beans.factory.config.ListFactoryBean">
    <property name="sourceList">
      <list>
        <bean class="org.hippoecm.hst.util.DefaultKeyValue">
          <constructor-arg value="Access-Control-Allow-Origin" />
          <constructor-arg value="http://localhost:3000" />
        </bean>
      </list>
    </property>
  </bean>

</beans>
```

## Using the API

You can access the API by requesting any regular site URL and prefixing it with the mount URL that has been setup in 
`Adding the module to your project`.

For example:
```bash
    $ curl http://localhost:8080/site/resourceapi/news
```

## More information

This addon leans on the Generic Resource Entity Builder addon for generating the API response. For more information 
about the addon, see 
[onehippo.org](https://www.onehippo.org/library/enterprise/services-features/greb-api/introduction.html).