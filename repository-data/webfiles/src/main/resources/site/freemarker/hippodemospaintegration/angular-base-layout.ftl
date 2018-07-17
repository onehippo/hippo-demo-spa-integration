<!DOCTYPE html>
<#include "../include/imports.ftl">
<#assign baseUrl="http://localhost:3000"/>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sample React App showcasing BloomReach Experience integration">

    <title>Example Angular App</title>
    <base href="/">

    <link rel="stylesheet" href="${baseUrl}/assets/css/bootstrap.min.css" media="screen">
    <link rel="stylesheet" href="${baseUrl}/assets/css/carousel.css">
    <link rel="stylesheet" href="${baseUrl}/assets/css/custom.css" media="screen">

    <link rel="icon" type="image/x-icon" href="${baseUrl}/favicon.ico">

  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <app-root></app-root>
    <footer>
      <p>&copy; 2017 BloomReach, Inc.</p>
    </footer>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="/assets/js/jquery.min.js"><\/script>')</script>
    <script src="${baseUrl}/assets/js/popper.min.js"></script>
    <script src="${baseUrl}/assets/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${baseUrl}/inline.bundle.js"></script>
    <script type="text/javascript" src="${baseUrl}/polyfills.bundle.js"></script>
    <script type="text/javascript" src="${baseUrl}/styles.bundle.js"></script>
    <script type="text/javascript" src="${baseUrl}/vendor.bundle.js"></script>
    <script type="text/javascript" src="${baseUrl}/main.bundle.js"></script>
</html>