# OverlayJS

This small library allows anyone to provide their users with a simple walkthrough that specifies what an element does.

It works by creating 4 divs that cover everything except for the element.

CSS support required for library: `rgba(number, number, number, number)` ([IE >= 9, FF > 2](https://caniuse.com/#feat=css3-colors))

## Installing

Simply include the JS file in your HTML.

```
<script src="overlay.min.js"></script>
```

## Small example

This example will display two elements that will be provided a walkthrough for after 5 seconds.

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Overlay example</title>

        <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet">
        <script src="overlay.min.js"></script>
    </head>
    <body style="font-family: 'Shadows Into Light', cursive;">
        <input type="text" placeholder="Some text..." id="input-id">
        <div id="div-id">Some more text</div>
        
        <script>
            setTimeout(() => {
                window.overlayTutorial.addElement(document.getElementById('input-id'), 'This is an input field');
                window.overlayTutorial.addElement(document.getElementById('div-id'), 'This is a div');
                window.overlayTutorial.enableOverlay();
            }, 5000);
        </script>
    </body>
</html>
```

## Live demo

[Click here](https://futsy.github.io/overlayjs/index.html).

## Note

Subsequent calls to the `enableOverlay()` function require a call to `clear()`. Example:

```
window.overlayTutorial.addElement(document.getElementById('input-id'), 'This is an input field');
window.overlayTutorial.addElement(document.getElementById('div-id'), 'This is a div');
window.overlayTutorial.enableOverlay();

// Call clear here to empty the tutorial and reset the steps
window.overlayTutorial.clear();

window.overlayTutorial.addElement(document.getElementById('div-id'), 'Something else');
window.overlayTutorial.enableOverlay();
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
