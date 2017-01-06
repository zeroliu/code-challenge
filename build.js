const webpack = require('webpack');
const aws = require('aws-sdk');
const fs = require('fs');
const fetch = require('node-fetch');

const args = process.argv.slice(2);
if (!args[0]) throw new Error('Please provide challenge name');
main(args[0]);

function main(folderName) {
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
    fs.readFile(`./${folderName}/${fileName}`, (err, data) => {
      if (err) throw err;

      const s3 = new aws.S3();
      const params = {
        Bucket: 'static.zeroliu.com',
        Key: `code-challenge/${folderName}/${fileName}`,
        Body: data
      };

      s3.upload(params, (err, data) => {
        if (err) throw err;
        console.log(`Successfully uploaded ${fileName}`);
      });
    });
  }

  function updateDb() {
    fs.readFile(`./${folderName}/metadata.json`, (err, data) => {
      if (err) throw err;

      const metadata = JSON.parse(data);
      const body = Object.assign({name: folderName}, metadata);

      fetch('https://zjronxwl1b.execute-api.us-west-2.amazonaws.com/prod/codeChallenge', {
        method: 'POST',
        headers: {
          'x-api-key': 'lMEdaTk8gs6uMrZ0yn5kZ1yJynVyP0gA6ECoMjPT',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then((res) => {
        if (res.status > 400) {
          console.error(`Error updating db: ${res.statusText}`);
        } else {
          console.log('Successfully updated db');
        }
      });
    });
  }
}
