const webpack = require('webpack');
const fs = require('fs');
const fetch = require('node-fetch');
const crypto = require('crypto');
const gcloud = require('google-cloud');


const args = process.argv.slice(2);
if (!args[0]) throw new Error('Please provide challenge name');
const folderName = args[0].endsWith('/') ? args[0].slice(0, -1) : args[0];
main(folderName);

function main(folderName) {
  const date = Date.now();
  const version = crypto
    .createHash('md5')
    .update(date.toString())
    .digest('hex');
  const storage = gcloud.storage({
    projectId: 'code-challenge-bb812',
    keyFilename: '/Users/zeroliu/Code Challenge-43b13b7860cf.json'
  });
  const bucket = storage.bucket('code-challenge-bb812.appspot.com');

  compileJs(() => {
    upload('bundle.js');
    upload('screenshot.jpg');
    updateDb();
  });

  function compileJs(callback) {
    webpack({
      entry: `./${folderName}/app.js`,
      output: {
        filename: `./${folderName}/bundle.js`
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
      ],
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }, (err, stats) => {
      if (stats.hasErrors()) {
        throw new Error(stats.toJson().errors);
      }
      callback();
    });
  }

  function upload(fileName) {
    bucket.upload(`./${folderName}/${fileName}`, {
      destination: `code-challenge/${folderName}/${version}_${fileName}`
    }, (err, file) => {
      if (err) throw new Error(err);

      console.log(`Successfully uploaded ${fileName}`)
    });
  }

  function updateDb() {
    fs.readFile(`./${folderName}/metadata.json`, (err, data) => {
      if (err) throw err;

      const metadata = JSON.parse(data);
      const body = Object.assign(
        {name: folderName, version: version, lastUpdatedDate: date}, metadata
      );

      fetch(`https://code-challenge-bb812.firebaseio.com:443/challenges/${folderName}.json`, {
        method: 'PUT',
        body: JSON.stringify(body)
      })
      .then((res) => {
        console.log(res.status);
        if (res.status > 400) {
          console.error(`Error updating db: ${res.statusText}`);
        } else {
          console.log('Successfully updated db');
        }
      });
    });
  }
}
