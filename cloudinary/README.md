# Cloudinary App

## Getting Started

Optimizely Connect Platform apps run on node 18 and are packaged using [yarn](https://yarnpkg.com/lang/en/).

Ensure node and [yarn](https://yarnpkg.com/lang/en/) are installed,
then run `yarn` to install dependencies.

Apps should be written in [TypeScript](https://www.typescriptlang.org/).
[Visual Studio Code](https://code.visualstudio.com/) is a great free IDE for typescript projects.

Finally, check out the [documentation](https://docs.developers.optimizely.com/optimizely-connect-platform/docs)

## Build and test

You can use any test framework you like, but Jest comes pre-installed with an Optimizely Connect Platform app.
To run your unit tests, just run:
```
yarn test
```

Before you upload an app to Optimizely Connect Platform, you can validate your app package to ensure it's ready for upload.
```
yarn validate
```

## Optimizely Connect Platform CLI

After customizing your app, use the Optimizely Connect Platform CLI to register, upload, and publish your app.
