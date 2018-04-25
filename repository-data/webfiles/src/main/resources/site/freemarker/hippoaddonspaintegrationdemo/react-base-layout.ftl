<!DOCTYPE html>
<#include "../include/imports.ftl">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sample React App showcasing BloomReach Experience integration">
    <meta name="author" content="Robbert Kauffman, Solution Consultant, BloomReach">

    <title>React App</title>

    <link rel="stylesheet" href="<@hst.link path="/static/spa/css/bootstrap.css"/>" media="screen">
    <link rel="stylesheet" href="<@hst.link path="/static/spa/css/carousel.css"/>" media="screen">
    <link rel="stylesheet" href="<@hst.link path="/static/spa/css/custom.css"/>" media="screen">

    <link rel="shortcut icon" href="<@hst.link path="/static/spa/favicon.ico"/>">

  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="header">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">React Demo</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="<@hst.link siteMapItemRefId="root"/>">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="<@hst.link path="/news"/>">News</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="container marketing" id="root">
    </div>
    <footer>
      <p>&copy; 2018 BloomReach, Inc.</p>
    </footer>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="<@hst.link path="/js/jquery-2.1.0.min.js"/>"><\/script>')</script>
    <script src="<@hst.link path="/static/spa/js/popper.min.js"/>"></script>
    <script src="<@hst.link path="/js/bootstrap.min.js"/>"></script>
    <#assign baseUrl="http://localhost:3000"/>
    <script>
      // load React app from local Node server
      $.getScript( "${baseUrl}/static/js/bundle.js" )
        .fail(function() {
          // fallback to bundled React app in static resource
          $.getScript( "<@hst.link path="/js/react-example-app.js"/>" );
        });
    </script>
  </body>
</html>