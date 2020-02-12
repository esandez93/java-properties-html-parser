const escapeAccents = (content) => (
  content
    .replace(/à/g, '\\u00E0')
    .replace(/á/g, '\\u00E1')
    .replace(/â/g, '\\u00E2')
    .replace(/ã/g, '\\u00E3')
    .replace(/ä/g, '\\u00E4')

    .replace(/è/g, '\\u00E8')
    .replace(/é/g, '\\u00E9')
    .replace(/ê/g, '\\u00EA')
    .replace(/ë/g, '\\u00EB')

    .replace(/ì/g, '\\u00EC')
    .replace(/í/g, '\\u00ED')
    .replace(/î/g, '\\u00EE')
    .replace(/î/g, '\\u00EF')

    .replace(/ò/g, '\\u00F2')
    .replace(/ó/g, '\\u00F3')
    .replace(/ô/g, '\\u00F4')
    .replace(/õ/g, '\\u00F5')
    .replace(/ö/g, '\\u00F6')

    .replace(/ù/g, '\\u00F9')
    .replace(/ú/g, '\\u00FA')
    .replace(/û/g, '\\u00FB')
    .replace(/ü/g, '\\u00FC')

    .replace(/ç/g, '\\u00E7')
);

const unescapeAccents = (content) => (
  content
    .replace(/\\u00E0/g, 'à')
    .replace(/\\u00E1/g, 'á')
    .replace(/\\u00E2/g, 'â')
    .replace(/\\u00E3/g, 'ã')
    .replace(/\\u00E4/g, 'ä')

    .replace(/\\u00E8/g, 'è')
    .replace(/\\u00E9/g, 'é')
    .replace(/\\u00EA/g, 'ê')
    .replace(/\\u00EB/g, 'ë')

    .replace(/\\u00EC/g, 'ì')
    .replace(/\\u00ED/g, 'í')
    .replace(/\\u00EE/g, 'î')
    .replace(/\\u00EF/g, 'î')

    .replace(/\\u00F2/g, 'ò')
    .replace(/\\u00F3/g, 'ó')
    .replace(/\\u00F4/g, 'ô')
    .replace(/\\u00F5/g, 'õ')
    .replace(/\\u00F6/g, 'ö')

    .replace(/\\u00F9/g, 'ù')
    .replace(/\\u00FA/g, 'ú')
    .replace(/\\u00FB/g, 'û')
    .replace(/\\u00FC/g, 'ü')

    .replace(/\\u2019/g, '\'')
    .replace(/\\u00E7/g, 'ç')
);


const parseHtmlToJava = (content) => {
  console.group('Parsing HTML');
  console.log('Previous');
  console.log(content);
  console.log('-------------------------------');
  console.log('Result');

  let result = escapeAccents(
    content
      .trim()
      .replace(/\s{2}/g, '')
      .replace(/:/g, '\\:')
      .replace(/#/g, '\\#')
      .replace(/=/g, '\\=')
      .replace(/'/g, '\'\'')
      .replace(/>\s</g, '><')
      .replace(/\n+/g, '')
  );

  console.log(result);
  console.groupEnd('Parsing HTML');

  return result;
};

const parseJavaToHtml = (content) => {
  console.group('Parsing Java');
  console.log('Previous');
  console.log(content);
  console.log('-------------------------------');
  console.log('Result');

  let result = unescapeAccents(
    content
      .replace(/\\:/g, ':')
      .replace(/\\#/g, '#')
      .replace(/\\=/g, '=')
      .replace(/''/g, '\'')
      .replace(/\\$/gm, '')
  );

  var div = document.createElement('div');
  div.innerHTML = result;

  result = formatHtml(div).innerHTML;

  console.log(result);
  console.groupEnd('Parsing Java');

  return result;
};

function formatHtml(node, level = 0) {
  var indentBefore = new Array(level++ + 1).join('  '),
      indentAfter  = new Array(level - 1).join('  '),
      textNode;

  for (var i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode('\n' + indentBefore);
    node.insertBefore(textNode, node.children[i]);

    formatHtml(node.children[i], level);

    if (node.lastElementChild === node.children[i]) {
      textNode = document.createTextNode('\n' + indentAfter);
      node.appendChild(textNode);
    }
  }

  return node;
}

function validateHtmlStr (htmlStr, strictBoolean = true) {
  return new Promise((resolve, reject) => {
    resolve();

    // TODO: Check if the validations are correct
    if (typeof htmlStr !== "string")
      reject();

    const validateHtmlTag = /<[a-z]+(\s+|"[^"]*"\s?|'[^']*'\s?|[^'">])*>/igm;
    let sdom = document.createElement('div');
    let noSrcNoAmpHtmlStr = htmlStr
        .replace(/ src=/, " svhs___src=") // disarm src attributes
        .replace(/&amp;/igm, "#svhs#amp##"); // 'save' encoded ampersands
    let noSrcNoAmpIgnoreScriptContentHtmlStr = noSrcNoAmpHtmlStr
        .replace(/\n\r?/igm, "#svhs#nl##") // temporarily remove line breaks
        .replace(/(<script[^>]*>)(.*?)(<\/script>)/igm, "$1$3") // ignore script contents
        .replace(/#svhs#nl##/igm, "\n\r");  // re-add line breaks
    const htmlTags = noSrcNoAmpIgnoreScriptContentHtmlStr.match(/<[a-z]+[^>]*>/igm); // get all start-tags
    const htmlTagsCount = htmlTags ? htmlTags.length : 0;
    let tagsAreValid = null;
    let resHtmlStr = null;


    if (!strictBoolean) {
      // ignore <br/> conversions
      noSrcNoAmpHtmlStr = noSrcNoAmpHtmlStr.replace(/<br\s*\/>/, "<br>");
    }

    if (htmlTagsCount) {
      tagsAreValid = htmlTags.reduce((isValid, tagStr) => isValid && tagStr.match(validateHtmlTag), true);

      if (!tagsAreValid) {
        reject();
      }
    }

    try {
      sdom.innerHTML = noSrcNoAmpHtmlStr;
    } catch (err) {
      reject(err);
    }

    // compare rendered tag-count with expected tag-count
    if (sdom.querySelectorAll("*").length !== htmlTagsCount) {
      reject();
    }

    resHtmlStr = sdom.innerHTML.replace(/&amp;/igm, "&"); // undo '&' encoding

    if (!strictBoolean) {
      // ignore empty attribute normalizations
      resHtmlStr = resHtmlStr.replace(/=""/, "")
    }

    // compare html strings while ignoring case, quote-changes, trailing spaces
    const simpleIn = noSrcNoAmpHtmlStr.replace(/["']/igm, "").replace(/\s+/igm, " ").toLowerCase().trim();
    const simpleOut = resHtmlStr.replace(/["']/igm, "").replace(/\s+/igm, " ").toLowerCase().trim();

    if (simpleIn === simpleOut)
      resolve();

    resolve(resHtmlStr.replace(/ svhs___src=/igm, " src=").replace(/#svhs#amp##/, "&amp;"));
  });
}

export {
  escapeAccents,
  unescapeAccents,
  parseHtmlToJava,
  parseJavaToHtml,
  validateHtmlStr
};
