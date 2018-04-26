# hippo-addon-spa-integration

Hippo SPA Integration Demo

Provides ready-to-use APIs and components to integrate SPAs with the CMS.

## Release Version Compatibility

| Demo Version   | CMS Version  |
|:--------------:|:------------:|
| 2.0.x          | 12.3.x       |

## Build Demo CMS project

**Note**: If you are a developer and want to build with SNAPSHOT version in ```develop``` branch, then you should append
```-Dhippo.snapshots``` in each Maven command shown below.

There are two editions: (a) Community Edition and (b) Enterprise Edition.

Demo CMS project community edition shows how SPAs can be integrated in Delivery tier.

Demo CMS project enterprise edition shows how SPAs can be integrated in Channel Manager in addition.

Each edition is differentiated by the project's parent POM dependency.
So, before building CMS project, you need to build/install a proper parent POM project first as instructed below.

### Build Demo CMS Project community edition

First, build/install Demo CMS project community edition's parent POM project like the following:

```bash
$ mvn -f parent-pom/community/pom.xml install
```

Second, build Demo CMS project community edition like the following:

```bash
$ mvn clean verify
```

### Build the Demo CMS Project enterprise edition

First, build/install Demo CMS project enterprise edition's parent POM project like the following:

```bash
$ mvn -f parent-pom/enterprise/pom.xml install
```

Second, build Demo CMS project enterprise edition with ```-Dbre``` system property like the following:

```bash
$ mvn clean verify -Dbre
```

The ```-Dbre``` system property lets it pull in all the necessary enterprise modules.

## Run Demo CMS project

Build and install the demo like the following:

```bash
    $ mvn -P cargo.run
```

### Run Demo React app

To install and start the React application using Yarn, run the following commands
(you can skip ```yarn install`` if you have ever installed the dependencies before):

```bash
$ cd spa/react
$ yarn install
$ yarn start
```

You should now be able to access the React app at ```http://localhost:8080/site``` or ```http://localhost:3000```.
