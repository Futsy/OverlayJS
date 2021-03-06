(function(window) {
    // You can enable the strict mode commenting the following line  
    // 'use strict';
  
    function functor() {
        var _overlay = {};
        var addedShadowLayers = false;

        var settings = {
            active: false,
            elements: [],
            zIndexDefault: 1000,
            step: 0
        };

        var setDefaultsForHTMLElement = function (type) {
            var element = document.createElement(type);
            element.style.position = 'absolute';
            element.style.top = '0';
            element.style.background = 'rgba(0, 0, 0, 0.7)';
            return element;
        };

        var createTopElement = function () {
            var topLayer = setDefaultsForHTMLElement('div');
            topLayer.id = '_overlay_shadow_top';
            topLayer.style.left = '0';
            topLayer.style.width = '100%';
            topLayer.style.height = '0';
            topLayer.onclick = buttonClicked;
            return topLayer;
        };

        var createRightElement = function () {
            var rightLayer = setDefaultsForHTMLElement('div');
            rightLayer.id = '_overlay_shadow_right';
            rightLayer.style.right = '0';
            rightLayer.style.width = '0';
            rightLayer.style.height = '0';
            rightLayer.onclick = buttonClicked;
            return rightLayer;
        };

        var createBottomElement = function () {
            var bottomLayer = setDefaultsForHTMLElement('div');
            bottomLayer.id = '_overlay_shadow_bottom';
            bottomLayer.style.left = '0';
            bottomLayer.style.width = '100%';
            bottomLayer.style.height = '0';
            bottomLayer.onclick = buttonClicked;
            return bottomLayer;
        }

        var createLeftElement = function () {
            var leftLayer = setDefaultsForHTMLElement('div');
            leftLayer.id = '_overlay_shadow_left';
            leftLayer.style.left = '0';
            leftLayer.style.width = '0';
            leftLayer.style.height = '0';
            leftLayer.onclick = buttonClicked;
            return leftLayer;
        };

        var createTextBox = function () {
            var textBox = setDefaultsForHTMLElement('div');
            textBox.id = '_overlay_text_box';
            textBox.style.left = '0';
            textBox.style.color = 'white';
            textBox.style.background = '';
            return textBox;
        };

        var addShadowLayers = function () {
            window.document.body.appendChild(createTopElement());
            window.document.body.appendChild(createRightElement());
            window.document.body.appendChild(createBottomElement());
            window.document.body.appendChild(createLeftElement());
            window.document.body.appendChild(createTextBox());
        };

        var getWidth = function () {
            return Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            );
        };
          
        var getHeight = function () {
            return Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight
            );
        };

        var hideElements = function () {
            for (var i = 0; i < settings.elements.length; i++) {
                settings.elements[i].element.style.zIndex = '';
            }
        };

        var setTopElementHidden = function () {
            var topLayer = document.getElementById('_overlay_shadow_top');
            topLayer.style.position = 'absolute';
            topLayer.style.left = '0';
            topLayer.style.top = '0';
            topLayer.style.width = '100%';
            topLayer.style.height = '0';
            topLayer.style.background = 'rgba(0, 0, 0, 0.7)';
            topLayer.onclick = buttonClicked;
        };
        
        var setRightElementHidden = function () {
            var rightLayer = document.getElementById('_overlay_shadow_right');
            rightLayer.style.position = 'absolute';
            rightLayer.style.right = '0';
            rightLayer.style.top = '0';
            rightLayer.style.width = '0';
            rightLayer.style.height = '0';
            rightLayer.style.background = 'rgba(0, 0, 0, 0.7)';
            rightLayer.onclick = buttonClicked;
        };
        
        var setBottomElementHidden = function () {
            var bottomLayer = document.getElementById('_overlay_shadow_bottom');
            bottomLayer.style.position = 'absolute';
            bottomLayer.style.left = '0';
            bottomLayer.style.top = '0';
            bottomLayer.style.width = '100%';
            bottomLayer.style.height = '0';
            bottomLayer.style.background = 'rgba(0, 0, 0, 0.7)';
            bottomLayer.onclick = buttonClicked;
        };
        
        var setLeftElementHidden = function () {
            var leftLayer = document.getElementById('_overlay_shadow_left');
            leftLayer.style.position = 'absolute';
            leftLayer.style.left = '0';
            leftLayer.style.top = '0';
            leftLayer.style.width = '0';
            leftLayer.style.height = '0';
            leftLayer.style.background = 'rgba(0, 0, 0, 0.7)';
            leftLayer.onclick = buttonClicked;
        };

        var setTextBoxHidden = function () {
            var textBox = document.getElementById('_overlay_text_box');
            textBox.style.position = 'absolute';
            textBox.style.left = '0';
            textBox.style.top = '0';
            textBox.style.display = 'none';
            textBox.style.color = 'white';
        };

        var setTextBoxPosition = function (rect) {
            var topArea = 0 + rect.top;
            var rightArea = getWidth() - rect.right;
            var bottomArea = getHeight() - rect.bottom;
            var leftArea = rect.left;

            var textContainer = document.getElementById('_overlay_text_box');
            if (topArea > bottomArea && topArea > rightArea && topArea > leftArea) {
                textContainer.style.right = '';
                textContainer.style.left = '0';
                textContainer.style.width = '100%';
                textContainer.style.top = '0';
                textContainer.style.bottom = '';
            }
            else if (rightArea > topArea && rightArea > bottomArea && rightArea > leftArea) {
                textContainer.style.right = '0';
                textContainer.style.left = '';
                textContainer.style.width = 'calc(100% - ' + rect.right + 'px)';
                textContainer.style.top = rect.top + 'px';
                textContainer.style.bottom = '';
            }
            else if (bottomArea > topArea && bottomArea > rightArea && bottomArea > leftArea) {
                textContainer.style.right = '';
                textContainer.style.left = '0';
                textContainer.style.width = '100%';
                textContainer.style.top = '';
                textContainer.style.bottom = '0';
            }
            else {
                textContainer.style.right = '';
                textContainer.style.left = '0';
                textContainer.style.width = leftArea + 'px';
                textContainer.style.top = rect.top + 'px';
                textContainer.style.bottom = '';
            }
            textContainer.style.display = 'inline';
            textContainer.style.boxSizing = 'border-box';
            textContainer.style.padding = '20px';
            textContainer.style.textAlign = 'center';
            textContainer.textContent = settings.elements[settings.step].text;
        };

        var setShadowPositions = function (rect) {
            var topElement = document.getElementById('_overlay_shadow_top');
            var rightElement = document.getElementById('_overlay_shadow_right');
            var bottomElement = document.getElementById('_overlay_shadow_bottom');
            var leftElement = document.getElementById('_overlay_shadow_left');

            topElement.style.height = rect.top + 'px';

            rightElement.style.top = rect.top + 'px';
            rightElement.style.width = 'calc(100% - ' + rect.right + 'px)';
            rightElement.style.height = (rect.bottom - rect.top) + 'px';
            
            bottomElement.style.top = rect.bottom + 'px';
            bottomElement.style.height = 'calc(100% - ' + rect.bottom + 'px)';
            
            leftElement.style.top = rect.top + 'px';
            leftElement.style.width = rect.left + 'px';
            leftElement.style.height = (rect.bottom - rect.top) + 'px';
        };

        var showElements = function () {
            if (settings.step >= settings.elements.length) {
                setTopElementHidden();
                setRightElementHidden();
                setBottomElementHidden();
                setLeftElementHidden();
                setTextBoxHidden();
                return;
            }
            settings.elements[settings.step].element.style.zIndex = settings.zIndexDefault;

            var tmp = settings.elements[settings.step].element.getBoundingClientRect();
            var rect = {
                top: tmp.top + window.pageYOffset,
                bottom: tmp.bottom + window.pageYOffset,
                left: tmp.left + window.pageXOffset,
                right: tmp.right + window.pageXOffset
            };

            setShadowPositions(rect);
            setTextBoxPosition(rect);
        };

        var buttonClicked = function () {
            settings.step += 1;
            showElements();
        };

        /**
         * Sets the overlay to its default values.
         * Removes all elements and hides.
         * Sets the default zIndex back to 1000
         */
        _overlay.clear = function () {
            settings.active = false;
            settings.elements = [];
            settings.zIndexDefault = 1000;
            settings.step = 0;
        };

        /**
         * Takes an HTML element and a text that will later be considered a step in the tutorial.
         * @param {element}
         * @param {text} 
         */
        _overlay.addElement = function (element, text) {
            if (typeof(element) === 'object' && typeof(text) === 'string') {
                settings.elements.push({
                    element,
                    text
                });
            } else {
                console.error('Invalid argument for function addElement got: ' + typeof(element) + 'and ' + typeof(text)  + ' expected: \'object\' and \'string\'');
            }
        };

        /**
         * If you use elements in your code that go over a z-index of 1000 change this to be higher if you want the overlay to be on top.
         * @param {zIndex} number
         */
        _overlay.setZIndexForOverlay = function (zIndex) {
            if (typeof(zIndex) === 'number') {
                settings.zIndexDefault = zIndex;
            } else {
                console.error('Invalid argument for function setZIndexForOverlay got: ' + typeof(zIndex) + ' and expected \'number\'');
            }
            return settings.zIndexDefault;
        };

        /**
         * Will show the overlay tutorial.
         */
        _overlay.enableOverlay = function () {
            settings.active = true;
            if (!addedShadowLayers) {
                addShadowLayers();
                addedShadowLayers = true;
            }
            showElements();
        };

        /**
         * Calling this will cause the tutorial to no longer be shown.
         */
        _overlay.disableOverlay = function () {
            settings.active = false;
            hideElements();
        };
        
        /**
         * Sets the settings variable directly.
         * @param {active} boolean
         */
        _overlay.setActive = function (active) {
            if (typeof(active) === 'boolean') {
                settings.active = active;
            } else {
                console.error('Invalid argument for function setActive got: ' + typeof(active) + ' and expected \'boolean\'');
            }
            return settings.active;
        };
        
        return _overlay;
    }

    // We need that our library is globally accesible, then we save in the window
    if (typeof(window.overlayTutorial) === 'undefined') {
        window.overlayTutorial = functor();
    }
})(window);
