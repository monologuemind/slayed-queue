const findGroupByName = (name, groups) => {
  return groups?.find((group) => group?.names?.[name])?.group;
};

findGroupByName("");
