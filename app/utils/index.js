
function group_perms_by_model(permissions) {
  /*
    Groups an array of permissions objects by model.

    `permissions` is an array of objects, each of which contains `content_type` attribute
    which in turn has a `model` attribute.
    Example:
      Input: [
        {attr_1x, attr_2x, content_type: {model: m1}},
        {attr_1y, attr_2y, content_type: {model: m1}},
        {attr_1z, attr_2z, content_type: {model: m1}},
        {attr_1w, attr_2w, content_type: {model: m2}}
      ]

      Output:
        [
          {
            model: m1,
            perms: [
              {attr_1x, attr_2x, content_type: {model: m1}},
              {attr_1y, attr_2y, content_type: {model: m1}},
              {attr_1z, attr_2z, content_type: {model: m1}},
            ]
          },
          {
            model: m2,
            perms: [
              {attr_1w, attr_2w, content_type: {model: m2}},
            ]
          },
        ]
  */
  let groups = permissions.map(item => item.content_type.get('model')),
    result = [];

  groups = new Set(groups);

  groups.forEach(model => {
    let perms = permissions.filter(item => item.content_type.get('model') === model);
    result.push({model, perms}); // same as result.push({mode: model, perms: perms})
  });

  return result;
}

export default group_perms_by_model;