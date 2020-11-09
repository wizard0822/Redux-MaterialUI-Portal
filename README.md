![Tripetto](https://docs.tripetto.com/assets/header.svg)

Tripetto is a full-fledged form kit. Rapidly create and deploy smart flowing forms and surveys. Drop the kit in your codebase and use all of it, or just the parts you need. The visual [**editor**](https://www.npmjs.com/package/tripetto) is for form creation, the [**collector**](https://www.npmjs.com/package/tripetto-collector) for response collection and the [**SDK**](https://docs.tripetto.com/guide/blocks) for developing more form building blocks.

# React with Material-UI example
[![pipeline status](https://gitlab.com/tripetto/examples/react-material-ui/badges/master/pipeline.svg)](https://gitlab.com/tripetto/examples/react-material-ui/commits/master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![docs](https://img.shields.io/badge/docs-website-blue.svg)](https://docs.tripetto.com/guide/collector)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/tripetto)

This demo shows how to implement the collector for some basic form input controls using [React](https://reactjs.org/) and [Material-UI](https://material-ui-next.com/). The goal is to show you how to implement Tripetto with minimal code footprint so you get a good understanding of the principles. In this example the browser window is split in two. At the left side you see the editor and at the right side the collector. Use the editor to create a form definition. It will run in the collector at the right. At the top is a header with the title of the form definition and some controls for demo purposes (like start/pause/stop the collector).

[![Try the demo](https://docs.tripetto.com/assets/button-demo.svg)](https://example-react-material-ui.tripetto.com/)

# How to run it locally
1. [Download](https://gitlab.com/tripetto/examples/react-material-ui/repository/master/archive.zip) or clone the [repository](https://gitlab.com/tripetto/examples/react-material-ui) to your local machine:
```bash
$ git clone https://gitlab.com/tripetto/examples/react-material-ui.git
```

2. Run `npm install` inside the downloaded/cloned folder:
```bash
$ npm install
```

3. Start the test server and open the URL `http://localhost:9000` in the browser of your choice to show the form:
```bash
$ npm test
```

# Documentation
The complete Tripetto documentation can be found at [docs.tripetto.com](https://docs.tripetto.com).

# Support
Run into issues or bugs? Report them [here](https://gitlab.com/tripetto/examples/react-material-ui/issues) and we'll look into them.

For general support contact us at [support@tripetto.com](mailto:support@tripetto.com). We're more than happy to assist you.

# License
Have a blast. [MIT](https://opensource.org/licenses/MIT).

# About us
If you want to learn more about Tripetto or contribute in any way, visit us at [Tripetto.com](https://tripetto.com/).
