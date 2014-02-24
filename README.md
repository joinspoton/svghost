SVG rendering with PhantomJS. https://npmjs.org/package/svghost

---

Need prerendered SVG, like graphs in emails? SVGhost is for you! Easily integrated into your pipeline, it's compatible with major projects and services such as D3 and AWS. For example:

    var svg = d3.select('body')
      .append('svg')
      .attr('width', 100)
      .attr('height', 100);
    
    ...
    
    svghost(svg.node().outerHTML, {
        width: svg.attr('width')
      , height: svg.attr('height')
    }, function (err, img) {
      if (err) ...
      
      new AWS.S3().putObject({
          ...
        , Body: img
      }, ...);
    });

---

`svghost(svg, options, next)`

1. `svg`: String, XML document with an &lt;svg&gt; root.
2. `options`: Object.
  * `width`: Number, required.
  * `height`: Number, required.
  * `format`: String, optional. `png` (default), `gif`, or `jpeg`.
3. `next(err, buffer)`: Function, called with the error (if any) and the rendered image Buffer (if successful).

`svghost.getPhantom(next)`  
Returns the PhantomJS process (`err`, `proc`), starting it if necessary. Mostly useful for preloading PhantomJS, but you can also use the process normally.

`svghost.setPhantom(proc)`  
Sets the PhantomJS process. Only useful if you have custom settings or a custom version or an otherwise previously existing process you'd like to use for rendering.

`svghost.delPhantom()`  
Stops the PhantomJS process. Useful for cleaning up if you won't be using svghost for a while.

---

© 2014 [SpotOn](https://spoton.it), shared under the [MIT License](http://www.opensource.org/licenses/MIT).