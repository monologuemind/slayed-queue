const getData = async (replaceFunc) => {
  const e = eval;
  const data = await (
    await fetch(
      "https://docs.google.com/document/d/1XlvC3ItbHzPbCI0YQdM6ventHAcLCsnADxUsJ7bH7Ek/edit"
    )
  ).text();

  const element = document.createElement("div");

  element.innerHTML = data;

  const groupStrings = e(
    replaceFunc(
      Array.from(element.children).find(
        (e) => e.tagName === "SCRIPT" && e.innerText.includes("Group")
      ).innerText
    )
  );

  return groupStrings;
};

getData();
