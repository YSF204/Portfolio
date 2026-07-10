const fs = require('fs');
const https = require('https');

const components = ['LogoLoop-JS-CSS'];

components.forEach(comp => {
  https.get(`https://reactbits.dev/r/${comp}.json`, res => {
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
      const parsed = JSON.parse(rawData);
      parsed.files.forEach(file => {
        const nameParts = file.path.split('/');
        const fileName = nameParts[nameParts.length - 1];
        fs.writeFileSync(`./src/components/${fileName}`, file.content);
        console.log('Saved', fileName);
      });
    });
  });
});
