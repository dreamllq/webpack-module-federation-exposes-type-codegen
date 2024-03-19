// const path = require('path');
// const fs = require('fs');
// module.exports = ({ name, version, groupName = '@alsi-microapp-types', exposes }, { outDir }) => {
//   const packageJson = {
//     'name': `${groupName}/${name}`,
//     'version': `${version}`,
//     'scripts': { 'publish:latest': 'npm publish --registry=https://repo.dev.alsi.cn/repository/aps-npm-snapshot/' },
//     'types': 'index.d.ts'
//   };

//   fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');
// };
