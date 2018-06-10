const fs = require('fs');

module.exports = class Json {
  constructor(filePath) {
    this.file = filePath;
    this.obj = require(filePath);
  }

  writeInFile(uglify) {
    let success = true;

    if (uglify) {
      fs.writeFile(this.file, JSON.stringify(this.obj), (error) => {
        console.log("Couldn't write data in file");

        return success = false;
      });
    }
    else {
      fs.writeFile(this.file, JSON.stringify(this.obj, null, 2), (error) => {
        console.log("Couldn't write data in file");

        return success = false;
      });
    }

    return success;
  }

  getElementsByPropertyValue(property, value) {
    const resultArray = this.obj.filter(element => {
      return element[property] === value;
    });

    return resultArray;
  }

  // filterElementsByPropertyValue(property, value) {
  //   const resultArray = this.obj.filter(element => {
  //     return element[property].toLowerCase().includes(value.toLowerCase());
  //   });

  //   return resultArray;
  // }

  getElementByPropertyValue(property, value) {
    const result = this.obj.find(element => {
      return element[property] === value;
    });

    return result;
  }
};
