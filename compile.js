const fs = require('fs');
const path = require('path');

const caseStudiesDir = path.join(__dirname, 'case-studies');
const outputFile = path.join(__dirname, 'case_studies.js');

const caseStudies = [];

fs.readdirSync(caseStudiesDir).forEach(id => {
  const caseStudyDir = path.join(caseStudiesDir, id);
  if (fs.statSync(caseStudyDir).isDirectory()) {
    const caseStudy = {
      id: parseInt(id),
      cover: fs.readFileSync(path.join(caseStudyDir, 'cover.txt'), 'utf-8').trim(),
      title: fs.readFileSync(path.join(caseStudyDir, 'title.txt'), 'utf-8').trim(),
      description: fs.readFileSync(path.join(caseStudyDir, 'description.txt'), 'utf-8').trim(),
      content: fs.readFileSync(path.join(caseStudyDir, 'content.txt'), 'utf-8').trim(),
    };
    caseStudies.push(caseStudy);
  }
});

const outputContent = `const case_studies = ${JSON.stringify({ case_studies: caseStudies }, null, 2)};`;

fs.writeFileSync(outputFile, outputContent);

console.log('case_studies.js file generated successfully!');
