const getGroups = (groupStrings) => {
  const groups = groupStrings?.[0]?.s
    .split(":\n")
    .slice(1)
    .map((str) =>
      str
        .split("\n")
        .slice(1, -1)
        .filter((d) => !!d)
    )
    .filter((group) => group.length)
    .map((arr, index) => {
      const group = index + 1 === 7 ? "Backup" : index + 1;
      const names = arr.slice(2).reduce((acc, key, index) => {
        const value = arr
          .slice(2)
          ?.[index + 1]?.replace("\x1C", "")
          ?.replace("\x12", "");

        if (!value) {
          return acc;
        }

        if (key.length && (index === 0 || !(index % 2))) {
          Object.assign(acc, {
            [key?.replace("\x1C", "")?.replace("\x12", "")]: value,
          });
        }

        return acc;
      }, {});

      return {
        group,
        names,
      };
    });

  return groups;
};

getGroups();
