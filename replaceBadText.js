const replaceBadText = (text) => {
  return text
    .replace("DOCS_modelChunk = ", "")
    .replace(
      ` DOCS_modelChunkLoadStart = new Date().getTime(); _getTimingInstance().incrementTime('mp', DOCS_modelChunkLoadStart - DOCS_modelChunkParseStart); DOCS_warmStartDocumentLoader.loadModelChunk(DOCS_modelChunk); DOCS_modelChunk = undefined;`,
      ""
    );
};

replaceBadText("");
