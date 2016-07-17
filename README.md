package-name
=========

![JSPM version][icon-jv]
[![Clean Code][icon-cc]][link-cc]
[![Dependency Status][icon-ds]][link-ds]
[![devDependency Status][icon-dds]][link-dds]
![License][icon-li]

( [David.][link-dv] does not support JSPM package dependency badges right now, so the dependency status is not correct. )

<p align="center">
    <img src="screenshots/demo.png" title="screenshot" />
</p>

## Browser support

**Desktop**: Chrome, Safari, Firefox, Opera, IE9+

## Installation 

```shell
    jspm install github:wenwuwu/package-name
```

## Usage

```js

    import package-name from 'package-name';

    or

    var package-name = require('package-name');

```

## Demo

1. Clone this repo.
2. Run **npm install**  ( You can skip this step if you have a globally installed **jspm** and **live-server** )
3. Run **jspm install**.
4. Run **live-server** ( [live-server][link-ls] is very useful, but if you have other server tools you don't have to use it.)
5. Open **demo.html** in a browser.

## Test

## Todo

- [ ] Add complete document :balloon:
- [ ] Add test.
- [ ] Review browsers supports.



[icon-jv]: https://img.shields.io/badge/jspm-v1.0.0-blue.svg?style=flat

[icon-ds]: https://img.shields.io/david/wenwuwu/package-name.svg?style=flat
[link-ds]: https://david-dm.org/wenwuwu/package-name
[icon-dds]: https://img.shields.io/david/dev/wenwuwu/package-name.svg?style=flat
[link-dds]: https://david-dm.org/wenwuwu/package-name#info=devDependencies
[icon-cc]: https://img.shields.io/badge/code-clean-orange.svg?style=flat
[link-cc]: https://github.com/wenwuwu/code-convention-js 
[icon-li]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[link-dv]: https://david-dm.org
[link-ls]: https://www.npmjs.com/package/live-server
