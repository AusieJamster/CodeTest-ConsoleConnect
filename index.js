/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (props, objArr) => {
  for (let i = 0; i < objArr.length; i++) {
    props.forEach((key) => {
      delete objArr[i][key];
    });
  }
  return objArr;
};

exports.excludeByProperty = (exclusion, objArr) => {
  let arr = [];
  objArr.forEach((obj) => {
    if (!obj.hasOwnProperty(exclusion)) arr.push(obj);
  });
  return arr;
};

exports.sumDeep = (arr) => {
  let allSums = [];

  arr.forEach((obj) => {
    const sum = obj.objects.reduce((acc, curr) => ({
      val: acc.val + curr.val,
    }));
    allSums.push({ objects: sum.val });
  });

  return allSums;
};

exports.applyStatusColor = (colorMap, input) => {
  let output = [];

  input.forEach(({ status }) => {
    let color = Object.keys(colorMap).find((key) =>
      colorMap[key].includes(status)
    );
    output.push({ color, status });
  });

  return output.filter(({ color }) => color !== undefined);
};

exports.createGreeting = (greetFunc, str) => {
  return (name) => greetFunc(str, name);
};

exports.setDefaults = (props) => {
  return (obj) => {
    for (const key in props) {
      if (!Object.keys(obj).includes(key)) obj[key] = props[key];
    }
    return obj;
  };
};

exports.fetchUserByNameAndUsersCompany = (_name, services) =>
  new Promise(async (resolve) => {
    let returnUser = {};
    const users = await services.fetchUsers();
    returnUser.user = users.find(({ name }) => name === _name);
    returnUser.status = await services.fetchStatus();
    returnUser.company = await services.fetchCompanyById(
      returnUser.user.companyId
    );
    resolve(returnUser);
  });
