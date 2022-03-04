const findGroupByName = async (name) => {
  const e = eval;
  const data = await (
    await fetch(
      "https://docs.google.com/document/d/1XlvC3ItbHzPbCI0YQdM6ventHAcLCsnADxUsJ7bH7Ek/edit"
    )
  ).text();

  const element = document.createElement("div");

  element.innerHTML = data;

  const groupStrings = e(
    Array.from(element.children)
      .find((e) => e.tagName === "SCRIPT" && e.innerText.includes("Group"))
      .innerText.replace("DOCS_modelChunk = ", "")
      .replace(
        ` DOCS_modelChunkLoadStart = new Date().getTime(); _getTimingInstance().incrementTime('mp', DOCS_modelChunkLoadStart - DOCS_modelChunkParseStart); DOCS_warmStartDocumentLoader.loadModelChunk(DOCS_modelChunk); DOCS_modelChunk = undefined;`,
        ""
      )
  );

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
      const nameMap = arr.slice(2).reduce((acc, key, index) => {
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
        nameMap,
      };
    });

  return groups?.find((group) => group?.nameMap?.[name])?.group;
};

findGroupByName("");
