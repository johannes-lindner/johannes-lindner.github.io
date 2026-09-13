(function () {
  "use strict";

  // Minimal BibTeX parser: handles @type{key, field = {value}, field = "value", ...}
  // Supports nested braces inside field values (e.g. {Modelling {HMI}s}).
  function parseBibtex(text) {
    var entries = [];
    var i = 0;
    var n = text.length;

    function skipWhitespace() {
      while (i < n && /\s/.test(text[i])) i++;
    }

    while (i < n) {
      while (i < n && text[i] !== '@') i++;
      if (i >= n) break;
      i++; // skip @

      var typeStart = i;
      while (i < n && /[a-zA-Z]/.test(text[i])) i++;
      var type = text.slice(typeStart, i).toLowerCase();

      skipWhitespace();
      if (text[i] !== '{' && text[i] !== '(') continue;
      var closeChar = text[i] === '{' ? '}' : ')';
      i++;
      skipWhitespace();

      var keyStart = i;
      while (i < n && text[i] !== ',' && text[i] !== closeChar) i++;
      var key = text.slice(keyStart, i).trim();
      if (text[i] === ',') i++;

      var fields = {};
      while (i < n) {
        skipWhitespace();
        if (text[i] === closeChar) { i++; break; }

        var fieldNameStart = i;
        while (i < n && /[a-zA-Z0-9_-]/.test(text[i])) i++;
        var fieldName = text.slice(fieldNameStart, i).toLowerCase();
        skipWhitespace();
        if (text[i] === '=') i++;
        skipWhitespace();

        var value = '';
        if (text[i] === '{') {
          var depth = 1;
          i++;
          var valStart = i;
          while (i < n && depth > 0) {
            if (text[i] === '{') depth++;
            else if (text[i] === '}') { depth--; if (depth === 0) break; }
            i++;
          }
          value = text.slice(valStart, i);
          i++; // skip closing }
        } else if (text[i] === '"') {
          i++;
          var valStart2 = i;
          while (i < n && text[i] !== '"') i++;
          value = text.slice(valStart2, i);
          i++;
        } else {
          var valStart3 = i;
          while (i < n && text[i] !== ',' && text[i] !== closeChar && !/\s/.test(text[i])) i++;
          value = text.slice(valStart3, i);
        }

        fields[fieldName] = value.replace(/\s+/g, ' ').trim();
        skipWhitespace();
        if (text[i] === ',') { i++; }
      }

      if (type && key) entries.push({ type: type, key: key, fields: fields });
    }

    return entries;
  }

  function stripBraces(str) {
    return (str || '').replace(/[{}]/g, '');
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // "Lindner, J. and Böckle, M." -> "Lindner, J., Böckle, M., & Pechinger, M."
  function formatAuthorsAPA(authorField) {
    if (!authorField) return '';
    var authors = stripBraces(authorField).split(/\s+and\s+/i).map(function (a) {
      return a.trim();
    }).filter(Boolean);

    var formatted = authors.map(function (a) {
      var last, rest;
      if (a.indexOf(',') !== -1) {
        var parts = a.split(',');
        last = parts[0].trim();
        rest = parts.slice(1).join(',').trim();
      } else {
        var words = a.split(/\s+/);
        last = words.pop();
        rest = words.join(' ');
      }
      var initials = rest.split(/\s+/).filter(Boolean).map(function (w) {
        w = w.replace(/\./g, '');
        return w.charAt(0).toUpperCase() + '.';
      }).join(' ');
      return initials ? (last + ', ' + initials) : last;
    });

    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return formatted[0] + ', & ' + formatted[1];
    return formatted.slice(0, -1).join(', ') + ', & ' + formatted[formatted.length - 1];
  }

  function enDashRange(str) {
    if (!str) return str;
    return str.replace(/(\d)\s*-{1,2}\s*(\d)/g, '$1–$2');
  }

  function formatEntryAPA(entry) {
    var f = entry.fields;
    var authors = formatAuthorsAPA(f.author);
    var year = stripBraces(f.year || f.date || 'n.d.');
    var title = stripBraces(f.title || '').trim();
    var venue = stripBraces(f.journal || f.booktitle || '');
    var volume = stripBraces(f.volume || '');
    var number = stripBraces(f.number || f.issue || '');
    var pages = enDashRange(stripBraces(f.pages || ''));
    var doi = stripBraces(f.doi || '');
    var note = stripBraces(f.note || f.status || '');
    var url = stripBraces(f.url || (doi ? 'https://doi.org/' + doi : ''));

    var html = escapeHtml(authors) + ' (' + escapeHtml(year) + '). ' + escapeHtml(title);
    if (note) html += ' [' + escapeHtml(note) + ']';
    html += '.';

    if (venue) {
      html += ' <em>' + escapeHtml(venue) + '</em>';
      if (volume) {
        html += ', <em>' + escapeHtml(volume) + '</em>' + (number ? '(' + escapeHtml(number) + ')' : '');
      }
      if (pages) html += ', ' + escapeHtml(pages);
      html += '.';
    }

    if (url) {
      html += ' <a href="' + url + '" target="_blank" rel="noopener">' + escapeHtml(url) + '</a>';
    }

    return html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('publications-list');
    if (!container) return;

    var src = container.getAttribute('data-src');
    if (!src) return;

    fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + src + ': ' + res.status);
        return res.text();
      })
      .then(function (text) {
        var entries = parseBibtex(text);
        if (!entries.length) {
          container.innerHTML = '<li>No publications found.</li>';
          return;
        }
        container.innerHTML = entries.map(function (entry) {
          return '<li>' + formatEntryAPA(entry) + '</li>';
        }).join('');
      })
      .catch(function (err) {
        container.innerHTML = '<li>Could not load publications.</li>';
        if (window.console) console.error(err);
      });
  });
})();
