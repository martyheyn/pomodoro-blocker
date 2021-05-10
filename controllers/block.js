// /* ================================================= */
// /* ===== Website Block Schedulinig Application ===== */
// /* ================================================= */
const fs = require('fs');

// Define the blocker function
let block = (websites) => {
  // file
  // Make a variable to store path of hosts file
  const filePath = '/etc/hosts';
  // Store the redirection path in a variable
  // The websites in the block list will be directed to localhost (127.0.0.1)
  const redirectPath = '127.0.0.1';

  console.log('Time to block websites');
  fs.readFile(filePath, (err, data) => {
    // Throw error in case something went wrong!
    if (err) {
      return console.log(err);
    }

    // Convert the fetched data to string
    let fileContents = data.toString();

    /**
     * Check whether each website in the list exist in the list,
     * If it exists, ignore,
     * else, write the websites and redirect address in the file
     */
    for (let i = 0; i < websites.length; i++) {
      let addWebsite = '\n' + redirectPath + ' ' + websites[i];
      if (fileContents.indexOf(addWebsite) < 0) {
        console.log('Website: ' + addWebsite + ' is not present');
        fs.appendFile(filePath, addWebsite, (err) => {
          if (err) {
            return console.log('Error: ', err);
          }
          console.log('File Updated Successfully');
        });
      } else {
        console.log('Website: ' + addWebsite + ' is present');
      }
    }
  });
};

let unblock = (websites) => {
  // Make a variable to store path of hosts file
  const filePath = '/etc/hosts';

  /**
   * Declare and empty string,
   * We will keep on appending the lines which do not contain our websites to this string
   * At the end, we will replace the file contents by this string
   */
  let completeContent = '';

  // Read  file line by line
  fs.readFileSync(filePath)
    .toString()
    .split('\n')
    .forEach((line) => {
      // console.log(line);
      let flag = 1;
      // Loop through each website from website list
      for (let i = 0; i < websites.length; i++) {
        // Check whether the current line contains any blocked website
        if (line.indexOf(websites[i]) >= 0) {
          flag = 0;
          break;
        }
      }

      if (flag === 1) {
        if (line === '') completeContent += line;
        else completeContent += line + '\n';
      }
    });

  // Replace the contents of file by completeContent
  fs.writeFile(filePath, completeContent, (err) => {
    if (err) {
      return console.log('Error!', err);
    }
  });
};

module.exports = { block, unblock };
