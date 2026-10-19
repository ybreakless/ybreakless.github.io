/* ==========================================================================
   i18n.js — eight locales, no library.

   Design notes:

   · English is not stored here. It is the markup. On first run the layer
     snapshots whatever the HTML already says and treats that as the `en`
     table, so English can never drift out of sync with the page and the
     file is seven tables instead of eight.

   · Two attributes drive everything. `data-i18n="key"` replaces text
     content; `data-i18n-attr="attr:key"` replaces an attribute, which is
     what aria-labels and placeholders need.

   · Arabic and Persian flip the document to RTL and pull in a typeface
     with Arabic coverage. That request is deferred until someone actually
     picks one of those locales — no visitor should pay for a font they
     will not see.

   · Translations keep proper nouns intact: Rust, asyncio, pandas, NumPy,
     Biopython, HSK, and every product name stay as they are, because that
     is how they appear on the documents.
   ========================================================================== */

(function (global) {
  'use strict';

  var LOCALES = [
    { code: 'en', name: 'English',    native: 'English',  dir: 'ltr' },
    { code: 'de', name: 'German',     native: 'Deutsch',  dir: 'ltr' },
    { code: 'fr', name: 'French',     native: 'Français', dir: 'ltr' },
    { code: 'es', name: 'Spanish',    native: 'Español',  dir: 'ltr' },
    { code: 'ru', name: 'Russian',    native: 'Русский',  dir: 'ltr' },
    { code: 'tr', name: 'Turkish',    native: 'Türkçe',   dir: 'ltr' },
    { code: 'ar', name: 'Arabic',     native: 'العربية',   dir: 'rtl' },
    { code: 'fa', name: 'Persian',    native: 'فارسی',    dir: 'rtl' }
  ];

  var T = {};

  /* ---------------------------------------------------------------- DE -- */
  T.de = {
    'a11y.skip': 'Zum Inhalt springen',
    'boot.skip': 'Überspringen · beliebige Taste',

    'nav.focus': 'Fokus', 'nav.record': 'Nachweise', 'nav.capability': 'Können',
    'nav.work': 'Arbeit', 'nav.console': 'Konsole', 'nav.contact': 'Kontakt',
    'nav.cv': 'Lebenslauf', 'nav.language': 'Sprache', 'nav.theme': 'Farbschema',
    'nav.config': 'Einstellungen', 'nav.menu': 'Menü',

    'hero.status': 'Sicherheit · Rust · Maschinelles Lernen · Bioinformatik',
    'hero.h1a': 'Annahmen angreifen,',
    'hero.h1b': 'Systeme verteidigen.',
    'hero.lead': 'Ein Entwickler, der im Terminal lebt: Python als Arbeitsgerät, Rust als Handwerk, Linux als Heimatboden. Ich untersuche, wie Systeme scheitern — Netzwerke, Modelle, lebender Code — und baue offen, damit jede Behauptung hier überprüfbar bleibt. Das laufende Experiment: maschinelles Lernen in Richtung Rust zu ziehen, wo die Speichersicherheit zur Sprache gehört und nicht zu einem Wrapper.',
    'hero.cta1': 'Konsole öffnen', 'hero.cta2': 'Vollständiger Lebenslauf', 'hero.cta3': 'Repositorien',
    'hero.caption': 'Selbstvermeidender Weg auf einem Gitter — das einfachste Modell der Proteinfaltung und zugleich eine gewöhnliche Graphtraversierung. Genau darum geht es.',
    'hero.artalt': 'Ein selbstvermeidender Weg auf einem Gitter mit markierten nichtlokalen Kontakten',

    'm.repos': 'Öffentliche Repositorien', 'm.certs': 'Zertifikate',
    'm.langs': 'Gesprochene Sprachen', 'm.locales': 'Sprachen auf dieser Seite',

    'focus.h2': 'Vier Disziplinen, ein Werkzeugkasten',
    'focus.note': 'Sicherheit · Rust · ML · Bio',
    'focus.lead': 'Keine dieser Disziplinen steht allein. Sicherheit ist angewandtes Systemdenken, maschinelles Lernen ist Code mit Statistik im Kern, und Biologie ist der offene Datensatz, der sich weigert, einfach zu sein. Ein Werkzeugkasten bedient alle vier: Python, Rust und ein Linux, das nur mir antwortet.',
    'focus.f1.k': 'Netzwerke',
    'focus.f1.h': 'Cybersicherheit',
    'focus.f1.p': 'Hosterkennung, Portscan und Latenzmessung als eigenes Werkzeug statt vom Spickzettel, dazu zertifizierte Grundlagen in Netzwerktechnik und Informationssicherheit. Linux ist die Umgebung, der ich vertraue, weil ihre Mechanik lesbar ist.',
    'focus.f1.w': 'Netzwerktechnik · InfoSec',
    'focus.f2.k': 'Systeme',
    'focus.f2.h': 'Rust als Handwerk',
    'focus.f2.p': 'Ownership, Traits und Zero-Copy-Design statt Wrapper. Python — drei Jahre CLI-Werkzeuge, Pipelines und Parser — bleibt das Arbeitsgerät; Rust ist dort, wo Präzisionsarbeit passiert.',
    'focus.f2.w': 'Rust · Python',
    'focus.f3.k': 'Lernen',
    'focus.f3.h': 'Maschinelles Lernen, gezogen Richtung Rust',
    'focus.f3.p': 'Datenarbeit in pandas und NumPy, Statistik als zertifizierte Kursarbeit, und ein Dauerprojekt: ML-Workloads nach Rust zu bringen, damit Performance und Speichersicherheit aus der Sprache selbst kommen.',
    'focus.f3.w': 'pandas · NumPy · Rust',
    'focus.f4.k': 'Lektüre',
    'focus.f4.h': 'Computational Biology auf dem Schreibtisch',
    'focus.f4.p': 'Sequenzalignment, Struktur und Populationen als ständiges Nebeninteresse. Biopython zum Lesen; das Gitter oben auf dieser Seite ist das Spielzeugmodell, das es interessant hält.',
    'focus.f4.w': 'Bioinformatik',

    'rec.h2': 'Die Nachweise', 'rec.cv': 'Vollständiger Lebenslauf',
    'rec.when1': 'Fertigkeiten', 'rec.when2': 'Sprachen',
    'rec.r1.h': 'Sechs abgeschlossene Zertifikate',
    'rec.r1.p': 'Datenanalyse, Python, Versionskontrolle, Netzwerk- und Sicherheitsgrundlagen. Unten vollständig aufgeführt, denn eine Zahl ohne Namen ist kein Nachweis.',
    'rec.r2.h': 'Sechs Sprachen, zertifiziert wo es zählt',
    'rec.r2.p': 'Türkisch und Aserbaidschanisch auf C2. Arabisch auf B1 und weiter im Steigen, Chinesisch auf HSK 2, Französisch in Arbeit. Englisch ist die Arbeitssprache dieser Seite.',
    'rec.learning': 'in Arbeit', 'rec.working': 'aktiv',
    'rec.r3.h': 'Öffentliche Repositorien',
    'rec.r3.p': 'Alles liegt auf GitHub, einschließlich dieser Seite. Wenig, aber echt und einsehbar — genau deshalb steht es hier.',
    'rec.verify': 'Verifizierungslinks ausstehend', 'rec.verifysub': 'Bis sie verlinkt sind, sind das Behauptungen',

    'cap.h2': 'Was ich tatsächlich kann', 'cap.note': 'Aussagen so groß wie die Belege',
    'cap.c1': 'Code', 'cap.c2': 'Maschinelles Lernen & Daten', 'cap.c3': 'Sicherheit & Systeme',
    'cap.rust': 'Haupthandwerk · ML-Werkzeuge', 'cap.python': 'Arbeitsgerät · 3 Jahre',
    'cap.bash': 'Täglich im Einsatz',
    'cap.sql': 'Joins, Aggregation', 'cap.web': 'Diese Seite, von Hand',
    'cap.pandas': 'Bereinigen, Aggregieren', 'cap.plots': 'Explorative Diagramme',
    'cap.stats': 'Zertifizierte Kursarbeit', 'cap.biopy': 'Sequenzlektüre',
    'cap.linux': 'Hauptumgebung', 'cap.net': 'Zertifizierte Grundlagen',
    'cap.infosec': 'Zertifiziert', 'cap.ps': 'Windows-Administration',
    'cap.git': 'Branches, PR-Workflow',
    'cap.foot': 'Nirgends steht hier „Experte“. Jede Angabe nennt stattdessen ihren Beleg, denn der schnellste Weg, eine fachkundige Leserschaft zu verlieren, ist eine Behauptung, die sich mit einem Klick widerlegen lässt.',

    'work.h2': 'Ausgeliefert', 'work.all': 'Alle Repositorien',
    'work.problem': 'Problem', 'work.approach': 'Ansatz', 'work.result': 'Ergebnis',
    'work.source': 'Quellcode', 'work.shipped': 'Fertig', 'work.local': 'Lokal',
    'work.pending': 'Veröffentlichung ausstehend',
    'work.p1.kicker': 'Live · quelloffen', 'work.p1.h': 'Diese Seite',
    'work.p1.problem': 'Personalverantwortliche, Mitwirkende und Agenturen brauchen dieselben Fakten in jeweils anderer Form — bisher von Hand synchron gehalten.',
    'work.p1.approach': 'Eine statische Seite, ohne Framework und ohne Build-Schritt. Ein tokenbasiertes Designsystem, ein selbst geschriebener Interpreter für die Konsole weiter unten, acht Sprachen samt Rechts-nach-links-Unterstützung und ein Druck-Stylesheet, das den Lebenslauf direkt auf A4 ausgibt.',
    'work.p1.result': 'Von 8,4 MB auf rund 70 KB gzip-komprimiert, keine Abhängigkeiten, WCAG-AA-Kontrast in beiden Farbschemata, und jede Zeichnung stammt aus einem Skript im Repositorium statt aus einem Modell.',
    'work.p1.alt': 'Zwei alignierte Sequenzen mit ihrer Übereinstimmungsspur',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Netzwerk-Toolkit fürs Terminal',
    'work.p2.problem': 'Eine Netzwerkdiagnose bedeutete vier Werkzeuge zu starten und ihre Ausgaben im Kopf zusammenzuführen.',
    'work.p2.approach': 'Ein einziges Python-Kommandozeilenwerkzeug, das Hosterkennung, Portscan und Latenzmessungen nebenläufig über asyncio ausführt und einen einzigen Bericht ausgibt. Nur Standardbibliothek.',
    'work.p2.result': 'Nebenläufigkeit macht aus einem seriellen Subnetz-Durchlauf einen parallelen. Der Faktor wird hier nicht genannt, weil er nicht unter kontrollierten Bedingungen gemessen wurde — die Zahl kommt hinzu, wenn der Benchmark da ist, vorher nicht.',
    'work.p2.alt': 'Ein periodisches Signal mit einem markierten Auswertungsfenster',

    'term.h2': 'Konsole', 'term.note': 'Tab vervollständigt · ↑↓ ruft auf',
    'term.lead': 'Alles auf dieser Seite ist auch durch Tippen erreichbar. Der Interpreter umfasst rund zweihundert Zeilen JavaScript ohne Abhängigkeiten und kann die Seite umkonfigurieren — versuchen Sie theme light, lang de oder help.',
    'term.hint': 'help eingeben', 'term.output': 'Konsolenausgabe',
    'term.inlabel': 'Konsolenbefehl', 'term.placeholder': 'help',

    'contact.h2': 'Kontakt aufnehmen', 'contact.note': 'Antwort binnen 24 Stunden',
    'contact.lead': 'Recruiter, Sicherheitsteams, Menschen, die an ML-Werkzeugen bauen, und alle, wo Code auf lebende Systeme trifft — das ist der schnellste Weg zu mir.',
    'contact.email': 'E-Mail', 'contact.name': 'Name oder Einrichtung',
    'contact.mail': 'E-Mail', 'contact.msg': 'Nachricht', 'contact.send': 'Senden',
    'contact.privacy': 'Geht in genau ein Postfach. Kein Verteiler, keine Weitergabe, kein Tracking auf dieser Seite.',

    'foot.built': 'von Hand geschrieben, ohne Abhängigkeiten', 'foot.source': 'Quellcode', 'foot.top': 'Nach oben',

    'cfg.title': 'Seiteneinstellungen', 'cfg.close': 'Schließen',
    'cfg.theme': 'Farbschema', 'cfg.dark': 'Dunkel', 'cfg.light': 'Hell', 'cfg.auto': 'System',
    'cfg.motion': 'Bewegung', 'cfg.full': 'Voll', 'cfg.reduced': 'Reduziert',
    'cfg.motionhint': 'Ihre Systemeinstellung hat standardmäßig Vorrang; dies überschreibt sie in beide Richtungen.',
    'cfg.grid': 'Hintergrundraster', 'cfg.on': 'An', 'cfg.off': 'Aus',
    'cfg.language': 'Sprache',
    'cfg.langhint': 'Arabisch und Persisch stellen die ganze Seite auf Rechts-nach-links um und laden eine passende Schrift.',
    'cfg.reset': 'Zurücksetzen', 'cfg.resetbtn': 'Gespeicherte Einstellungen löschen',
    'cfg.resethint': 'Die Einstellungen bleiben in diesem Browser. Es wird nichts übertragen.'
  };

  /* ---------------------------------------------------------------- FR -- */
  T.fr = {
    'a11y.skip': 'Aller au contenu',
    'boot.skip': 'Passer · appuyez sur une touche',

    'nav.focus': 'Axes', 'nav.record': 'Dossier', 'nav.capability': 'Compétences',
    'nav.work': 'Travaux', 'nav.console': 'Console', 'nav.contact': 'Contact',
    'nav.cv': 'CV', 'nav.language': 'Langue', 'nav.theme': 'Thème',
    'nav.config': 'Réglages', 'nav.menu': 'Menu',

    'hero.status': 'Sécurité · Rust · Apprentissage automatique · Bio-informatique',
    'hero.h1a': 'Attaquer les hypothèses,',
    'hero.h1b': 'défendre les systèmes.',
    'hero.lead': 'Un développeur qui vit dans le terminal : Python comme outil de terrain, Rust comme artisanat, Linux comme terrain d’appui. J’étudie comment les systèmes échouent — réseaux, modèles, code vivant — et je construis en public pour que chaque affirmation ici reste vérifiable. L’expérience en cours : tirer l’apprentissage automatique vers Rust, où la sécurité mémoire appartient au langage et non à un emballage.',
    'hero.cta1': 'Ouvrir la console', 'hero.cta2': 'CV complet', 'hero.cta3': 'Dépôts',
    'hero.caption': 'Marche auto-évitante sur un réseau — le modèle jouet du repliement des protéines, et un simple parcours de graphe. Les deux lectures sont voulues.',
    'hero.artalt': 'Une marche auto-évitante sur un réseau, contacts non locaux marqués',

    'm.repos': 'Dépôts publics', 'm.certs': 'Certifications',
    'm.langs': 'Langues parlées', 'm.locales': 'Langues sur cette page',

    'focus.h2': 'Quatre disciplines, une boîte à outils',
    'focus.note': 'Sécurité · Rust · ML · Bio',
    'focus.lead': 'Aucune de ces disciplines ne tient seule. La sécurité est de la pensée système appliquée, l’apprentissage automatique est du code avec la statistique au centre, et la biologie est le jeu de données ouvert qui refuse d’être simple. Une seule boîte à outils sert les quatre : Python, Rust, et un Linux qui ne répond qu’à moi.',
    'focus.f1.k': 'Réseaux',
    'focus.f1.h': 'Cybersécurité',
    'focus.f1.p': 'Découverte d’hôtes, balayage de ports et mesure de latence écrits comme mes propres outils plutôt que copiés d’antisèches, adossés aux bases certifiées des réseaux et de la sécurité informatique. Linux est l’environnement auquel je fais confiance parce que ses mécanismes sont lisibles.',
    'focus.f1.w': 'Réseaux · InfoSec',
    'focus.f2.k': 'Systèmes',
    'focus.f2.h': 'Rust, l’artisanat',
    'focus.f2.p': 'Ownership, traits et conception zéro-copie au lieu d’emballages. Python — trois ans d’outils en ligne de commande, de pipelines et de parseurs — reste l’outil de terrain ; Rust est là où se joue le travail de précision.',
    'focus.f2.w': 'Rust · Python',
    'focus.f3.k': 'Apprentissage',
    'focus.f3.h': 'L’apprentissage automatique tiré vers Rust',
    'focus.f3.p': 'Les données avec pandas et NumPy, la statistique en cursus certifié, et un projet permanent : faire passer les charges de travail de ML dans Rust, pour que la performance et la sécurité mémoire viennent du langage lui-même.',
    'focus.f3.w': 'pandas · NumPy · Rust',
    'focus.f4.k': 'Lectures',
    'focus.f4.h': 'La biologie computationnelle sur la table',
    'focus.f4.p': 'Alignement de séquences, structure et populations comme un intérêt permanent. Biopython pour lire ; le réseau en haut de cette page est le modèle jouet qui rend le tout intéressant.',
    'focus.f4.w': 'Bio-informatique',

    'rec.h2': 'Le dossier', 'rec.cv': 'CV complet',
    'rec.when1': 'Compétences', 'rec.when2': 'Langues',
    'rec.r1.h': 'Six certifications obtenues',
    'rec.r1.p': 'Analyse de données, Python, gestion de versions, réseaux et bases de la sécurité. Toutes listées ci-dessous, car un chiffre sans noms n’est pas une preuve.',
    'rec.r2.h': 'Six langues, certifiées là où ça compte',
    'rec.r2.p': 'Turc et azéri au niveau C2. Arabe en B1 et toujours en progression, chinois au HSK 2, français en cours. L’anglais est la langue de travail de cette page.',
    'rec.learning': 'en cours', 'rec.working': 'actif',
    'rec.r3.h': 'Dépôts publics',
    'rec.r3.p': 'Tout est sur GitHub, y compris ce site. Peu, mais réel et vérifiable — c’est précisément pour cela que c’est ici.',
    'rec.verify': 'Liens de vérification à venir', 'rec.verifysub': 'Tant qu’ils ne sont pas liés, ce sont des affirmations',

    'cap.h2': 'Ce que je sais réellement faire', 'cap.note': 'Des affirmations à la taille des preuves',
    'cap.c1': 'Code', 'cap.c2': 'Apprentissage automatique & données', 'cap.c3': 'Sécurité & systèmes',
    'cap.rust': 'Artisanat principal · outils ML', 'cap.python': 'Outil de terrain · 3 ans',
    'cap.bash': 'Usage quotidien',
    'cap.sql': 'Jointures, agrégation', 'cap.web': 'Ce site, à la main',
    'cap.pandas': 'Nettoyage, agrégation', 'cap.plots': 'Graphiques exploratoires',
    'cap.stats': 'Cursus certifié', 'cap.biopy': 'Lecture de séquences',
    'cap.linux': 'Environnement principal', 'cap.net': 'Bases certifiées',
    'cap.infosec': 'Certifié', 'cap.ps': 'Administration Windows',
    'cap.git': 'Branches, flux de PR',
    'cap.foot': 'Le mot « expert » n’apparaît nulle part. Chaque intitulé nomme sa preuve, parce que le moyen le plus rapide de perdre un lecteur technique est une affirmation qu’il peut réfuter en un clic.',

    'work.h2': 'Livré', 'work.all': 'Tous les dépôts',
    'work.problem': 'Problème', 'work.approach': 'Approche', 'work.result': 'Résultat',
    'work.source': 'Code source', 'work.shipped': 'Livré', 'work.local': 'Local',
    'work.pending': 'Publication en attente',
    'work.p1.kicker': 'En ligne · open source', 'work.p1.h': 'Ce site',
    'work.p1.problem': 'Recruteurs, collaborateurs et agences réclament les mêmes faits sous une forme différente — tenus à jour à la main jusqu’ici.',
    'work.p1.approach': 'Un site statique, sans framework ni étape de build. Un système de design par tokens, un interpréteur écrit à la main pour la console ci-dessous, huit langues avec prise en charge de la droite-à-gauche, et une feuille de style d’impression qui produit le CV directement en A4.',
    'work.p1.result': 'De 8,4 Mo à environ 70 Ko compressés, zéro dépendance, contraste WCAG AA dans les deux thèmes, et chaque dessin produit par un script du dépôt plutôt que par un modèle.',
    'work.p1.alt': 'Deux séquences alignées et leur piste d’identité',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Boîte à outils réseau en terminal',
    'work.p2.problem': 'Diagnostiquer un réseau imposait de lancer quatre utilitaires et de corréler leurs sorties à l’œil.',
    'work.p2.approach': 'Un seul outil Python en ligne de commande qui exécute découverte d’hôtes, balayage de ports et mesures de latence en parallèle via asyncio, puis imprime un rapport unique. Bibliothèque standard uniquement.',
    'work.p2.result': 'La concurrence transforme un balayage de sous-réseau séquentiel en balayage parallèle. Le facteur d’accélération n’est pas cité ici parce qu’il n’a pas été mesuré dans des conditions contrôlées — le chiffre arrivera avec le banc d’essai, pas avant.',
    'work.p2.alt': 'Un signal périodique avec une fenêtre d’analyse marquée',

    'term.h2': 'Console', 'term.note': 'Tab complète · ↑↓ rappelle',
    'term.lead': 'Tout sur cette page est aussi accessible au clavier. L’interpréteur fait environ deux cents lignes de JavaScript sans dépendances, et il peut reconfigurer le site — essayez theme light, lang fr ou help.',
    'term.hint': 'tapez help', 'term.output': 'Sortie de la console',
    'term.inlabel': 'Commande de console', 'term.placeholder': 'help',

    'contact.h2': 'Me contacter', 'contact.note': 'Réponse sous 24 heures',
    'contact.lead': 'Recruteurs, équipes de sécurité, personnes qui construisent des outils de ML, et quiconque travaille là où le code rencontre le vivant — voici le chemin le plus court.',
    'contact.email': 'E-mail', 'contact.name': 'Nom ou institution',
    'contact.mail': 'E-mail', 'contact.msg': 'Message', 'contact.send': 'Envoyer',
    'contact.privacy': 'Arrive dans une seule boîte. Aucune liste, aucune transmission, aucun traçage sur cette page.',

    'foot.built': 'écrit à la main, sans dépendances', 'foot.source': 'Code source', 'foot.top': 'Haut de page',

    'cfg.title': 'Réglages du site', 'cfg.close': 'Fermer',
    'cfg.theme': 'Thème', 'cfg.dark': 'Sombre', 'cfg.light': 'Clair', 'cfg.auto': 'Système',
    'cfg.motion': 'Animations', 'cfg.full': 'Complètes', 'cfg.reduced': 'Réduites',
    'cfg.motionhint': 'Le réglage de votre système l’emporte par défaut ; ceci le remplace dans les deux sens.',
    'cfg.grid': 'Grille de fond', 'cfg.on': 'Activée', 'cfg.off': 'Désactivée',
    'cfg.language': 'Langue',
    'cfg.langhint': 'L’arabe et le persan basculent toute la page en droite-à-gauche et chargent une typographie adaptée.',
    'cfg.reset': 'Réinitialiser', 'cfg.resetbtn': 'Effacer les réglages enregistrés',
    'cfg.resethint': 'Les réglages restent dans ce navigateur. Rien n’est envoyé.'
  };

  /* ---------------------------------------------------------------- ES -- */
  T.es = {
    'a11y.skip': 'Saltar al contenido',
    'boot.skip': 'Omitir · pulse cualquier tecla',

    'nav.focus': 'Enfoque', 'nav.record': 'Expediente', 'nav.capability': 'Competencias',
    'nav.work': 'Trabajo', 'nav.console': 'Consola', 'nav.contact': 'Contacto',
    'nav.cv': 'CV', 'nav.language': 'Idioma', 'nav.theme': 'Tema',
    'nav.config': 'Ajustes', 'nav.menu': 'Menú',

    'hero.status': 'Seguridad · Rust · Aprendizaje automático · Bioinformática',
    'hero.h1a': 'Atacar supuestos,',
    'hero.h1b': 'defender sistemas.',
    'hero.lead': 'Un desarrollador que vive en el terminal: Python como herramienta de campo, Rust como oficio, Linux como terreno propio. Estudio cómo fallan los sistemas — redes, modelos, código vivo — y construyo en abierto para que cada afirmación aquí sea comprobable. El experimento permanente: llevar el aprendizaje automático hacia Rust, donde la seguridad de la memoria pertenece al lenguaje y no a un envoltorio.',
    'hero.cta1': 'Abrir la consola', 'hero.cta2': 'CV completo', 'hero.cta3': 'Repositorios',
    'hero.caption': 'Camino autoevitante sobre una red: el modelo de juguete del plegamiento de proteínas y, a la vez, un recorrido de grafo. Ambas lecturas son intencionadas.',
    'hero.artalt': 'Un camino autoevitante sobre una red con sus contactos no locales marcados',

    'm.repos': 'Repositorios públicos', 'm.certs': 'Certificaciones',
    'm.langs': 'Idiomas hablados', 'm.locales': 'Idiomas en esta página',

    'focus.h2': 'Cuatro disciplinas, una caja de herramientas',
    'focus.note': 'Seguridad · Rust · ML · Bio',
    'focus.lead': 'Ninguna disciplina sostiene sola. La seguridad es pensamiento sistémico aplicado, el aprendizaje automático es código con la estadística en el corazón, y la biología es el conjunto de datos abierto que se niega a ser simple. Una sola caja de herramientas sirve a las cuatro: Python, Rust y un Linux que solo me obedece a mí.',
    'focus.f1.k': 'Redes',
    'focus.f1.h': 'Ciberseguridad',
    'focus.f1.p': 'Descubrimiento de hosts, escaneo de puertos y medición de latencia escritos como herramientas propias, no copiadas de chuletas, con fundamentos certificados de redes y seguridad de la información. Linux es el entorno en el que confío porque sus mecanismos son legibles.',
    'focus.f1.w': 'Redes · InfoSec',
    'focus.f2.k': 'Sistemas',
    'focus.f2.h': 'Rust, el oficio',
    'focus.f2.p': 'Ownership, traits y diseño zero-copy en lugar de envoltorios. Python — tres años de CLIs, canalizaciones y parseadores — sigue siendo la herramienta de campo; Rust es donde ocurre el trabajo de precisión.',
    'focus.f2.w': 'Rust · Python',
    'focus.f3.k': 'Aprendizaje',
    'focus.f3.h': 'Aprendizaje automático, tirado hacia Rust',
    'focus.f3.p': 'Datos con pandas y NumPy, estadística como curso certificado, y un proyecto permanente: llevar las cargas de trabajo de ML a Rust, para que el rendimiento y la seguridad de memoria salgan del propio lenguaje.',
    'focus.f3.w': 'pandas · NumPy · Rust',
    'focus.f4.k': 'Lecturas',
    'focus.f4.h': 'Biología computacional, en la mesa',
    'focus.f4.p': 'Alineamiento de secuencias, estructura y poblaciones como interés permanente. Biopython para leer; la red en lo alto de esta página es el modelo de juguete que lo mantiene interesante.',
    'focus.f4.w': 'Bioinformática',

    'rec.h2': 'El expediente', 'rec.cv': 'CV completo',
    'rec.when1': 'Habilidades', 'rec.when2': 'Idiomas',
    'rec.r1.h': 'Seis certificaciones completadas',
    'rec.r1.p': 'Analítica de datos, Python, control de versiones, redes y fundamentos de seguridad. Se enumeran abajo al completo, porque una cifra sin nombres no es una prueba.',
    'rec.r2.h': 'Seis idiomas, certificados donde importa',
    'rec.r2.p': 'Turco y azerí en C2. Árabe en B1 y aún subiendo, chino en HSK 2, francés en marcha. El inglés es el idioma de trabajo de esta página.',
    'rec.learning': 'en marcha', 'rec.working': 'activo',
    'rec.r3.h': 'Repositorios públicos',
    'rec.r3.p': 'Todo está en GitHub, incluido este sitio. Poco, pero real e inspeccionable, que es justamente la razón de que esté aquí.',
    'rec.verify': 'Enlaces de verificación pendientes', 'rec.verifysub': 'Mientras no se enlacen, son afirmaciones',

    'cap.h2': 'Lo que sé hacer de verdad', 'cap.note': 'Afirmaciones del tamaño de su prueba',
    'cap.c1': 'Código', 'cap.c2': 'Aprendizaje automático y datos', 'cap.c3': 'Seguridad y sistemas',
    'cap.rust': 'Oficio principal · herramientas ML', 'cap.python': 'Herramienta de campo · 3 años',
    'cap.bash': 'Uso diario',
    'cap.sql': 'Joins, agregación', 'cap.web': 'Este sitio, a mano',
    'cap.pandas': 'Limpieza, agregación', 'cap.plots': 'Gráficos exploratorios',
    'cap.stats': 'Curso certificado', 'cap.biopy': 'Lectura de secuencias',
    'cap.linux': 'Entorno principal', 'cap.net': 'Fundamentos certificados',
    'cap.infosec': 'Certificado', 'cap.ps': 'Administración de Windows',
    'cap.git': 'Ramas, flujo de PR',
    'cap.foot': 'En ninguna parte pone «experto». Cada etiqueta nombra su prueba, porque la forma más rápida de perder a un lector técnico es una afirmación que puede refutar con un clic.',

    'work.h2': 'Entregado', 'work.all': 'Todos los repositorios',
    'work.problem': 'Problema', 'work.approach': 'Enfoque', 'work.result': 'Resultado',
    'work.source': 'Código', 'work.shipped': 'Entregado', 'work.local': 'Local',
    'work.pending': 'Publicación pendiente',
    'work.p1.kicker': 'En línea · código abierto', 'work.p1.h': 'Este sitio',
    'work.p1.problem': 'Reclutadores, colaboradores y agencias necesitan los mismos datos con forma distinta, mantenidos sincronizados a mano.',
    'work.p1.approach': 'Un sitio estático, sin framework ni paso de compilación. Un sistema de diseño por tokens, un intérprete escrito a mano para la consola de abajo, ocho idiomas con soporte de derecha a izquierda y una hoja de estilo de impresión que genera el CV directamente en A4.',
    'work.p1.result': 'De 8,4 MB a unos 70 KB comprimidos, cero dependencias, contraste WCAG AA en ambos temas y cada dibujo generado por un script del repositorio en lugar de por un modelo.',
    'work.p1.alt': 'Dos secuencias alineadas con su pista de identidad',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Kit de red para terminal',
    'work.p2.problem': 'Diagnosticar una red obligaba a ejecutar cuatro utilidades y correlacionar sus salidas a ojo.',
    'work.p2.approach': 'Una única herramienta Python de línea de comandos que ejecuta descubrimiento de hosts, escaneo de puertos y medición de latencia de forma concurrente sobre asyncio y luego imprime un solo informe. Solo biblioteca estándar.',
    'work.p2.result': 'La concurrencia convierte un barrido de subred en serie en uno en paralelo. Aquí no se cita la mejora porque no se ha medido en condiciones controladas: la cifra llegará con el banco de pruebas, no antes.',
    'work.p2.alt': 'Una señal periódica con una ventana de análisis marcada',

    'term.h2': 'Consola', 'term.note': 'Tab completa · ↑↓ recupera',
    'term.lead': 'Todo lo de esta página también se alcanza escribiendo. El intérprete son unas doscientas líneas de JavaScript sin dependencias y puede reconfigurar el sitio: pruebe theme light, lang es o help.',
    'term.hint': 'escriba help', 'term.output': 'Salida de la consola',
    'term.inlabel': 'Comando de consola', 'term.placeholder': 'help',

    'contact.h2': 'Ponerse en contacto', 'contact.note': 'Respuesta en 24 horas',
    'contact.lead': 'Reclutadores, equipos de seguridad, gente construyendo herramientas de ML y quien trabaje donde el código se encuentra con lo vivo: esta es la vía más rápida.',
    'contact.email': 'Correo', 'contact.name': 'Nombre o institución',
    'contact.mail': 'Correo', 'contact.msg': 'Mensaje', 'contact.send': 'Enviar',
    'contact.privacy': 'Llega a un solo buzón. Sin lista, sin reenvíos, sin rastreo en esta página.',

    'foot.built': 'escrito a mano, sin dependencias', 'foot.source': 'Código', 'foot.top': 'Arriba',

    'cfg.title': 'Ajustes del sitio', 'cfg.close': 'Cerrar',
    'cfg.theme': 'Tema', 'cfg.dark': 'Oscuro', 'cfg.light': 'Claro', 'cfg.auto': 'Sistema',
    'cfg.motion': 'Movimiento', 'cfg.full': 'Completo', 'cfg.reduced': 'Reducido',
    'cfg.motionhint': 'El ajuste de su sistema ya manda por defecto; esto lo sobrescribe en ambos sentidos.',
    'cfg.grid': 'Rejilla de fondo', 'cfg.on': 'Activada', 'cfg.off': 'Desactivada',
    'cfg.language': 'Idioma',
    'cfg.langhint': 'El árabe y el persa cambian toda la página a derecha-a-izquierda y cargan una tipografía adecuada.',
    'cfg.reset': 'Restablecer', 'cfg.resetbtn': 'Borrar los ajustes guardados',
    'cfg.resethint': 'Los ajustes se quedan en este navegador. No se envía nada.'
  };

  /* ---------------------------------------------------------------- RU -- */
  T.ru = {
    'a11y.skip': 'Перейти к содержанию',
    'boot.skip': 'Пропустить · нажмите любую клавишу',

    'nav.focus': 'Фокус', 'nav.record': 'Документы', 'nav.capability': 'Навыки',
    'nav.work': 'Работы', 'nav.console': 'Консоль', 'nav.contact': 'Контакты',
    'nav.cv': 'Резюме', 'nav.language': 'Язык', 'nav.theme': 'Тема',
    'nav.config': 'Настройки', 'nav.menu': 'Меню',

    'hero.status': 'Безопасность · Rust · Машинное обучение · Биоинформатика',
    'hero.h1a': 'Сомневаться в предположениях,',
    'hero.h1b': 'защищать системы.',
    'hero.lead': 'Разработчик, живущий в терминале: Python как полевой инструмент, Rust как ремесло, Linux как родная земля. Я изучаю, как выходят из строя системы — сети, модели, живой код — и работаю в открытую, чтобы каждое заявление здесь можно было проверить. Постоянный эксперимент: подтягивать машинное обучение к Rust, где безопасность памяти принадлежит языку, а не обёртке.',
    'hero.cta1': 'Открыть консоль', 'hero.cta2': 'Полное резюме', 'hero.cta3': 'Репозитории',
    'hero.caption': 'Самонепересекающееся блуждание по решётке — простейшая модель сворачивания белка и одновременно обычный обход графа. Оба прочтения здесь намеренны.',
    'hero.artalt': 'Самонепересекающееся блуждание по решётке с отмеченными нелокальными контактами',

    'm.repos': 'Открытые репозитории', 'm.certs': 'Сертификаты',
    'm.langs': 'Разговорные языки', 'm.locales': 'Языков на странице',

    'focus.h2': 'Четыре дисциплины, один инструментарий',
    'focus.note': 'Безопасность · Rust · ML · Био',
    'focus.lead': 'Ни одна дисциплина не стоит сама по себе. Безопасность — прикладное системное мышление, машинное обучение — код со статистикой в ядре, биология — открытый набор данных, который отказывается быть простым. Один инструментарий обслуживает все четыре: Python, Rust и Linux, который отвечает только мне.',
    'focus.f1.k': 'Сети',
    'focus.f1.h': 'Кибербезопасность',
    'focus.f1.p': 'Обнаружение узлов, сканирование портов и замер задержек — инструменты, написанные самостоятельно, а не скопированные из шпаргалок, плюс сертифицированные основы сетей и информационной безопасности. Linux — моя основная среда, и я ему доверяю, потому что его механику можно прочесть.',
    'focus.f1.w': 'Сети · ИБ',
    'focus.f2.k': 'Системы',
    'focus.f2.h': 'Rust как ремесло',
    'focus.f2.p': 'Владение (ownership), типажи (traits) и zero-copy дизайн вместо обёрток. Python — три года CLI-утилит, конвейеров и парсеров — остаётся полевым инструментом; Rust — там, где идёт точная работа.',
    'focus.f2.w': 'Rust · Python',
    'focus.f3.k': 'Обучение',
    'focus.f3.h': 'Машинное обучение, подтянутое к Rust',
    'focus.f3.p': 'Данные в pandas и NumPy, статистика как сертифицированный курс и постоянный проект: переносить ML-нагрузки в Rust, чтобы производительность и безопасность памяти шли от самого языка.',
    'focus.f3.w': 'pandas · NumPy · Rust',
    'focus.f4.k': 'Чтение',
    'focus.f4.h': 'Вычислительная биология на столе',
    'focus.f4.p': 'Выравнивание последовательностей, структура и популяции — постоянный интерес. Biopython для чтения; решётка вверху этой страницы — та игрушечная модель, которая не даёт скучать.',
    'focus.f4.w': 'Биоинформатика',

    'rec.h2': 'Документы', 'rec.cv': 'Полное резюме',
    'rec.when1': 'Навыки', 'rec.when2': 'Языки',
    'rec.r1.h': 'Шесть завершённых сертификаций',
    'rec.r1.p': 'Анализ данных, Python, контроль версий, сети и основы безопасности. Полный список ниже, потому что число без названий — не доказательство.',
    'rec.r2.h': 'Шесть языков, сертификация там, где важно',
    'rec.r2.p': 'Турецкий и азербайджанский — C2. Арабский — B1 и продолжает расти, китайский — HSK 2, французский — в работе. Английский — рабочий язык этой страницы.',
    'rec.learning': 'в работе', 'rec.working': 'активно',
    'rec.r3.h': 'Открытые репозитории',
    'rec.r3.p': 'Всё лежит на GitHub, включая этот сайт. Немного, но по-настоящему и с возможностью проверить — ровно поэтому оно здесь.',
    'rec.verify': 'Ссылки на проверку готовятся', 'rec.verifysub': 'Пока они не проставлены, это заявления',

    'cap.h2': 'Что я действительно умею', 'cap.note': 'Заявления по размеру доказательств',
    'cap.c1': 'Код', 'cap.c2': 'Машинное обучение и данные', 'cap.c3': 'Безопасность и системы',
    'cap.rust': 'Основное ремесло · ML-инструменты', 'cap.python': 'Полевой инструмент · 3 года',
    'cap.bash': 'Ежедневно',
    'cap.sql': 'Соединения, агрегация', 'cap.web': 'Этот сайт, вручную',
    'cap.pandas': 'Очистка, агрегация', 'cap.plots': 'Разведочные графики',
    'cap.stats': 'Сертифицированный курс', 'cap.biopy': 'Чтение последовательностей',
    'cap.linux': 'Основная среда', 'cap.net': 'Сертифицированные основы',
    'cap.infosec': 'Сертифицировано', 'cap.ps': 'Администрирование Windows',
    'cap.git': 'Ветки, работа через PR',
    'cap.foot': 'Слова «эксперт» здесь нет нигде. Каждая подпись вместо этого называет своё доказательство: самый быстрый способ потерять технического читателя — заявление, которое опровергается одним щелчком.',

    'work.h2': 'Сделано', 'work.all': 'Все репозитории',
    'work.problem': 'Задача', 'work.approach': 'Подход', 'work.result': 'Результат',
    'work.source': 'Исходники', 'work.shipped': 'Готово', 'work.local': 'Локально',
    'work.pending': 'Публикация готовится',
    'work.p1.kicker': 'Онлайн · открытый код', 'work.p1.h': 'Этот сайт',
    'work.p1.problem': 'Рекрутёры, соавторы и агентства требуют одни и те же факты в разной форме — и всё это синхронизировалось вручную.',
    'work.p1.approach': 'Один статический сайт, без фреймворка и без сборки. Дизайн-система на токенах, написанный вручную интерпретатор для консоли ниже, восемь языков с поддержкой письма справа налево и стиль печати, который выводит резюме прямо на A4.',
    'work.p1.result': 'С 8,4 МБ до примерно 70 КБ в сжатом виде, ноль зависимостей, контраст WCAG AA в обеих темах, и каждый рисунок создан скриптом из репозитория, а не моделью.',
    'work.p1.alt': 'Две выровненные последовательности и дорожка совпадений',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Сетевой набор для терминала',
    'work.p2.problem': 'Диагностика сети означала запуск четырёх утилит и сопоставление их вывода на глаз.',
    'work.p2.approach': 'Один инструмент командной строки на Python, который параллельно на asyncio выполняет обнаружение узлов, сканирование портов и замеры задержки, а затем печатает единый отчёт. Только стандартная библиотека.',
    'work.p2.result': 'Параллельность превращает последовательный обход подсети в одновременный. Коэффициент ускорения здесь не назван, потому что он не измерялся в контролируемых условиях: цифра появится вместе с бенчмарком, не раньше.',
    'work.p2.alt': 'Периодический сигнал с отмеченным окном анализа',

    'term.h2': 'Консоль', 'term.note': 'Tab дополняет · ↑↓ вызывает историю',
    'term.lead': 'Всё на этой странице доступно и с клавиатуры. Интерпретатор — около двухсот строк JavaScript без зависимостей, и он умеет перенастраивать сайт: попробуйте theme light, lang ru или help.',
    'term.hint': 'наберите help', 'term.output': 'Вывод консоли',
    'term.inlabel': 'Команда консоли', 'term.placeholder': 'help',

    'contact.h2': 'Связаться', 'contact.note': 'Ответ в течение 24 часов',
    'contact.lead': 'Рекрутёры, команды по безопасности, люди, строящие ML-инструменты, и все, кто работает на стыке кода и живого, — это самый короткий путь ко мне.',
    'contact.email': 'Почта', 'contact.name': 'Имя или организация',
    'contact.mail': 'Почта', 'contact.msg': 'Сообщение', 'contact.send': 'Отправить',
    'contact.privacy': 'Приходит в один ящик. Без рассылки, без пересылки, без слежения на этой странице.',

    'foot.built': 'написано вручную, без зависимостей', 'foot.source': 'Исходники', 'foot.top': 'Наверх',

    'cfg.title': 'Настройки сайта', 'cfg.close': 'Закрыть',
    'cfg.theme': 'Тема', 'cfg.dark': 'Тёмная', 'cfg.light': 'Светлая', 'cfg.auto': 'Системная',
    'cfg.motion': 'Анимация', 'cfg.full': 'Полная', 'cfg.reduced': 'Ограниченная',
    'cfg.motionhint': 'Системная настройка по умолчанию имеет приоритет; это переопределяет её в обе стороны.',
    'cfg.grid': 'Фоновая сетка', 'cfg.on': 'Вкл', 'cfg.off': 'Выкл',
    'cfg.language': 'Язык',
    'cfg.langhint': 'Арабский и персидский переключают всю страницу на письмо справа налево и подгружают подходящий шрифт.',
    'cfg.reset': 'Сброс', 'cfg.resetbtn': 'Очистить сохранённые настройки',
    'cfg.resethint': 'Настройки остаются только в этом браузере. Никуда ничего не отправляется.'
  };

  /* ---------------------------------------------------------------- TR -- */
  T.tr = {
    'a11y.skip': 'İçeriğe geç',
    'boot.skip': 'Atla · herhangi bir tuş',

    'nav.focus': 'Odak', 'nav.record': 'Kayıt', 'nav.capability': 'Yetkinlik',
    'nav.work': 'İşler', 'nav.console': 'Konsol', 'nav.contact': 'İletişim',
    'nav.cv': 'CV', 'nav.language': 'Dil', 'nav.theme': 'Tema',
    'nav.config': 'Ayarlar', 'nav.menu': 'Menü',

    'hero.status': 'Siber güvenlik · Rust · Makine öğrenmesi · Biyoenformatik',
    'hero.h1a': 'Varsayımları sorgulamak,',
    'hero.h1b': 'sistemleri savunmak.',
    'hero.lead': 'Terminalde yaşayan bir geliştirici: Python saha aracı, Rust zanaat, Linux ev sahası. Sistemlerin nasıl bozulduğunu inceliyorum — ağlar, modeller, yaşayan kod — ve buradaki her iddia doğrulanabilsin diye açıkça inşa ediyorum. Süregelen deney: makine öğrenmesini Rust tarafına çekmek; bellek güvenliği dilin kendisine aitken sarmalayıcıya ne gerek var.',
    'hero.cta1': 'Konsolu aç', 'hero.cta2': 'Tam CV', 'hero.cta3': 'Depolar',
    'hero.caption': 'Kafes üzerinde kendinden kaçınan yürüyüş — protein katlanmasının oyuncak modeli ve aynı zamanda sıradan bir çizge gezintisi. İki okuma da kasıtlı.',
    'hero.artalt': 'Yerel olmayan temasları işaretlenmiş, kafes üzerinde kendinden kaçınan bir yürüyüş',

    'm.repos': 'Açık depolar', 'm.certs': 'Sertifika',
    'm.langs': 'Konuşulan diller', 'm.locales': 'Bu sayfadaki dil',

    'focus.h2': 'Dört disiplin, tek araç seti',
    'focus.note': 'Güvenlik · Rust · ML · Biyo',
    'focus.lead': 'Hiçbiri tek başına durmaz. Güvenlik uygulanmış sistem düşüncesidir, makine öğrenmesi çekirdeğinde istatistik olan koddur, biyoloji ise basit olmayı reddeden açık veri kümesidir. Tek araç seti dördüne de hizmet eder: Python, Rust ve yalnız bana cevap veren bir Linux.',
    'focus.f1.k': 'Ağlar',
    'focus.f1.h': 'Siber güvenlik',
    'focus.f1.p': 'Ana makine keşfi, port taraması ve gecikme ölçümü kendi yazdığım araçlar olarak — kopya kağıdından değil — ağ ve bilişim güvenliği temellerinin sertifikalı eğitimiyle desteklenmiş. Linux, mekanikleri okunabildiği için güvendiğim ortam.',
    'focus.f1.w': 'Ağlar · Bilgi Güvenliği',
    'focus.f2.k': 'Sistemler',
    'focus.f2.h': 'Zanaat olarak Rust',
    'focus.f2.p': 'Sarmalayıcı yerine ownership, trait ve zero-copy tasarım. Python — üç yıllık CLI, veri hattı ve ayrıştırıcı işleri — saha aracı olarak kalıyor; hassas işlerin adresi Rust.',
    'focus.f2.w': 'Rust · Python',
    'focus.f3.k': 'Öğrenme',
    'focus.f3.h': 'Rust tarafına çekilen makine öğrenmesi',
    'focus.f3.p': 'Veri işi pandas ve NumPy ile, istatistik sertifikalı dersle, ve süregiden bir proje: ML iş yüklerini Rusta taşımak — performans ve bellek güvenliği dilin kendisinden gelsin diye.',
    'focus.f3.w': 'pandas · NumPy · Rust',
    'focus.f4.k': 'Okuma',
    'focus.f4.h': 'Masada hesaplamalı biyoloji',
    'focus.f4.p': 'Dizi hizalama, yapı ve popülasyonlar kalıcı bir yan ilgi. Biopython okuma için; sayfanın tepesindeki kafes onu ilginç kılan oyuncak model.',
    'focus.f4.w': 'Biyoenformatik',

    'rec.h2': 'Kayıt', 'rec.cv': 'Tam CV',
    'rec.when1': 'Yetenekler', 'rec.when2': 'Diller',
    'rec.r1.h': 'Tamamlanmış altı sertifika',
    'rec.r1.p': 'Veri analitiği, Python, sürüm kontrolü, ağ ve güvenlik temelleri. Tamamı aşağıda listeli, çünkü isimsiz bir sayı kanıt değildir.',
    'rec.r2.h': 'Altı dil, gerekli yerde belgeli',
    'rec.r2.p': 'Türkçe ve Azerce C2. Arapça B1 ve tırmanmaya devam, Çince HSK 2, Fransızca sürmekte. İngilizce bu sayfanın çalışma dili.',
    'rec.learning': 'sürüyor', 'rec.working': 'aktif',
    'rec.r3.h': 'Açık depolar',
    'rec.r3.p': 'Bu site dahil her şey GitHub’da. Az ama gerçek ve incelenebilir; burada olmasının tek sebebi de bu.',
    'rec.verify': 'Doğrulama bağlantıları bekleniyor', 'rec.verifysub': 'Bağlanana kadar bunlar birer iddiadır',

    'cap.h2': 'Gerçekten yapabildiklerim', 'cap.note': 'Kanıtı kadar iddia',
    'cap.c1': 'Kod', 'cap.c2': 'Makine öğrenmesi ve veri', 'cap.c3': 'Güvenlik ve sistemler',
    'cap.rust': 'Ana zanaat · ML araçları', 'cap.python': 'Saha aracı · 3 yıl',
    'cap.bash': 'Günlük kullanım',
    'cap.sql': 'Join, toplama', 'cap.web': 'Bu site, elle',
    'cap.pandas': 'Temizleme, toplama', 'cap.plots': 'Keşifsel grafikler',
    'cap.stats': 'Sertifikalı ders', 'cap.biopy': 'Dizi okuması',
    'cap.linux': 'Birincil ortam', 'cap.net': 'Sertifikalı temeller',
    'cap.infosec': 'Sertifikalı', 'cap.ps': 'Windows yönetimi',
    'cap.git': 'Dallar, PR akışı',
    'cap.foot': 'Hiçbir yerde “uzman” yazmıyor. Her etiket bunun yerine dayandığı kanıtı söylüyor; çünkü teknik bir okuru kaybetmenin en hızlı yolu, tek tıkla çürütülebilecek bir iddiadır.',

    'work.h2': 'Yayımlanan', 'work.all': 'Tüm depolar',
    'work.problem': 'Problem', 'work.approach': 'Yaklaşım', 'work.result': 'Sonuç',
    'work.source': 'Kaynak', 'work.shipped': 'Tamam', 'work.local': 'Yerel',
    'work.pending': 'Yayın bekliyor',
    'work.p1.kicker': 'Yayında · açık kaynak', 'work.p1.h': 'Bu site',
    'work.p1.problem': 'İşe alımcılar, ortaklar ve ajanslar aynı bilgileri farklı biçimde istiyor; hepsi elle senkron tutuluyor.',
    'work.p1.approach': 'Tek bir statik site; çerçeve yok, derleme adımı yok. Token tabanlı bir tasarım sistemi, aşağıdaki konsol için elle yazılmış bir yorumlayıcı, sağdan sola desteğiyle sekiz dil ve CV’yi doğrudan A4’e basan bir yazdırma stili.',
    'work.p1.result': '8,4 MB’tan sıkıştırılmış yaklaşık 70 KB’a, sıfır bağımlılık, her iki temada WCAG AA kontrastı ve her çizim bir modelin değil, depodaki bir betiğin ürünü.',
    'work.p1.alt': 'Hizalanmış iki dizi ve eşleşme şeridi',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Terminal ağ araç seti',
    'work.p2.problem': 'Bir ağı teşhis etmek dört ayrı aracı çalıştırıp çıktılarını gözle eşleştirmek demekti.',
    'work.p2.approach': 'Ana makine keşfi, port taraması ve gecikme ölçümünü asyncio üzerinde eşzamanlı yürütüp tek bir rapor basan tek bir Python komut satırı aracı. Yalnızca standart kütüphane.',
    'work.p2.result': 'Eşzamanlılık, seri bir alt ağ taramasını paralel hale getiriyor. Hızlanma oranı burada verilmiyor, çünkü kontrollü koşullarda ölçülmedi: sayı, kıyaslama geldiğinde gelir, öncesinde değil.',
    'work.p2.alt': 'Bir analiz penceresi işaretlenmiş periyodik sinyal',

    'term.h2': 'Konsol', 'term.note': 'Tab tamamlar · ↑↓ geçmişi getirir',
    'term.lead': 'Bu sayfadaki her şeye yazarak da ulaşılır. Yorumlayıcı, bağımlılıksız yaklaşık iki yüz satır JavaScript ve siteyi yeniden yapılandırabiliyor: theme light, lang tr veya help deneyin.',
    'term.hint': 'help yazın', 'term.output': 'Konsol çıktısı',
    'term.inlabel': 'Konsol komutu', 'term.placeholder': 'help',

    'contact.h2': 'İletişime geçin', 'contact.note': '24 saat içinde yanıt',
    'contact.lead': 'İşe alımcılar, güvenlik ekipleri, ML araçları geliştirenler ve kod ile yaşayanın kesiştiği yerde çalışan herkes — bana ulaşmanın en hızlı yolu bu.',
    'contact.email': 'E-posta', 'contact.name': 'Ad veya kurum',
    'contact.mail': 'E-posta', 'contact.msg': 'Mesaj', 'contact.send': 'Gönder',
    'contact.privacy': 'Tek bir gelen kutusuna gider. Liste yok, yönlendirme yok, bu sayfada izleme yok.',

    'foot.built': 'elle yazıldı, bağımlılıksız', 'foot.source': 'Kaynak', 'foot.top': 'Başa dön',

    'cfg.title': 'Site ayarları', 'cfg.close': 'Kapat',
    'cfg.theme': 'Tema', 'cfg.dark': 'Koyu', 'cfg.light': 'Açık', 'cfg.auto': 'Sistem',
    'cfg.motion': 'Hareket', 'cfg.full': 'Tam', 'cfg.reduced': 'Azaltılmış',
    'cfg.motionhint': 'Sistem ayarınız varsayılan olarak zaten geçerli; bu, onu iki yönde de geçersiz kılar.',
    'cfg.grid': 'Arka plan ızgarası', 'cfg.on': 'Açık', 'cfg.off': 'Kapalı',
    'cfg.language': 'Dil',
    'cfg.langhint': 'Arapça ve Farsça tüm sayfayı sağdan sola çevirir ve uygun bir yazı tipi yükler.',
    'cfg.reset': 'Sıfırla', 'cfg.resetbtn': 'Kayıtlı ayarları temizle',
    'cfg.resethint': 'Ayarlar yalnızca bu tarayıcıda kalır. Hiçbir şey gönderilmez.'
  };

  /* ---------------------------------------------------------------- AR -- */
  T.ar = {
    'a11y.skip': 'تخطَّ إلى المحتوى',
    'boot.skip': 'تخطٍّ · اضغط أي مفتاح',

    'nav.focus': 'التركيز', 'nav.record': 'السجل', 'nav.capability': 'القدرات',
    'nav.work': 'الأعمال', 'nav.console': 'الطرفية', 'nav.contact': 'التواصل',
    'nav.cv': 'السيرة الذاتية', 'nav.language': 'اللغة', 'nav.theme': 'المظهر',
    'nav.config': 'الإعدادات', 'nav.menu': 'القائمة',

    'hero.status': 'الأمن السيبراني · Rust · التعلّم الآلي · المعلوماتية الحيوية',
    'hero.h1a': 'مهاجمة الافتراضات،',
    'hero.h1b': 'حماية الأنظمة.',
    'hero.lead': 'مطوّر يعيش داخل الطرفية: بايثون أداة الميدان، وRust صنعة، وLinux أرضه. أدرس كيف تفشل الأنظمة — الشبكات والنماذج والشيفرة الحية — وأبني علنًا لتبقى كل ادّعاء هنا قابلًا للتحقق. التجربة الدائمة: سحب التعلّم الآلي نحو Rust، حيث تكون سلامة الذاكرة من جوهر اللغة لا من غلاف فوقه.',
    'hero.cta1': 'افتح الطرفية', 'hero.cta2': 'السيرة الكاملة', 'hero.cta3': 'المستودعات',
    'hero.caption': 'مسار متجنِّب لذاته على شبكة — النموذج المبسّط لطيّ البروتين، وفي الوقت نفسه اجتياز عادي لمخطط. القراءتان مقصودتان.',
    'hero.artalt': 'مسار متجنِّب لذاته على شبكة مع تعليم التماسّات غير المحلية',

    'm.repos': 'مستودعات عامة', 'm.certs': 'شهادات مهنية',
    'm.langs': 'لغات منطوقة', 'm.locales': 'لغات هذه الصفحة',

    'focus.h2': 'أربعة تخصصات، جهاز واحد',
    'focus.note': 'أمن · Rust · تعلّم آلي · حيوي',
    'focus.lead': 'لا يقوم واحد من هذه التخصصات وحده. الأمن هو التفكير المنظومي المطبَّق، والتعلّم الآلي شيفرة تُحكَم منها الإحصاء في القلب، والبيولوجيا مجموعة البيانات المفتوحة التي ترفض أن تكون بسيطة. جهاز واحد يخدم الأربعة: بايثون وRust وLinux لا يُجيب إلا عندي.',
    'focus.f1.k': 'الشبكات',
    'focus.f1.h': 'الأمن السيبراني',
    'focus.f1.p': 'اكتشاف المضيفين وفحص المنافذ وقياس زمن الاستجابة كأدوات أكتبها بنفسي لا تنسخ من ورقة الغش، مع أساسيات معتمدة في الشبكات وأمن المعلومات. Linux النظام الذي أثق به لأن ميكانيكاها قابلة للقراءة.',
    'focus.f1.w': 'الشبكات · أمن المعلومات',
    'focus.f2.k': 'الأنظمة',
    'focus.f2.h': 'Rust صنعة',
    'focus.f2.p': 'الملكية (ownership) والسمات (traits) والتصميم ذو النسخ الصفري بدل الأغلفة. بايثون — ثلاث سنوات من أدوات الأوامر وخطوط البيانات والمفسّرات — تبقى أداة الميدان؛ وRust موضع العمل الدقيق.',
    'focus.f2.w': 'Rust · بايثون',
    'focus.f3.k': 'التعلّم',
    'focus.f3.h': 'التعلّم الآلي، مسحوبًا نحو Rust',
    'focus.f3.p': 'عمل البيانات في pandas وNumPy، والإحصاء مقرّرًا معتمدًا، ومشروع دائم: نقل أحمال التعلّم الآلي إلى Rust لتأتي الأداء وسلامة الذاكرة من اللغة نفسها.',
    'focus.f3.w': 'pandas · NumPy · Rust',
    'focus.f4.k': 'قراءة',
    'focus.f4.h': 'البيولوجيا الحاسوبية على الطاولة',
    'focus.f4.p': 'محاذاة التسلسلات والبنى والتجمعات السكانية اهتمام جانبي دائم. Biopython للقراءة؛ والشبكة في أعلى هذه الصفحة هي النموذج المبسّط الذي يبقيها مثيرة.',
    'focus.f4.w': 'المعلوماتية الحيوية',

    'rec.h2': 'السجل', 'rec.cv': 'السيرة الكاملة',
    'rec.when1': 'مهارات', 'rec.when2': 'لغات',
    'rec.r1.h': 'ست شهادات مكتملة',
    'rec.r1.p': 'تحليل البيانات، وبايثون، وإدارة الإصدارات، وأساسيات الشبكات والأمن. مذكورة كاملة أدناه، لأن رقمًا بلا أسماء ليس دليلًا.',
    'rec.r2.h': 'ست لغات، موثَّقة حيث يهم',
    'rec.r2.p': 'التركية والأذرعية عند C2. العربية عند B1 وما زالت تتصاعد، والصينية عند HSK 2، والفرنسية قيد العمل. الإنجليزية لغة العمل في هذه الصفحة.',
    'rec.learning': 'قيد التعلم', 'rec.working': 'عملية',
    'rec.r3.h': 'مستودعات عامة',
    'rec.r3.p': 'كل شيء على GitHub، بما فيه هذا الموقع. قليل، لكنه حقيقي وقابل للفحص، وهذا وحده سبب وجوده هنا.',
    'rec.verify': 'روابط التحقق قيد الإعداد', 'rec.verifysub': 'إلى أن تُربَط، تبقى هذه ادّعاءات',

    'cap.h2': 'ما أستطيع فعله فعلًا', 'cap.note': 'ادّعاءات بحجم أدلّتها',
    'cap.c1': 'الشيفرة', 'cap.c2': 'التعلّم الآلي والبيانات', 'cap.c3': 'الأمن والأنظمة',
    'cap.rust': 'الصنعة الأساسية · أدوات تعلّم آلي', 'cap.python': 'أداة الميدان · 3 سنوات',
    'cap.bash': 'استخدام يومي',
    'cap.sql': 'ربط وتجميع', 'cap.web': 'هذا الموقع، يدويًا',
    'cap.pandas': 'تنظيف وتجميع', 'cap.plots': 'رسوم استكشافية',
    'cap.stats': 'مقرر موثَّق', 'cap.biopy': 'قراءة التسلسلات',
    'cap.linux': 'البيئة الأساسية', 'cap.net': 'أساسيات موثَّقة',
    'cap.infosec': 'معتمدة', 'cap.ps': 'إدارة ويندوز',
    'cap.git': 'فروع وسير عمل PR',
    'cap.foot': 'لا ترد كلمة «خبير» في أي موضع. كل وصف يذكر دليله بدلًا من ذلك، لأن أسرع طريقة لفقدان قارئ تقني هي ادّعاء يمكن دحضه بنقرة واحدة.',

    'work.h2': 'منجَز', 'work.all': 'كل المستودعات',
    'work.problem': 'المشكلة', 'work.approach': 'المعالجة', 'work.result': 'النتيجة',
    'work.source': 'الشيفرة', 'work.shipped': 'منجَز', 'work.local': 'محلي',
    'work.pending': 'بانتظار النشر',
    'work.p1.kicker': 'مباشر · مفتوح المصدر', 'work.p1.h': 'هذا الموقع',
    'work.p1.problem': 'مسؤولو التوظيف والمتعاونون والوكالات يحتاجون الحقائق نفسها بصيغ مختلفة، وكلها تُحدَّث يدويًا.',
    'work.p1.approach': 'موقع ثابت واحد، بلا إطار عمل وبلا خطوة بناء. نظام تصميم قائم على الرموز، ومفسّر مكتوب يدويًا للطرفية أدناه، وثماني لغات مع دعم الكتابة من اليمين إلى اليسار، وورقة أنماط طباعة تُخرج السيرة الذاتية مباشرة بمقاس A4.',
    'work.p1.result': 'من 8٫4 ميغابايت إلى نحو 70 كيلوبايت بعد الضغط، بلا أي اعتماديات، وتباين يفي بمعيار WCAG AA في المظهرين، وكل رسم يولّده سكربت في المستودع لا نموذج ذكاء اصطناعي.',
    'work.p1.alt': 'تسلسلان متحاذيان مع شريط التطابق بينهما',
    'work.p2.kicker': 'بايثون · سطر أوامر', 'work.p2.h': 'عدّة شبكات للطرفية',
    'work.p2.problem': 'تشخيص الشبكة كان يعني تشغيل أربع أدوات ومطابقة مخرجاتها بالعين.',
    'work.p2.approach': 'أداة بايثون واحدة تعمل من سطر الأوامر، تُجري اكتشاف المضيفين وفحص المنافذ وقياس زمن الاستجابة على التوازي عبر asyncio ثم تطبع تقريرًا واحدًا. المكتبة القياسية فقط.',
    'work.p2.result': 'التوازي يحوّل مسح الشبكة الفرعية من تسلسلي إلى متزامن. لم يُذكر مقدار التسريع هنا لأنه لم يُقَس في ظروف مضبوطة — الرقم يأتي مع القياس المرجعي، لا قبله.',
    'work.p2.alt': 'إشارة دورية مع نافذة تحليل واحدة معلَّمة',

    'term.h2': 'الطرفية', 'term.note': 'Tab يُكمل · ↑↓ يستعيد',
    'term.lead': 'كل ما في هذه الصفحة يمكن بلوغه بالكتابة أيضًا. المفسّر نحو مئتَي سطر من جافاسكربت بلا اعتماديات، ويستطيع إعادة ضبط الموقع — جرّب theme light أو lang ar أو help.',
    'term.hint': 'اكتب help', 'term.output': 'مخرجات الطرفية',
    'term.inlabel': 'أمر الطرفية', 'term.placeholder': 'help',

    'contact.h2': 'تواصل معي', 'contact.note': 'الرد خلال 24 ساعة',
    'contact.lead': 'مسؤولو التوظيف، وفرق الأمن، ومن يبني أدوات للتعلّم الآلي، وكل من يعمل حيث تلتقي الشيفرة بالأنظمة الحية — هذا أسرع طريق إليّ.',
    'contact.email': 'البريد', 'contact.name': 'الاسم أو المؤسسة',
    'contact.mail': 'البريد الإلكتروني', 'contact.msg': 'الرسالة', 'contact.send': 'إرسال',
    'contact.privacy': 'تصل إلى صندوق واحد. لا قائمة بريدية، ولا إعادة توجيه، ولا تتبّع في هذه الصفحة.',

    'foot.built': 'مكتوب يدويًا، بلا اعتماديات', 'foot.source': 'الشيفرة', 'foot.top': 'إلى الأعلى',

    'cfg.title': 'إعدادات الموقع', 'cfg.close': 'إغلاق',
    'cfg.theme': 'المظهر', 'cfg.dark': 'داكن', 'cfg.light': 'فاتح', 'cfg.auto': 'النظام',
    'cfg.motion': 'الحركة', 'cfg.full': 'كاملة', 'cfg.reduced': 'مخفَّضة',
    'cfg.motionhint': 'إعداد نظامك له الأولوية افتراضيًا؛ وهذا يتجاوزه في الاتجاهين.',
    'cfg.grid': 'شبكة الخلفية', 'cfg.on': 'تشغيل', 'cfg.off': 'إيقاف',
    'cfg.language': 'اللغة',
    'cfg.langhint': 'العربية والفارسية تحوّلان الصفحة كاملة إلى الاتجاه من اليمين إلى اليسار وتُحمّلان خطًّا مناسبًا.',
    'cfg.reset': 'إعادة ضبط', 'cfg.resetbtn': 'مسح الإعدادات المحفوظة',
    'cfg.resethint': 'تبقى الإعدادات في هذا المتصفح وحده. لا يُرسَل أي شيء.'
  };

  /* ---------------------------------------------------------------- FA -- */
  T.fa = {
    'a11y.skip': 'پرش به محتوا',
    'boot.skip': 'رد کردن · هر کلیدی را بزنید',

    'nav.focus': 'تمرکز', 'nav.record': 'کارنامه', 'nav.capability': 'توانایی‌ها',
    'nav.work': 'کارها', 'nav.console': 'کنسول', 'nav.contact': 'تماس',
    'nav.cv': 'رزومه', 'nav.language': 'زبان', 'nav.theme': 'پوسته',
    'nav.config': 'تنظیمات', 'nav.menu': 'منو',

    'hero.status': 'امنیت سایبری · راست · یادگیری ماشین · بیوانفورماتیک',
    'hero.h1a': 'زیر سؤال بردن پیش‌فرض‌ها،',
    'hero.h1b': 'دفاع از سامانه‌ها.',
    'hero.lead': 'توسعه‌دهنده‌ای که در ترمینال زندگی می‌کند: پایتون ابزار میدانی، راست صنعتگر، لینوکس خانه. مطالعه می‌کنم سامانه‌ها چگونه می‌شکنند — شبکه‌ها، مدل‌ها، کد زنده — و در کدباز می‌سازم تا هر ادعای اینجا قابل راستی‌آزمایی بماند. آزمایش جاری: کشاندن یادگیری ماشین به سمت راست، آنجا که امنیت حافظه مالِ خودِ زبان است، نه پوسته‌ای بر روی آن.',
    'hero.cta1': 'باز کردن کنسول', 'hero.cta2': 'رزومهٔ کامل', 'hero.cta3': 'مخزن‌ها',
    'hero.caption': 'گشت خودپرهیز روی یک شبکه — ساده‌ترین مدل تاخوردگی پروتئین، و در عین حال یک پیمایش گراف معمولی. هر دو خوانش عمدی‌اند.',
    'hero.artalt': 'یک گشت خودپرهیز روی شبکه با تماس‌های غیرمحلی نشانه‌گذاری‌شده',

    'm.repos': 'مخزن‌های عمومی', 'm.certs': 'گواهی‌نامه',
    'm.langs': 'زبان‌های گفتاری', 'm.locales': 'زبان در این صفحه',

    'focus.h2': 'چهار رشته، یک جعبه‌ابزار',
    'focus.note': 'امنیت · راست · یادگیری ماشین · زیست',
    'focus.lead': 'هیچ‌یک تنها نمی‌ایستد. امنیت، تفکر سامانه‌ای در مقیاس عمل است؛ یادگیری ماشین، کدی است که آمار در هسته‌اش می‌نشیند؛ و زیست‌شناسی، مجموعه‌دادهٔ بازی است که ساده بودن را نمی‌پذیرد. یک جعبه‌ابزار به هر چهار خدمت می‌کند: پایتون، راست، و لینوکسی که تنها به من پاسخ می‌دهد.',
    'focus.f1.k': 'شبکه‌ها',
    'focus.f1.h': 'امنیت سایبری',
    'focus.f1.p': 'کشف میزبان، پویش پورت و سنجش تأخیر به‌عنوان ابزارهایی که خودم نوشته‌ام نه کپی از برگهٔ تقلب، در کنار مبانی معتبرشدهٔ شبکه و امنیت اطلاعات. لینوکس محیطی است که به آن اطمینان دارم، چون سازوکارهایش خواندنی است.',
    'focus.f1.w': 'شبکه · امنیت اطلاعات',
    'focus.f2.k': 'سامانه‌ها',
    'focus.f2.h': 'راست، به‌عنوان صنعت',
    'focus.f2.p': 'مالکیت (ownership)، صفات (traits) و طراحی بدون کپی اضافی به‌جای پوسته‌ها. پایتون — سه سال ابزارهای خط فرمان، خطوط داده و تحلیل‌گرها — ابزار میدان می‌ماند؛ کارِ دقیق در راست انجام می‌شود.',
    'focus.f2.w': 'راست · پایتون',
    'focus.f3.k': 'یادگیری',
    'focus.f3.h': 'یادگیری ماشین، کشیده‌شده به سمت راست',
    'focus.f3.p': 'کار داده با pandas و NumPy، آمار به‌صورت درس معتبرشده، و یک پروژهٔ دائمی: بردن بارهای یادگیری ماشین به راست، تا عملکرد و امنیت حافظه از خود زبان بیاید.',
    'focus.f3.w': 'pandas · NumPy · راست',
    'focus.f4.k': 'خواندن',
    'focus.f4.h': 'بیولوژی محاسباتی روی میز',
    'focus.f4.p': 'هم‌ترازی توالی، ساختار و جمعیت‌ها به‌عنوان یک علاقهٔ جانبی همیشگی. Biopython برای خواندن؛ و شبکهٔ بالای همین صفحه همان مدل ساده‌ای است که این را جالب نگه می‌دارد.',
    'focus.f4.w': 'بیوانفورماتیک',

    'rec.h2': 'کارنامه', 'rec.cv': 'رزومهٔ کامل',
    'rec.when1': 'مهارت‌ها', 'rec.when2': 'زبان‌ها',
    'rec.r1.h': 'شش گواهی‌نامهٔ تکمیل‌شده',
    'rec.r1.p': 'تحلیل داده، پایتون، کنترل نسخه، شبکه و مبانی امنیت. فهرست کامل در پایین آمده، چون عددی بدون نام مدرک نیست.',
    'rec.r2.h': 'شش زبان، جایی که مهم است گواهی‌شده',
    'rec.r2.p': 'ترکی و آذربایجانی در C2. عربی در B1 و هنوز در حال صعود، چینی در HSK 2، فرانسوی در جریان. انگلیسی زبان کاری این صفحه است.',
    'rec.learning': 'در جریان', 'rec.working': 'فعال',
    'rec.r3.h': 'مخزن‌های عمومی',
    'rec.r3.p': 'همه‌چیز روی GitHub است، از جمله همین سایت. کم است، اما واقعی و قابل بررسی — و دلیل بودنش اینجا دقیقاً همین است.',
    'rec.verify': 'پیوندهای راستی‌آزمایی در راه است', 'rec.verifysub': 'تا وقتی پیوند نخورده‌اند، اینها ادعا هستند',

    'cap.h2': 'آنچه واقعاً از پس آن برمی‌آیم', 'cap.note': 'ادعاها به اندازهٔ مدرکشان',
    'cap.c1': 'کد', 'cap.c2': 'یادگیری ماشین و داده', 'cap.c3': 'امنیت و سامانه‌ها',
    'cap.rust': 'صنعت اصلی · ابزارهای یادگیری ماشین', 'cap.python': 'ابزار میدانی · ۳ سال',
    'cap.bash': 'استفادهٔ روزانه',
    'cap.sql': 'اتصال، تجمیع', 'cap.web': 'همین سایت، دستی',
    'cap.pandas': 'پاک‌سازی، تجمیع', 'cap.plots': 'نمودارهای اکتشافی',
    'cap.stats': 'درس گواهی‌شده', 'cap.biopy': 'خواندن توالی',
    'cap.linux': 'محیط اصلی', 'cap.net': 'مبانی گواهی‌شده',
    'cap.infosec': 'گواهی‌شده', 'cap.ps': 'مدیریت ویندوز',
    'cap.git': 'شاخه‌ها، گردش‌کار PR',
    'cap.foot': 'هیچ‌جا کلمهٔ «متخصص» نیامده. هر برچسب به‌جای آن مدرکش را نام می‌برد، چون سریع‌ترین راه از دست دادن خوانندهٔ فنی، ادعایی است که با یک کلیک رد می‌شود.',

    'work.h2': 'تحویل‌شده', 'work.all': 'همهٔ مخزن‌ها',
    'work.problem': 'مسئله', 'work.approach': 'رویکرد', 'work.result': 'نتیجه',
    'work.source': 'کد', 'work.shipped': 'تحویل‌شده', 'work.local': 'محلی',
    'work.pending': 'در انتظار انتشار',
    'work.p1.kicker': 'آنلاین · متن‌باز', 'work.p1.h': 'همین سایت',
    'work.p1.problem': 'استخدام‌کننده‌ها، همکاران و آژانس‌ها همان واقعیت‌ها را در قالبی متفاوت می‌خواهند — و همگی دستی هماهنگ نگه داشته می‌شوند.',
    'work.p1.approach': 'یک سایت ایستا، بدون فریم‌ورک و بدون مرحلهٔ ساخت. یک سامانهٔ طراحی مبتنی بر توکن، یک مفسر دست‌نویس برای کنسول پایین، هشت زبان با پشتیبانی راست‌به‌چپ، و یک شیوه‌نامهٔ چاپ که رزومه را مستقیم روی A4 می‌برد.',
    'work.p1.result': 'از ۸٫۴ مگابایت به حدود ۷۰ کیلوبایت فشرده، بدون هیچ وابستگی، کنتراست WCAG AA در هر دو پوسته، و هر تصویر ساختهٔ اسکریپتی در همین مخزن است، نه یک مدل.',
    'work.p1.alt': 'دو توالی هم‌ترازشده به همراه نوار تطابقشان',
    'work.p2.kicker': 'پایتون · خط فرمان', 'work.p2.h': 'جعبه‌ابزار شبکه در ترمینال',
    'work.p2.problem': 'عیب‌یابی شبکه یعنی اجرای چهار ابزار جدا و تطبیق چشمی خروجی‌هایشان.',
    'work.p2.approach': 'یک ابزار خط فرمان پایتون که کشف میزبان، پویش پورت و سنجش تأخیر را هم‌زمان روی asyncio اجرا می‌کند و یک گزارش واحد چاپ می‌کند. فقط کتابخانهٔ استاندارد.',
    'work.p2.result': 'هم‌زمانی، پویش سریالی یک زیرشبکه را موازی می‌کند. ضریب شتاب اینجا ذکر نشده چون در شرایط کنترل‌شده اندازه‌گیری نشده است — عدد وقتی می‌آید که سنجه بیاید، نه پیش از آن.',
    'work.p2.alt': 'یک سیگنال تناوبی با یک پنجرهٔ تحلیل نشانه‌گذاری‌شده',

    'term.h2': 'کنسول', 'term.note': 'Tab تکمیل می‌کند · ↑↓ تاریخچه',
    'term.lead': 'هر چیزی در این صفحه با تایپ کردن هم در دسترس است. مفسر حدود دویست خط جاوااسکریپت بدون وابستگی است و می‌تواند سایت را پیکربندی کند — theme light یا lang fa یا help را امتحان کنید.',
    'term.hint': 'help را بزنید', 'term.output': 'خروجی کنسول',
    'term.inlabel': 'فرمان کنسول', 'term.placeholder': 'help',

    'contact.h2': 'تماس بگیرید', 'contact.note': 'پاسخ ظرف ۲۴ ساعت',
    'contact.lead': 'استخدام‌کننده‌ها، تیم‌های امنیت، کسانی که ابزار یادگیری ماشین می‌سازند، و هر کسی که در مرز کد و سامانه‌های زنده کار می‌کند — این کوتاه‌ترین راه به من است.',
    'contact.email': 'ایمیل', 'contact.name': 'نام یا نهاد',
    'contact.mail': 'ایمیل', 'contact.msg': 'پیام', 'contact.send': 'ارسال',
    'contact.privacy': 'به یک صندوق می‌رسد. بدون فهرست پستی، بدون بازارسال، بدون ردیابی در این صفحه.',

    'foot.built': 'دست‌نویس، بدون وابستگی', 'foot.source': 'کد', 'foot.top': 'بالا',

    'cfg.title': 'تنظیمات سایت', 'cfg.close': 'بستن',
    'cfg.theme': 'پوسته', 'cfg.dark': 'تیره', 'cfg.light': 'روشن', 'cfg.auto': 'سیستم',
    'cfg.motion': 'حرکت', 'cfg.full': 'کامل', 'cfg.reduced': 'کاهش‌یافته',
    'cfg.motionhint': 'تنظیم سیستم شما به‌طور پیش‌فرض مقدم است؛ این گزینه آن را در هر دو جهت بازنویسی می‌کند.',
    'cfg.grid': 'شبکهٔ پس‌زمینه', 'cfg.on': 'روشن', 'cfg.off': 'خاموش',
    'cfg.language': 'زبان',
    'cfg.langhint': 'عربی و فارسی کل صفحه را راست‌به‌چپ می‌کنند و قلمی متناسب با خط بارگذاری می‌شود.',
    'cfg.reset': 'بازنشانی', 'cfg.resetbtn': 'پاک کردن تنظیمات ذخیره‌شده',
    'cfg.resethint': 'تنظیمات فقط در همین مرورگر می‌مانند. چیزی ارسال نمی‌شود.'
  };

  /* ======================================================================
     RUNTIME
     ====================================================================== */

  var doc = document;
  var root = doc.documentElement;
  var en = null;            // filled on first apply, from the markup itself
  var current = 'en';
  var arabicFontLoaded = false;

  function nodes() {
    return doc.querySelectorAll('[data-i18n], [data-i18n-attr]');
  }

  /* Snapshot the English source out of the DOM. Runs exactly once, before
     anything has been replaced, which is why apply() must never be called
     before this. */
  function snapshot() {
    en = {};
    Array.prototype.forEach.call(nodes(), function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) en[key] = el.innerHTML;
      var pair = el.getAttribute('data-i18n-attr');
      if (pair) {
        var bits = pair.split(':');
        en['@' + bits[0] + '|' + bits[1]] = el.getAttribute(bits[0]) || '';
      }
    });
  }

  /* Arabic script has no coverage in Space Grotesk, Inter or JetBrains
     Mono. Nobody who never selects ar/fa should download a font for it. */
  function loadArabicFont() {
    if (arabicFontLoaded) return;
    arabicFontLoaded = true;
    var link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;700&display=swap';
    doc.head.appendChild(link);
  }

  function meta(code) {
    for (var i = 0; i < LOCALES.length; i++) if (LOCALES[i].code === code) return LOCALES[i];
    return LOCALES[0];
  }

  function apply(code, persist) {
    if (!en) snapshot();
    var info = meta(code);
    var table = code === 'en' ? en : (T[code] || en);

    Array.prototype.forEach.call(nodes(), function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) {
        var text = table[key];
        if (text === undefined) text = en[key];          // fall back, never blank
        if (text !== undefined) el.innerHTML = text;
      }
      var pair = el.getAttribute('data-i18n-attr');
      if (pair) {
        var bits = pair.split(':');
        var val = table[bits[1]];
        if (val === undefined) val = en['@' + bits[0] + '|' + bits[1]];
        if (val !== undefined) el.setAttribute(bits[0], val);
      }
    });

    root.setAttribute('lang', code);
    root.setAttribute('dir', info.dir);
    if (info.dir === 'rtl') loadArabicFont();
    current = code;

    /* Only an explicit choice is stored. The startup call passes persist
       false, so simply loading the page never invents a saved preference. */
    if (persist !== false) {
      try { localStorage.setItem('lang', code); } catch (e) { /* private mode */ }
    }
    doc.dispatchEvent(new CustomEvent('i18n:change', { detail: info }));
  }

  global.i18n = {
    locales: LOCALES,
    meta: meta,
    apply: apply,
    has: function (code) { return code === 'en' || Object.prototype.hasOwnProperty.call(T, code); },
    get current() { return current; },
    /* Look one key up in the active locale — the console needs this for
       the handful of strings it prints that are not in the DOM. */
    t: function (key, fallback) {
      var table = current === 'en' ? (en || {}) : (T[current] || {});
      return table[key] || (en && en[key]) || fallback || key;
    }
  };
})(window);
