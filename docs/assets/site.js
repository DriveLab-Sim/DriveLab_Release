/* DriveLab-Handbuch: Navigation, Kopierknoepfe, Systemlandkarte.
   Neue Seite: Datei anlegen und hier in NAV eintragen – sonst nichts.
   Kapitelnummern und Version stehen nur hier; Seitenkopf und Kacheln uebernehmen sie. */
(function () {
  "use strict";

  var VERSION = "0.2.3";

  // "local": Handbuch im Quellbaum und in der Installation. Doku/make_web_docs.py setzt "web" fuer die GitHub-Seite.
  var EDITION = "web";
  document.documentElement.classList.add("edition-" + EDITION);

  var NAV = [
    { track: "user", title: "Anwender", pages: [
      ["index.html",          "",  "Start"],
      ["installation.html",   "0", "Download & Installation", "web"],
      ["erste-schritte.html", "1", "Erste Schritte"],
      ["projekt.html",        "2", "Projekt & config.json"],
      ["fahrzeug.html",       "3", "Fahrzeug & Komponenten"],
      ["konzept.html",        "4", "Konzept & Soll-Ist"],
      ["umgebung.html",       "5", "Strecke, Fahrer, Sensoren"],
      ["cli.html",            "6", "Kommandozeile"],
      ["ergebnisse.html",     "7", "Ergebnisse & Reports"],
      ["steuergeraete.html",  "8", "Steuergeräte (SDK)"],
      ["python.html",         "9", "Python"],
      ["hilfe.html",          "10", "Fehlerbehebung"],
      ["stand.html",          "11", "Stand & Roadmap"]
    ]},
    // Nur im Quellbaum, wird nicht installiert. Erscheint nur auf dev/-Seiten.
    { track: "dev", title: "Entwickler", pages: [
      ["dev/index.html",        "",   "Übersicht"],
      ["dev/bauen.html",        "1",  "Bauen & Ausliefern"],
      ["dev/architektur.html",  "2",  "Architektur"],
      ["dev/module.html",       "3",  "Modulübersicht"],
      ["dev/konventionen.html", "4",  "Konventionen"],
      ["dev/env.html",          "5",  "Simulationskern env/"],
      ["dev/modelle.html",      "6",  "Fahrzeugmodelle models/"],
      ["dev/komponenten.html",  "7",  "Komponenten components/"],
      ["dev/fabriken.html",     "8",  "Fabriken & Konfig-Pipeline"],
      ["dev/strassen.html",     "9",  "Straßen roads/"],
      ["dev/fahrer.html",       "10", "Fahrer driver/"],
      ["dev/vecu.html",         "11", "Steuergeräte vECU/"],
      ["dev/reports.html",      "12", "Reports & Inspektion"],
      ["dev/cli.html",          "13", "CLI apps/cli/"],
      ["dev/bindings.html",     "14", "Python-Bindings"],
      ["dev/gui.html",          "15", "GUI apps/gui/"],
      ["dev/erweitern.html",    "16", "Erweitern"],
      ["dev/roadmap.html",      "17", "Baustellen & Roadmap"]
    ]}
  ];

  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var here = body.getAttribute("data-page") || "index.html";
  var onDev = body.getAttribute("data-track") === "dev";

  // 4. Eintrag einer Seite = Ausgabe, in der sie erscheint ("web"); ohne = immer
  NAV.forEach(function (part) {
    part.pages = part.pages.filter(function (p) { return !p[3] || p[3] === EDITION; });
  });

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  /* ---------- Version und Kapitelnummern aus NAV ---------- */
  var numberOf = {};
  NAV.forEach(function (part) {
    part.pages.forEach(function (p) { numberOf[p[0]] = p[1]; });
  });
  var head = document.querySelector(".page-head .k");
  if (head) {
    head.textContent = numberOf[here]
      ? head.textContent.replace(/\d+$/, numberOf[here])
      : head.textContent.replace(/\d+(\.\d+)+$/, VERSION);
  }
  var dir = here.slice(0, here.lastIndexOf("/") + 1);
  document.querySelectorAll("a.tile[href]").forEach(function (a) {
    var k = a.querySelector(".k"), no = numberOf[dir + a.getAttribute("href")];
    if (k && no) k.textContent = k.textContent.replace(/^\d+/, no);
  });

  /* ---------- Abschnitte der Seite: Kapitel, sonst Unterkapitel ---------- */
  var anchors = [];
  var chapNodes = Array.prototype.filter.call(document.querySelectorAll("section.chap[id]"), function (s) {
    var only = s.getAttribute("data-edition");
    return !only || only === EDITION;
  });
  if (chapNodes.length > 1) {
    chapNodes.forEach(function (s) {
      var h = s.querySelector("h2");
      if (h) anchors.push({ node: s, label: h.textContent });
    });
  } else {
    document.querySelectorAll("h3.sub").forEach(function (h, i) {
      if (!h.id) h.id = "abschnitt-" + (i + 1);
      anchors.push({ node: h, label: h.textContent });
    });
  }

  /* ---------- Seitenleiste ---------- */
  var side = document.getElementById("side");
  var ordered = [];
  var tocLinks = [];

  if (side) {
    var brand = el("div", "brand");
    var name = el("a", "brand-name", "DriveLab");
    name.href = root + "index.html";
    name.style.color = "inherit";
    name.style.textDecoration = "none";
    brand.appendChild(name);
    brand.appendChild(el("span", "brand-tag", "HANDBUCH " + VERSION));
    side.appendChild(brand);
    side.appendChild(el("div", "side-sub", "Fahrdynamik-Simulation mit virtuellen Steuergeräten"));

    var search = el("input", "search");
    search.type = "search";
    search.placeholder = "Seiten filtern … (z. B. Reifen)";
    search.setAttribute("aria-label", "Seiten filtern");
    side.appendChild(search);

    var nav = el("nav", "nav");
    NAV.forEach(function (part) {
      if (part.track === "dev" && !onDev) return;
      var box = el("div", "nav-part");
      box.setAttribute("data-track", part.track);
      var head = el("div", "nav-part-head");
      head.appendChild(el("span", "nav-dot"));
      head.appendChild(document.createTextNode(part.title));
      box.appendChild(head);

      part.pages.forEach(function (p) {
        var a = el("a", "nav-page");
        a.href = root + p[0];
        a.appendChild(el("span", "no", p[1]));
        a.appendChild(document.createTextNode(p[2]));
        box.appendChild(a);
        ordered.push({ href: p[0], title: p[2], track: part.track });

        if (p[0] === here) {
          a.classList.add("current");
          if (anchors.length > 1) {
            var toc = el("div", "toc");
            anchors.forEach(function (s) {
              var t = el("a", "", s.label);
              t.href = "#" + s.node.id;
              t.setAttribute("data-id", s.node.id);
              toc.appendChild(t);
              tocLinks.push(t);
            });
            box.appendChild(toc);
          }
        }
      });
      box.appendChild(el("div", "nav-empty", "Kein Treffer."));
      nav.appendChild(box);
    });
    side.appendChild(nav);

    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      nav.querySelectorAll(".nav-part").forEach(function (part) {
        var hits = 0;
        part.querySelectorAll("a.nav-page").forEach(function (a) {
          var ok = !q || a.textContent.toLowerCase().indexOf(q) !== -1;
          a.classList.toggle("hidden", !ok);
          if (ok) hits++;
        });
        part.querySelector(".nav-empty").classList.toggle("show", hits === 0);
      });
    });
    search.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = nav.querySelector("a.nav-page:not(.hidden)");
        if (first) first.click();
      }
    });
  }

  /* ---------- Abschnitt markieren ---------- */
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute("data-id")] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        if (current) current.classList.remove("here");
        current = byId[en.target.id];
        if (current) current.classList.add("here");
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    anchors.forEach(function (s) { io.observe(s.node); });
  }

  /* ---------- Vor / Zurück ---------- */
  var page = document.querySelector("main .page");
  var track = onDev ? "dev" : "user";
  var list = ordered.filter(function (p) { return p.track === track; });
  var idx = list.map(function (p) { return p.href; }).indexOf(here);
  if (page && idx !== -1) {
    var pager = el("nav", "pager");
    function link(p, cls, k) {
      var a = el("a", cls);
      a.href = root + p.href;
      a.appendChild(el("span", "k", k));
      a.appendChild(el("span", "t", p.title));
      pager.appendChild(a);
    }
    if (idx > 0) link(list[idx - 1], "prev", "← Zurück");
    if (idx < list.length - 1) link(list[idx + 1], "next", "Weiter →");
    page.appendChild(pager);

    var foot = el("footer", "foot");
    foot.appendChild(el("div", "", "DriveLab " + VERSION + " · Handbuch"));
    foot.appendChild(el("div", "mono", onDev ? "Entwicklerteil · nur im Quellbaum" : "Anwenderteil"));
    page.appendChild(foot);
  }

  /* ---------- Codeblöcke: Kopieren ---------- */
  document.querySelectorAll(".code").forEach(function (block) {
    var btn = el("button", "copy", "Kopieren");
    btn.type = "button";
    btn.addEventListener("click", function () {
      var txt = block.querySelector("pre").innerText;
      function done(ok) {
        btn.textContent = ok ? "Kopiert ✓" : "Fehler";
        setTimeout(function () { btn.textContent = "Kopieren"; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
    block.appendChild(btn);
  });

  /* ---------- Systemlandkarte (nur dev/architektur.html) ---------- */
  var map = document.getElementById("sysmap");
  if (map) {
    var info = document.getElementById("mapinfo");
    var infoDefault = info.innerHTML;
    var nodes = Array.prototype.slice.call(map.querySelectorAll(".map-node"));
    var edges = Array.prototype.slice.call(map.querySelectorAll(".map-edge"));
    var lbls = Array.prototype.slice.call(map.querySelectorAll(".elbl"));
    var pinned = null;

    function clear() {
      map.classList.remove("focus");
      nodes.forEach(function (n) { n.classList.remove("on", "nb"); });
      edges.concat(lbls).forEach(function (e) { e.classList.remove("on"); });
      info.innerHTML = infoDefault;
    }
    function activate(node) {
      clear();
      map.classList.add("focus");
      var id = node.getAttribute("data-id");
      node.classList.add("on");
      edges.concat(lbls).forEach(function (e) {
        var c = (e.getAttribute("data-c") || "").split(" ");
        if (c.indexOf(id) === -1) return;
        e.classList.add("on");
        c.forEach(function (other) {
          if (other === id) return;
          var nb = map.querySelector('.map-node[data-id="' + other + '"]');
          if (nb) nb.classList.add("nb");
        });
      });
      var raw = node.getAttribute("data-info") || "";
      var i = raw.indexOf("|");
      info.innerHTML = '<span class="h"></span><span class="b"></span>';
      info.querySelector(".h").textContent = i === -1 ? raw : raw.slice(0, i);
      info.querySelector(".b").textContent = i === -1 ? "" : raw.slice(i + 1);
    }
    nodes.forEach(function (n) {
      n.addEventListener("mouseenter", function () { if (!pinned) activate(n); });
      n.addEventListener("focus", function () { if (!pinned) activate(n); });
      n.addEventListener("mouseleave", function () { if (!pinned) clear(); });
      n.addEventListener("blur", function () { if (!pinned) clear(); });
      n.addEventListener("click", function (ev) {
        ev.stopPropagation();
        if (pinned === n) { pinned = null; clear(); } else { pinned = n; activate(n); }
      });
      n.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); n.click(); }
      });
    });
    map.addEventListener("click", function () { if (pinned) { pinned = null; clear(); } });
  }
})();
