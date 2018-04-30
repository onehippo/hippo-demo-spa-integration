# SPA++ Integration Demo Project for Hippo CMS and BloomReach Experience

Provides a seamless SPA++ integration demo for Hippo CMS and BloomReach Experience.
For details on SPA++, see [SPA++ for Seamless SPA Integration Experiences](https://www.onehippo.org/library/concepts/spa-plus/introduction.html).

Also, this demo project contains reusable React SPA example code and libaries.
For details on React Demo, see [About React Demo](spa/ABOUT_REACT_DEMO.md).

## Version Compatibility

| Demo Version   | Hippo CMS Version  |
|:--------------:|:------------------:|
| 1.0.x          | 12.3.x             |

Check [Hippo CMS Release Notes](https://www.onehippo.org/about/release-notes/release-notes-overview.html).

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

Second, build Demo CMS project enterprise edition with ```-Denterprise``` system property like the following:

```bash
$ mvn clean verify -Denterprise
```

The ```-Denterprise``` system property lets it pull in all the necessary enterprise modules.

## Run Demo CMS project

Build and install the demo like the following:

```bash
    $ mvn -P cargo.run
```

## Run Demo React app

To install and start the React application using Yarn, run the following commands
(you can skip `yarn install` if you have ever installed the dependencies before):

```bash
$ cd spa/react
$ yarn install
$ yarn start
```

You should now be able to access the React app in delivery tier at http://localhost:8080/site/ or http://localhost:3000.

## (Enterprise Edition Only) Test Channel Manager Integration

If you build and run Demo CMS project enterprise edition, then visit the Channel Manager by selecting **Channels** perspective after logging in CMS at http://localhost:8080/cms/, and select the default channel to manage.

You will be able to set component parameters, add, remove or drag&drop components in SPA.


## (For Project Maintainers Only) Tagging Process

For tagging processes, follow [Hippo Forge Release Process](https://onehippo-forge.github.io/release-process.html)
and the principles mentioned there
with the following exceptions:
- When bumping up project versions, bump up the versions for both [parent-pom/community](parent-pom/community) and
  [parent-pom/enterprise](parent-pom/enterprise) as well.
- Also, bump up the parent element's version in the root pom.xml as it points to either parent pom dependency in the previous step.
- As this project is just a demo, do not deploy to Maven repositories.
