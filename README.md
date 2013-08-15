PerfectScrollFix
================

PerfectScrollFix is similar to ScrollFix (https://github.com/joelambert/ScrollFix) small script that partially works around the most common issue with using iOS5's overflow: scroll for fullscreen web apps.

The newly support `overflow:scroll` is a great addition and works well except under the following conditions:

- 	The scroll area is at the top and the user tries to scroll up.
- 	The scroll area is at the bottom and the user tries to scroll down.

In a native app, you'd expect the content to rubber band but in Safari the whole page is scrolled instead. Under occasions where you've deliberately hidden the browser chrome, this interaction can bring it back into view.

PerfectScrollFix have two main diffrences:

- 	You don't need to do a lot. Just mark scrollable elements with `.scrollable` class and call `PerfectScrollFix.enable()`.
- 	It works perfectly stable :)

# Example

You can test this script on iPad:
http://jsbin.com/usomob/3

Source code of Example
http://jsbin.com/usomob/3/edit

# How to use

Setup a scrollable section by adding 'scrollable' class name (make sure that 'scrollable' element have only one element inside, a wrapper so to speek):

	<div class="scrollable">
		<ul>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
			<li>List Item</li>
		</ul>
	</div>

And script to the page header and then call the following code:

	PerfectScrollFix.enable();

Thats it! :)

# License

The MIT License (MIT)

Copyright (c) 2013 Ai_boy

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
