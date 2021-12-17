/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

/**
 * Strip private properties from an array or objects
 * @param {Array<string>} props provides an array of property to strip from the object
 * @param {Array<object>} objArr provides an array of objects to strip the properties from
 * @returns new array of objects with the private properties stripped
 */
exports.stripPrivateProperties = (props, objArr) => {
  // iterate through the object array
  for (let i = 0; i < objArr.length; i++) {
    // iterate through the properties for each object and attempt removal
    props.forEach((key) => delete objArr[i][key]);
  }
  // return the object array
  return objArr;
};

/**
 * return an array of objects that do not have the excluded property
 * @param {String} exclusion property to exclude
 * @param {Array<object>} objArr array of objects
 * @returns new array of objects with excluded properties
 */
exports.excludeByProperty = (exclusion, objArr) => {
  // filter the array by generating a new array from the objects without the excluded property.
  return objArr.filter((obj) => !obj.hasOwnProperty(exclusion));
};

/**
 * Calculate the total of sum from provided array of objects
 * @param {Array<object>} arr array of objects to generate the sum of
 * @returns new array of objects containing the sum
 */
exports.sumDeep = (arr) => {
  // iterate through each object within the array
  return arr.map((obj) => {
    // sum the values within the objects together
    const sum = obj.objects.reduce((acc, curr) => ({
      val: acc.val + curr.val,
    }));
    // return the new object to place into the new array
    return { objects: sum.val };
  });
};

/**
 * Receieve a code and provide the correct colour to the object
 * @param {object} colorMap object of arrays containing the colour and values
 * @param {Array<object>} input array of objects containing the values needed to define
 * @returns
 */
exports.applyStatusColor = (colorMap, input) => {
  // iterate through each object using the code provided
  let output = input.map(({ status }) => {
    // iterate through the keys of the colorMap to find the colour to assign
    let color = Object.keys(colorMap).find((key) =>
      // if the colorMap array contains the colour store it
      colorMap[key].includes(status)
    );
    // return the new object into the new array
    return { color, status };
  });

  // Remove all values without a colour from the new array
  return output.filter(({ color }) => color !== undefined);
};

/**
 * Return a function to help display a greet depending on what time of day.
 * @param {function} greetFunc function to generate the final string based a yet to be defined name
 * @param {string} greeting greeting to use when exporting the final string
 * @returns
 */
exports.createGreeting = (greetFunc, greeting) => {
  // prepare the provided function to be returned with the right greeting and yet to be defined name
  return (name) => greetFunc(greeting, name);
};

/**
 * Set supplied properties as default to yet to be provided obj
 * @param {object} props properties to set as default
 * @returns new object with default properties
 */
exports.setDefaults = (props) => {
  // pass in the obj to be provided with defaults
  return (obj) => {
    // iterate through all the keys of the props
    for (const key in props) {
      // ensure that if the object doesn't have the property that it is added
      if (!Object.keys(obj).includes(key)) obj[key] = props[key];
    }
    // return the new object with all the new default properties
    return obj;
  };
};

/**
 * asynchronously fetch a user, users company and status based on the provided name
 * @param {string} _name name of the user to provide information about
 * @param {object} services object of all the required functions to source the required data
 * @returns
 */
exports.fetchUserByNameAndUsersCompany = (_name, services) =>
  // return a promise so to not freeze up the program while attempting to source the data
  new Promise(async (resolve, reject) => {
    // create an empty object to hold the upcoming data
    let returnUser = {};
    // place the attepmt to source the information in a try/catch block incase it is unobtainable.
    try {
      // source the user data
      const users = await services.fetchUsers();
      // return the user with the same name from the returned user array.
      returnUser.user = users.find(({ name }) => name === _name);
      // fetch the status and place it also in the new user object
      returnUser.status = await services.fetchStatus();
      // finally fetch the company data based on the company id within the collected user object
      returnUser.company = await services.fetchCompanyById(
        returnUser.user.companyId
      );
      // resolve the promise as all has been successful
      resolve(returnUser);
    } catch (err) {
      // if there is an error during the attempt to source the data, callback the reject function with the error message.
      reject(err);
    }
  });
