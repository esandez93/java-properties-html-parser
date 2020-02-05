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

export {
  escapeAccents,
  unescapeAccents,
  parseHtmlToJava,
  parseJavaToHtml
};
