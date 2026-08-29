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

   · Translations keep proper nouns intact: TestAS, Studienkolleg,
     Informatik, IELTS, anabin, asyncio, and every product name stay as
     they are, because that is how they appear on the documents.
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

    'nav.trajectory': 'Weg', 'nav.record': 'Nachweise', 'nav.capability': 'Können',
    'nav.work': 'Arbeit', 'nav.console': 'Konsole', 'nav.contact': 'Kontakt',
    'nav.cv': 'Lebenslauf', 'nav.language': 'Sprache', 'nav.theme': 'Farbschema',
    'nav.config': 'Einstellungen', 'nav.menu': 'Menü',

    'hero.status': 'Bewerbung — Informatik, Deutschland, WS 2027',
    'hero.h1a': 'Informatik, gerichtet auf',
    'hero.h1b': 'lebende Systeme.',
    'hero.lead': 'Ein naturwissenschaftliches Abschlusszeugnis am oberen Ende der Skala, dann der harte Wechsel in die Systemprogrammierung. Zuerst Deutschland, weil man sich dort die Mathematik erarbeiten muss. Danach die Schweiz, weil dort Informatik und Biologie tatsächlich zusammenarbeiten.',
    'hero.cta1': 'Konsole öffnen', 'hero.cta2': 'Vollständiger Lebenslauf', 'hero.cta3': 'Repositorien',
    'hero.caption': 'Selbstvermeidender Weg auf einem Gitter — das einfachste Modell der Proteinfaltung und zugleich eine gewöhnliche Graphtraversierung. Genau darum geht es.',
    'hero.artalt': 'Ein selbstvermeidender Weg auf einem Gitter mit markierten nichtlokalen Kontakten',

    'm.diploma': 'Abiturdurchschnitt', 'm.german': 'Deutsche Skala, geschätzt',
    'm.de': 'Deutsch, GER', 'm.certs': 'Zertifikate', 'm.locales': 'Sprachen auf dieser Seite',

    'traj.h2': 'Vier Etappen, eine Richtung', 'traj.note': 'Etappe 02 von 04',
    'traj.lead': 'Informatik ist kein Umweg um das Naturwissenschaftszeugnis herum, sondern das Werkzeug dazu. Sequenzalignment, Strukturvorhersage und Populationsgenetik sind Algorithmenprobleme im Laborkittel. Deutschland lehrt die Algorithmen, die Schweiz betreibt die Labore.',
    'traj.s1.k': 'Abgeschlossen', 'traj.s1.h': 'Naturwissenschaften, Bestnote',
    'traj.s1.p': 'Abschluss in Experimentalwissenschaften: Mathematik, Physik, Chemie, Biologie. Durchschnitt 20,0/20,0 und ein belastbarer Grund, sich für lebende Systeme zu interessieren.',
    'traj.s1.w': '2026',
    'traj.s2.k': 'Aktuell', 'traj.s2.h': 'BSc Informatik',
    'traj.s2.p': 'Bewerbung an deutschen technischen Universitäten zum Wintersemester 2027, über TestAS und Studienkolleg, wo der Weg es verlangt. Deutsch auf B2, auf dem Weg zu C1.',
    'traj.s2.w': 'Deutschland · WS 2027',
    'traj.s3.k': 'Geplant', 'traj.s3.h': 'MSc Computational Biology',
    'traj.s3.p': 'Bioinformatik und Systembiologie an einer Schweizer Hochschule. Das Ziel ist ausdrücklich die algorithmische Seite: Sequenzanalyse, Struktur und die Statistik, die beides ehrlich hält.',
    'traj.s3.w': 'Schweiz',
    'traj.s4.k': 'Richtung', 'traj.s4.h': 'Biotechnologie, auf der Rechenseite',
    'traj.s4.p': 'Im Korridor Basel–Zürich teilen sich pharmazeutische Forschung und computergestützte Methoden längst dasselbe Gebäude. In diesem Raum möchte ich nützlich sein.',
    'traj.s4.w': 'Langfristig',
    'traj.caption': 'Die Balken sind keine Dekoration: jede Etappe kostet mehr als die vorige, und Etappe 02 trägt derzeit den gesamten Plan.',
    'traj.artalt': 'Vier Etappen auf einer Schiene, darunter ein ansteigendes Lastprofil',

    'rec.h2': 'Die Nachweise', 'rec.cv': 'Vollständiger Lebenslauf', 'rec.native': 'Muttersprache',
    'rec.r1.h': 'Abschluss in Experimentalwissenschaften, mit Auszeichnung',
    'rec.r1.p': 'Der höchste erreichbare Durchschnitt auf der iranischen Skala. Etwa 1,0 im deutschen System, vorbehaltlich der formalen Bewertung durch anabin / uni-assist — die Schätzung ist meine, die Umrechnung ihre.',
    'rec.r2.h': 'Sprachen, zertifiziert und in Arbeit',
    'rec.r2.p': 'Persisch als Muttersprache. Englisch auf C1–C2 laut IELTS Academic. Deutsch auf B2, auf dem Weg zu dem C1, das deutschsprachige Informatikstudiengänge voraussetzen.',
    'rec.r3.h': 'Sieben abgeschlossene Zertifikate',
    'rec.r3.p': 'Datenanalyse, Python, Versionskontrolle, Netzwerk- und Sicherheitsgrundlagen. Unten vollständig aufgeführt, denn eine Zahl ohne Namen ist kein Nachweis.',
    'rec.verify': 'Verifizierungslinks ausstehend', 'rec.verifysub': 'Bis sie verlinkt sind, sind das Behauptungen',
    'rec.r4.h': 'Öffentliche Repositorien',
    'rec.r4.p': 'Alles liegt auf GitHub, einschließlich dieser Seite und des Repositoriums zur Vorbereitung auf die Deutschprüfung. Wenig, aber echt und einsehbar — genau deshalb steht es hier.',

    'cap.h2': 'Was ich tatsächlich kann', 'cap.note': 'Aussagen so groß wie die Belege',
    'cap.c1': 'Sprachen', 'cap.c2': 'Daten', 'cap.c3': 'Systeme',
    'cap.python': 'Hauptsprache · 3 Jahre', 'cap.bash': 'Täglich im Einsatz',
    'cap.sql': 'Joins, Aggregation', 'cap.web': 'Diese Seite, von Hand',
    'cap.rust': 'Im Lernen · Ownership',
    'cap.pandas': 'Bereinigen, Aggregieren', 'cap.plots': 'Explorative Diagramme',
    'cap.stats': 'Zertifizierte Kursarbeit', 'cap.biopy': 'Gelesen, nicht ausgeliefert',
    'cap.linux': 'Hauptumgebung', 'cap.git': 'Branches, PR-Workflow',
    'cap.net': 'Zertifizierte Grundlagen', 'cap.ps': 'Windows-Administration',
    'cap.foot': 'Nirgends steht hier „Experte“. Jede Angabe nennt stattdessen ihren Beleg, denn der schnellste Weg, eine fachkundige Leserschaft zu verlieren, ist eine Behauptung, die sich mit einem Klick widerlegen lässt.',

    'work.h2': 'Ausgeliefert', 'work.all': 'Alle Repositorien',
    'work.problem': 'Problem', 'work.approach': 'Ansatz', 'work.result': 'Ergebnis',
    'work.source': 'Quellcode', 'work.shipped': 'Fertig', 'work.local': 'Lokal',
    'work.pending': 'Veröffentlichung ausstehend', 'work.concept': 'Konzept', 'work.progress': 'In Arbeit',
    'work.p1.kicker': 'Live · quelloffen', 'work.p1.h': 'Diese Seite',
    'work.p1.problem': 'Vier Hochschulbewerbungen, ein Stipendium und jede Person, die den Namen sucht, brauchen dieselben Fakten in unterschiedlicher Form — bisher von Hand synchron gehalten.',
    'work.p1.approach': 'Eine statische Seite, ohne Framework und ohne Build-Schritt. Ein tokenbasiertes Designsystem, ein selbst geschriebener Interpreter für die Konsole weiter unten, acht Sprachen samt Rechts-nach-links-Unterstützung und ein Druck-Stylesheet, das den Lebenslauf direkt auf A4 ausgibt.',
    'work.p1.result': 'Von 8,4 MB auf rund 70 KB gzip-komprimiert, keine Abhängigkeiten, WCAG-AA-Kontrast in beiden Farbschemata, und jede Zeichnung stammt aus einem Skript im Repositorium statt aus einem Modell.',
    'work.p1.alt': 'Zwei alignierte Sequenzen mit ihrer Übereinstimmungsspur',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Netzwerk-Toolkit fürs Terminal',
    'work.p2.problem': 'Eine Netzwerkdiagnose bedeutete vier Werkzeuge zu starten und ihre Ausgaben im Kopf zusammenzuführen.',
    'work.p2.approach': 'Ein einziges Python-Kommandozeilenwerkzeug, das Hosterkennung, Portscan und Latenzmessungen nebenläufig über asyncio ausführt und einen einzigen Bericht ausgibt. Nur Standardbibliothek.',
    'work.p2.result': 'Nebenläufigkeit macht aus einem seriellen Subnetz-Durchlauf einen parallelen. Der Faktor wird hier nicht genannt, weil er nicht unter kontrollierten Bedingungen gemessen wurde — die Zahl kommt hinzu, wenn der Benchmark da ist, vorher nicht.',
    'work.p2.alt': 'Ein periodisches Signal mit einem markierten Auswertungsfenster',
    'work.h2b': 'Offene Fragen', 'work.noteb': 'Nicht gebaut. Mit Absicht.',
    'work.leadb': 'Dafür ist das Studium da. Diese Punkte als Produkte auszugeben wäre gelogen; sie als Fragen zu führen ist die ehrliche Variante — und für eine akademische Leserschaft die interessantere.',
    'work.i1.h': 'Biosignale am Handkontakt',
    'work.i1.p': 'Wie viel lässt sich aus Photoplethysmographie an einer einzigen Handauflage wirklich zurückgewinnen, bevor das Rauschen gewinnt? Das ist Signalverarbeitung, und die Mathematik dafür fehlt mir noch.',
    'work.i2.h': 'Alignment im Kleinen',
    'work.i2.p': 'Needleman–Wunsch ist quadratisch, und jedes praktische Werkzeug trickst sich darum herum. Ich will den exakten Algorithmus erst selbst implementieren, langsam und schlecht, bevor ich den schnellen benutzen darf.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'Material zu Python und Informatik für Lernende, in deren Sprache es kaum welches gibt. Ich habe aus kostenlosen Quellen gelernt; das ist der Teil, den ich zurückgeben kann, bevor ich für irgendetwas anderes qualifiziert bin.',

    'term.h2': 'Konsole', 'term.note': 'Tab vervollständigt · ↑↓ ruft auf',
    'term.lead': 'Alles auf dieser Seite ist auch durch Tippen erreichbar. Der Interpreter umfasst rund zweihundert Zeilen JavaScript ohne Abhängigkeiten und kann die Seite umkonfigurieren — versuchen Sie theme light, lang de oder help.',
    'term.hint': 'help eingeben', 'term.output': 'Konsolenausgabe',
    'term.inlabel': 'Konsolenbefehl', 'term.placeholder': 'help',

    'contact.h2': 'Kontakt aufnehmen', 'contact.note': 'Antwort binnen 24 Stunden',
    'contact.lead': 'Stipendienkommissionen, Professorinnen und Professoren mit Hilfskraftstellen und alle, die an der Grenze zwischen Code und Biologie etwas bauen — das ist der schnellste Weg zu mir.',
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

    'nav.trajectory': 'Parcours', 'nav.record': 'Dossier', 'nav.capability': 'Compétences',
    'nav.work': 'Travaux', 'nav.console': 'Console', 'nav.contact': 'Contact',
    'nav.cv': 'CV', 'nav.language': 'Langue', 'nav.theme': 'Thème',
    'nav.config': 'Réglages', 'nav.menu': 'Menu',

    'hero.status': 'Candidature — Informatik, Allemagne, semestre d’hiver 2027',
    'hero.h1a': 'L’informatique, dirigée vers',
    'hero.h1b': 'le vivant.',
    'hero.lead': 'Un diplôme scientifique au sommet de son barème, puis un virage net vers la programmation système. L’Allemagne d’abord, parce que ses universités obligent à mériter les mathématiques. La Suisse ensuite, parce que c’est là que le calcul et la biologie travaillent réellement ensemble.',
    'hero.cta1': 'Ouvrir la console', 'hero.cta2': 'CV complet', 'hero.cta3': 'Dépôts',
    'hero.caption': 'Marche auto-évitante sur un réseau — le modèle jouet du repliement des protéines, et un simple parcours de graphe. Les deux lectures sont voulues.',
    'hero.artalt': 'Une marche auto-évitante sur un réseau, contacts non locaux marqués',

    'm.diploma': 'Moyenne au diplôme', 'm.german': 'Échelle allemande, estimée',
    'm.de': 'Allemand, CECR', 'm.certs': 'Certifications', 'm.locales': 'Langues sur cette page',

    'traj.h2': 'Quatre étapes, une direction', 'traj.note': 'Étape 02 sur 04',
    'traj.lead': 'L’informatique n’est pas un détour par rapport au diplôme scientifique : c’en est l’instrument. Alignement de séquences, prédiction de structure et génétique des populations sont des problèmes d’algorithmique en blouse blanche. L’Allemagne enseigne les algorithmes, la Suisse fait tourner les laboratoires.',
    'traj.s1.k': 'Terminé', 'traj.s1.h': 'Sciences, en haut du barème',
    'traj.s1.p': 'Diplôme en sciences expérimentales : mathématiques, physique, chimie, biologie. Moyenne de 20,0/20,0 et une raison solide de s’intéresser au vivant.',
    'traj.s1.w': '2026',
    'traj.s2.k': 'En cours', 'traj.s2.h': 'Licence en Informatik',
    'traj.s2.p': 'Candidature dans les universités techniques allemandes pour le semestre d’hiver 2027, via TestAS et Studienkolleg lorsque le parcours l’exige. Allemand en B2, en route vers le C1.',
    'traj.s2.w': 'Allemagne · SH 2027',
    'traj.s3.k': 'Prévu', 'traj.s3.h': 'Master en biologie computationnelle',
    'traj.s3.p': 'Bioinformatique et biologie des systèmes dans un établissement suisse. La cible est explicitement algorithmique : analyse de séquences, structure, et les statistiques qui gardent les deux honnêtes.',
    'traj.s3.w': 'Suisse',
    'traj.s4.k': 'Direction', 'traj.s4.h': 'Biotechnologie, côté calcul',
    'traj.s4.p': 'Dans le couloir Bâle–Zurich, la recherche pharmaceutique et les méthodes computationnelles partagent déjà le même bâtiment. C’est dans cette pièce que je veux être utile.',
    'traj.s4.w': 'Long terme',
    'traj.caption': 'Les barres ne sont pas décoratives : chaque étape coûte plus que la précédente, et l’étape 02 porte aujourd’hui tout le plan.',
    'traj.artalt': 'Quatre étapes sur un rail, avec un profil de charge croissant en dessous',

    'rec.h2': 'Le dossier', 'rec.cv': 'CV complet', 'rec.native': 'langue maternelle',
    'rec.r1.h': 'Diplôme en sciences expérimentales, mention la plus haute',
    'rec.r1.p': 'La moyenne maximale possible sur l’échelle iranienne. Environ 1,0 en équivalence allemande, sous réserve de l’évaluation formelle par anabin / uni-assist — l’estimation est la mienne, la conversion est la leur.',
    'rec.r2.h': 'Langues, certifiées et en cours',
    'rec.r2.p': 'Persan natif. Anglais en C1–C2 selon l’IELTS Academic. Allemand en B2, en travail vers le C1 que présupposent les cursus d’Informatik enseignés en allemand.',
    'rec.r3.h': 'Sept certifications obtenues',
    'rec.r3.p': 'Analyse de données, Python, gestion de versions, réseaux et bases de la sécurité. Toutes listées ci-dessous, car un chiffre sans noms n’est pas une preuve.',
    'rec.verify': 'Liens de vérification à venir', 'rec.verifysub': 'Tant qu’ils ne sont pas liés, ce sont des affirmations',
    'rec.r4.h': 'Dépôts publics',
    'rec.r4.p': 'Tout est sur GitHub, y compris ce site et le dépôt de préparation à l’examen d’allemand. Peu, mais réel et vérifiable — c’est précisément pour cela que c’est ici.',

    'cap.h2': 'Ce que je sais réellement faire', 'cap.note': 'Des affirmations à la taille des preuves',
    'cap.c1': 'Langages', 'cap.c2': 'Données', 'cap.c3': 'Systèmes',
    'cap.python': 'Principal · 3 ans', 'cap.bash': 'Usage quotidien',
    'cap.sql': 'Jointures, agrégation', 'cap.web': 'Ce site, à la main',
    'cap.rust': 'En apprentissage · ownership',
    'cap.pandas': 'Nettoyage, agrégation', 'cap.plots': 'Graphiques exploratoires',
    'cap.stats': 'Cursus certifié', 'cap.biopy': 'Lu, pas encore livré',
    'cap.linux': 'Environnement principal', 'cap.git': 'Branches, flux de PR',
    'cap.net': 'Bases certifiées', 'cap.ps': 'Administration Windows',
    'cap.foot': 'Le mot « expert » n’apparaît nulle part. Chaque intitulé nomme sa preuve, parce que le moyen le plus rapide de perdre un lecteur technique est une affirmation qu’il peut réfuter en un clic.',

    'work.h2': 'Livré', 'work.all': 'Tous les dépôts',
    'work.problem': 'Problème', 'work.approach': 'Approche', 'work.result': 'Résultat',
    'work.source': 'Code source', 'work.shipped': 'Livré', 'work.local': 'Local',
    'work.pending': 'Publication en attente', 'work.concept': 'Concept', 'work.progress': 'En cours',
    'work.p1.kicker': 'En ligne · open source', 'work.p1.h': 'Ce site',
    'work.p1.problem': 'Quatre candidatures universitaires, une bourse et toute personne qui cherche le nom réclament les mêmes faits sous une forme différente — tenus à jour à la main jusqu’ici.',
    'work.p1.approach': 'Un site statique, sans framework ni étape de build. Un système de design par tokens, un interpréteur écrit à la main pour la console ci-dessous, huit langues avec prise en charge de la droite-à-gauche, et une feuille de style d’impression qui produit le CV directement en A4.',
    'work.p1.result': 'De 8,4 Mo à environ 70 Ko compressés, zéro dépendance, contraste WCAG AA dans les deux thèmes, et chaque dessin produit par un script du dépôt plutôt que par un modèle.',
    'work.p1.alt': 'Deux séquences alignées et leur piste d’identité',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Boîte à outils réseau en terminal',
    'work.p2.problem': 'Diagnostiquer un réseau imposait de lancer quatre utilitaires et de corréler leurs sorties à l’œil.',
    'work.p2.approach': 'Un seul outil Python en ligne de commande qui exécute découverte d’hôtes, balayage de ports et mesures de latence en parallèle via asyncio, puis imprime un rapport unique. Bibliothèque standard uniquement.',
    'work.p2.result': 'La concurrence transforme un balayage de sous-réseau séquentiel en balayage parallèle. Le facteur d’accélération n’est pas cité ici parce qu’il n’a pas été mesuré dans des conditions contrôlées — le chiffre arrivera avec le banc d’essai, pas avant.',
    'work.p2.alt': 'Un signal périodique avec une fenêtre d’analyse marquée',
    'work.h2b': 'Questions ouvertes', 'work.noteb': 'Non construit. Volontairement.',
    'work.leadb': 'C’est à cela que sert le diplôme. Présenter ces points comme des produits serait mensonger ; les présenter comme des questions est la version honnête — et, pour un lecteur académique, la plus intéressante.',
    'work.i1.h': 'Biosignaux au contact de la paume',
    'work.i1.p': 'Que peut-on réellement extraire d’une photopléthysmographie à un seul point de contact avant que le bruit ne l’emporte ? C’est une question de traitement du signal, et je n’en ai pas encore les mathématiques.',
    'work.i2.h': 'L’alignement à petite échelle',
    'work.i2.p': 'Needleman–Wunsch est quadratique et tous les outils pratiques contournent le problème. Je veux d’abord implémenter l’algorithme exact, lentement et mal, avant d’avoir le droit d’utiliser le rapide.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'Du matériel de Python et d’informatique pour des apprenants dont la langue n’en compte presque aucun. J’ai appris avec des ressources gratuites ; c’est la part que je peux rendre avant d’être qualifié pour autre chose.',

    'term.h2': 'Console', 'term.note': 'Tab complète · ↑↓ rappelle',
    'term.lead': 'Tout sur cette page est aussi accessible au clavier. L’interpréteur fait environ deux cents lignes de JavaScript sans dépendances, et il peut reconfigurer le site — essayez theme light, lang fr ou help.',
    'term.hint': 'tapez help', 'term.output': 'Sortie de la console',
    'term.inlabel': 'Commande de console', 'term.placeholder': 'help',

    'contact.h2': 'Me contacter', 'contact.note': 'Réponse sous 24 heures',
    'contact.lead': 'Comités de bourses, enseignants-chercheurs cherchant un assistant, et toute personne qui construit quelque chose à la frontière du code et de la biologie — voici le chemin le plus court.',
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

    'nav.trajectory': 'Trayecto', 'nav.record': 'Expediente', 'nav.capability': 'Competencias',
    'nav.work': 'Trabajo', 'nav.console': 'Consola', 'nav.contact': 'Contacto',
    'nav.cv': 'CV', 'nav.language': 'Idioma', 'nav.theme': 'Tema',
    'nav.config': 'Ajustes', 'nav.menu': 'Menú',

    'hero.status': 'Candidatura — Informatik, Alemania, semestre de invierno 2027',
    'hero.h1a': 'Computación, apuntada a',
    'hero.h1b': 'los sistemas vivos.',
    'hero.lead': 'Un diploma de ciencias en lo más alto de su escala y luego un giro brusco hacia la programación de sistemas. Alemania primero, porque allí hay que ganarse las matemáticas. Suiza después, porque es donde la computación y la biología trabajan juntas de verdad.',
    'hero.cta1': 'Abrir la consola', 'hero.cta2': 'CV completo', 'hero.cta3': 'Repositorios',
    'hero.caption': 'Camino autoevitante sobre una red: el modelo de juguete del plegamiento de proteínas y, a la vez, un recorrido de grafo. Ambas lecturas son intencionadas.',
    'hero.artalt': 'Un camino autoevitante sobre una red con sus contactos no locales marcados',

    'm.diploma': 'Media del diploma', 'm.german': 'Escala alemana, estimada',
    'm.de': 'Alemán, MCER', 'm.certs': 'Certificaciones', 'm.locales': 'Idiomas en esta página',

    'traj.h2': 'Cuatro etapas, una dirección', 'traj.note': 'Etapa 02 de 04',
    'traj.lead': 'La informática no es un rodeo respecto al diploma de ciencias: es su instrumento. El alineamiento de secuencias, la predicción de estructuras y la genética de poblaciones son problemas algorítmicos con bata de laboratorio. Alemania enseña los algoritmos; Suiza opera los laboratorios.',
    'traj.s1.k': 'Completado', 'traj.s1.h': 'Ciencias, en lo alto de la escala',
    'traj.s1.p': 'Diploma en Ciencias Experimentales: matemáticas, física, química y biología. Una media de 20,0/20,0 y un motivo sólido para interesarse por los sistemas vivos.',
    'traj.s1.w': '2026',
    'traj.s2.k': 'Actual', 'traj.s2.h': 'Grado en Informatik',
    'traj.s2.p': 'Candidaturas a universidades técnicas alemanas para el semestre de invierno de 2027, vía TestAS y Studienkolleg cuando la vía lo exige. Alemán en B2, camino del C1.',
    'traj.s2.w': 'Alemania · SI 2027',
    'traj.s3.k': 'Previsto', 'traj.s3.h': 'Máster en biología computacional',
    'traj.s3.p': 'Bioinformática y biología de sistemas en una institución suiza. El objetivo es explícitamente el lado algorítmico: análisis de secuencias, estructura y la estadística que mantiene honestos a ambos.',
    'traj.s3.w': 'Suiza',
    'traj.s4.k': 'Dirección', 'traj.s4.h': 'Biotecnología, del lado del cómputo',
    'traj.s4.p': 'En el corredor Basilea–Zúrich, la investigación farmacéutica y los métodos computacionales ya comparten edificio. Esa es la sala en la que quiero ser útil.',
    'traj.s4.w': 'Largo plazo',
    'traj.caption': 'Las barras no son decoración: cada etapa cuesta más que la anterior, y la etapa 02 sostiene ahora mismo todo el plan.',
    'traj.artalt': 'Cuatro etapas sobre un raíl, con un perfil de carga creciente debajo',

    'rec.h2': 'El expediente', 'rec.cv': 'CV completo', 'rec.native': 'nativo',
    'rec.r1.h': 'Diploma en Ciencias Experimentales, máxima distinción',
    'rec.r1.p': 'La media máxima alcanzable en la escala iraní. Alrededor de 1,0 en términos alemanes, a la espera de la evaluación formal de anabin / uni-assist: la estimación es mía, la conversión es suya.',
    'rec.r2.h': 'Idiomas, certificados y en curso',
    'rec.r2.p': 'Persa nativo. Inglés en C1–C2 según IELTS Academic. Alemán en B2, trabajando hacia el C1 que dan por supuesto los grados de Informatik impartidos en alemán.',
    'rec.r3.h': 'Siete certificaciones completadas',
    'rec.r3.p': 'Analítica de datos, Python, control de versiones, redes y fundamentos de seguridad. Se enumeran abajo al completo, porque una cifra sin nombres no es una prueba.',
    'rec.verify': 'Enlaces de verificación pendientes', 'rec.verifysub': 'Mientras no se enlacen, son afirmaciones',
    'rec.r4.h': 'Repositorios públicos',
    'rec.r4.p': 'Todo está en GitHub, incluidos este sitio y el repositorio de preparación del examen de alemán. Poco, pero real e inspeccionable, que es justamente la razón de que esté aquí.',

    'cap.h2': 'Lo que sé hacer de verdad', 'cap.note': 'Afirmaciones del tamaño de su prueba',
    'cap.c1': 'Lenguajes', 'cap.c2': 'Datos', 'cap.c3': 'Sistemas',
    'cap.python': 'Principal · 3 años', 'cap.bash': 'Uso diario',
    'cap.sql': 'Joins, agregación', 'cap.web': 'Este sitio, a mano',
    'cap.rust': 'Aprendiendo · ownership',
    'cap.pandas': 'Limpieza, agregación', 'cap.plots': 'Gráficos exploratorios',
    'cap.stats': 'Curso certificado', 'cap.biopy': 'Leído, no publicado',
    'cap.linux': 'Entorno principal', 'cap.git': 'Ramas, flujo de PR',
    'cap.net': 'Fundamentos certificados', 'cap.ps': 'Administración de Windows',
    'cap.foot': 'En ninguna parte pone «experto». Cada etiqueta nombra su prueba, porque la forma más rápida de perder a un lector técnico es una afirmación que puede refutar con un clic.',

    'work.h2': 'Entregado', 'work.all': 'Todos los repositorios',
    'work.problem': 'Problema', 'work.approach': 'Enfoque', 'work.result': 'Resultado',
    'work.source': 'Código', 'work.shipped': 'Entregado', 'work.local': 'Local',
    'work.pending': 'Publicación pendiente', 'work.concept': 'Concepto', 'work.progress': 'En curso',
    'work.p1.kicker': 'En línea · código abierto', 'work.p1.h': 'Este sitio',
    'work.p1.problem': 'Cuatro solicitudes universitarias, una beca y cualquiera que busque el nombre necesitan los mismos datos con forma distinta, mantenidos sincronizados a mano.',
    'work.p1.approach': 'Un sitio estático, sin framework ni paso de compilación. Un sistema de diseño por tokens, un intérprete escrito a mano para la consola de abajo, ocho idiomas con soporte de derecha a izquierda y una hoja de estilo de impresión que genera el CV directamente en A4.',
    'work.p1.result': 'De 8,4 MB a unos 70 KB comprimidos, cero dependencias, contraste WCAG AA en ambos temas y cada dibujo generado por un script del repositorio en lugar de por un modelo.',
    'work.p1.alt': 'Dos secuencias alineadas con su pista de identidad',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Kit de red para terminal',
    'work.p2.problem': 'Diagnosticar una red obligaba a ejecutar cuatro utilidades y correlacionar sus salidas a ojo.',
    'work.p2.approach': 'Una única herramienta Python de línea de comandos que ejecuta descubrimiento de hosts, escaneo de puertos y medición de latencia de forma concurrente sobre asyncio y luego imprime un solo informe. Solo biblioteca estándar.',
    'work.p2.result': 'La concurrencia convierte un barrido de subred en serie en uno en paralelo. Aquí no se cita la mejora porque no se ha medido en condiciones controladas: la cifra llegará con el banco de pruebas, no antes.',
    'work.p2.alt': 'Una señal periódica con una ventana de análisis marcada',
    'work.h2b': 'Preguntas abiertas', 'work.noteb': 'Sin construir. A propósito.',
    'work.leadb': 'Para esto sirve la carrera. Presentar esto como productos sería mentira; presentarlo como preguntas es la versión honesta y, para un lector académico, la más interesante.',
    'work.i1.h': 'Bioseñales por contacto de la palma',
    'work.i1.p': '¿Cuánto se puede recuperar realmente de una fotopletismografía en un único punto de contacto antes de que gane el ruido de fondo? Es una pregunta de procesamiento de señales, y todavía no tengo las matemáticas.',
    'work.i2.h': 'Alineamiento a pequeña escala',
    'work.i2.p': 'Needleman–Wunsch es cuadrático y toda herramienta práctica lo esquiva. Quiero implementar primero el algoritmo exacto, lento y mal, antes de tener permiso para usar el rápido.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'Material de Python e informática para quienes casi no lo tienen en su idioma. Aprendí con recursos gratuitos; es la parte que puedo devolver antes de estar cualificado para cualquier otra cosa.',

    'term.h2': 'Consola', 'term.note': 'Tab completa · ↑↓ recupera',
    'term.lead': 'Todo lo de esta página también se alcanza escribiendo. El intérprete son unas doscientas líneas de JavaScript sin dependencias y puede reconfigurar el sitio: pruebe theme light, lang es o help.',
    'term.hint': 'escriba help', 'term.output': 'Salida de la consola',
    'term.inlabel': 'Comando de consola', 'term.placeholder': 'help',

    'contact.h2': 'Ponerse en contacto', 'contact.note': 'Respuesta en 24 horas',
    'contact.lead': 'Comités de becas, profesorado con trabajo de asistencia a la investigación y quien esté construyendo algo en la frontera entre el código y la biología: esta es la vía más rápida.',
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

    'nav.trajectory': 'Путь', 'nav.record': 'Документы', 'nav.capability': 'Навыки',
    'nav.work': 'Работы', 'nav.console': 'Консоль', 'nav.contact': 'Контакты',
    'nav.cv': 'Резюме', 'nav.language': 'Язык', 'nav.theme': 'Тема',
    'nav.config': 'Настройки', 'nav.menu': 'Меню',

    'hero.status': 'Подача документов — Informatik, Германия, зимний семестр 2027',
    'hero.h1a': 'Вычисления, направленные на',
    'hero.h1b': 'живые системы.',
    'hero.lead': 'Естественнонаучный диплом на верхней границе шкалы, затем резкий поворот в системное программирование. Сначала Германия, потому что там математику приходится заслужить. Потом Швейцария, потому что именно там вычисления и биология действительно работают вместе.',
    'hero.cta1': 'Открыть консоль', 'hero.cta2': 'Полное резюме', 'hero.cta3': 'Репозитории',
    'hero.caption': 'Самонепересекающееся блуждание по решётке — простейшая модель сворачивания белка и одновременно обычный обход графа. Оба прочтения здесь намеренны.',
    'hero.artalt': 'Самонепересекающееся блуждание по решётке с отмеченными нелокальными контактами',

    'm.diploma': 'Средний балл диплома', 'm.german': 'Немецкая шкала, оценка',
    'm.de': 'Немецкий, CEFR', 'm.certs': 'Сертификаты', 'm.locales': 'Языков на странице',

    'traj.h2': 'Четыре этапа, одно направление', 'traj.note': 'Этап 02 из 04',
    'traj.lead': 'Информатика — не обход естественнонаучного диплома, а инструмент к нему. Выравнивание последовательностей, предсказание структуры и популяционная генетика — это алгоритмические задачи в лабораторном халате. Германия учит алгоритмам, Швейцария содержит лаборатории.',
    'traj.s1.k': 'Завершено', 'traj.s1.h': 'Естественные науки, верх шкалы',
    'traj.s1.p': 'Диплом по экспериментальным наукам: математика, физика, химия, биология. Средний балл 20,0/20,0 и вполне рабочая причина интересоваться живыми системами.',
    'traj.s1.w': '2026',
    'traj.s2.k': 'Сейчас', 'traj.s2.h': 'Бакалавриат Informatik',
    'traj.s2.p': 'Подача в немецкие технические университеты на зимний семестр 2027 года, через TestAS и Studienkolleg там, где этого требует путь. Немецкий на уровне B2, в работе — C1.',
    'traj.s2.w': 'Германия · ЗС 2027',
    'traj.s3.k': 'Планируется', 'traj.s3.h': 'Магистратура по вычислительной биологии',
    'traj.s3.p': 'Биоинформатика и системная биология в швейцарском учреждении. Цель именно алгоритмическая: анализ последовательностей, структура и статистика, которая держит и то и другое в честных рамках.',
    'traj.s3.w': 'Швейцария',
    'traj.s4.k': 'Направление', 'traj.s4.h': 'Биотехнологии со стороны вычислений',
    'traj.s4.p': 'В коридоре Базель — Цюрих фармацевтические исследования и вычислительные методы уже делят одно здание. Именно в этой комнате я хочу быть полезен.',
    'traj.s4.w': 'Дальний горизонт',
    'traj.caption': 'Столбцы здесь не украшение: каждый этап дороже предыдущего, и сейчас на этапе 02 держится весь план.',
    'traj.artalt': 'Четыре этапа на направляющей и растущий профиль нагрузки под ней',

    'rec.h2': 'Документы', 'rec.cv': 'Полное резюме', 'rec.native': 'родной',
    'rec.r1.h': 'Диплом по экспериментальным наукам, высшая степень отличия',
    'rec.r1.p': 'Максимально достижимый средний балл по иранской шкале. Примерно 1,0 в немецких терминах — до формальной оценки anabin / uni-assist. Оценка моя, пересчёт их.',
    'rec.r2.h': 'Языки: подтверждённые и в работе',
    'rec.r2.p': 'Персидский — родной. Английский C1–C2 по IELTS Academic. Немецкий B2, в работе тот C1, который предполагают немецкоязычные программы Informatik.',
    'rec.r3.h': 'Семь завершённых сертификаций',
    'rec.r3.p': 'Анализ данных, Python, контроль версий, сети и основы безопасности. Полный список ниже, потому что число без названий — не доказательство.',
    'rec.verify': 'Ссылки на проверку готовятся', 'rec.verifysub': 'Пока они не проставлены, это заявления',
    'rec.r4.h': 'Открытые репозитории',
    'rec.r4.p': 'Всё лежит на GitHub, включая этот сайт и репозиторий подготовки к экзамену по немецкому. Немного, но по-настоящему и с возможностью проверить — ровно поэтому оно здесь.',

    'cap.h2': 'Что я действительно умею', 'cap.note': 'Заявления по размеру доказательств',
    'cap.c1': 'Языки', 'cap.c2': 'Данные', 'cap.c3': 'Системы',
    'cap.python': 'Основной · 3 года', 'cap.bash': 'Ежедневно',
    'cap.sql': 'Соединения, агрегация', 'cap.web': 'Этот сайт, вручную',
    'cap.rust': 'Изучаю · ownership',
    'cap.pandas': 'Очистка, агрегация', 'cap.plots': 'Разведочные графики',
    'cap.stats': 'Сертифицированный курс', 'cap.biopy': 'Читал, не выпускал',
    'cap.linux': 'Основная среда', 'cap.git': 'Ветки, работа через PR',
    'cap.net': 'Сертифицированные основы', 'cap.ps': 'Администрирование Windows',
    'cap.foot': 'Слова «эксперт» здесь нет нигде. Каждая подпись вместо этого называет своё доказательство: самый быстрый способ потерять технического читателя — заявление, которое опровергается одним щелчком.',

    'work.h2': 'Сделано', 'work.all': 'Все репозитории',
    'work.problem': 'Задача', 'work.approach': 'Подход', 'work.result': 'Результат',
    'work.source': 'Исходники', 'work.shipped': 'Готово', 'work.local': 'Локально',
    'work.pending': 'Публикация готовится', 'work.concept': 'Концепция', 'work.progress': 'В работе',
    'work.p1.kicker': 'Онлайн · открытый код', 'work.p1.h': 'Этот сайт',
    'work.p1.problem': 'Четыре заявки в университеты, стипендия и каждый, кто ищет это имя, требуют одних и тех же фактов в разной форме — и всё это синхронизировалось вручную.',
    'work.p1.approach': 'Один статический сайт, без фреймворка и без сборки. Дизайн-система на токенах, написанный вручную интерпретатор для консоли ниже, восемь языков с поддержкой письма справа налево и стиль печати, который выводит резюме прямо на A4.',
    'work.p1.result': 'С 8,4 МБ до примерно 70 КБ в сжатом виде, ноль зависимостей, контраст WCAG AA в обеих темах, и каждый рисунок создан скриптом из репозитория, а не моделью.',
    'work.p1.alt': 'Две выровненные последовательности и дорожка совпадений',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Сетевой набор для терминала',
    'work.p2.problem': 'Диагностика сети означала запуск четырёх утилит и сопоставление их вывода на глаз.',
    'work.p2.approach': 'Один инструмент командной строки на Python, который параллельно на asyncio выполняет обнаружение узлов, сканирование портов и замеры задержки, а затем печатает единый отчёт. Только стандартная библиотека.',
    'work.p2.result': 'Параллельность превращает последовательный обход подсети в одновременный. Коэффициент ускорения здесь не назван, потому что он не измерялся в контролируемых условиях: цифра появится вместе с бенчмарком, не раньше.',
    'work.p2.alt': 'Периодический сигнал с отмеченным окном анализа',
    'work.h2b': 'Открытые вопросы', 'work.noteb': 'Не построено. Намеренно.',
    'work.leadb': 'Ради этого и нужна учёба. Выдавать эти пункты за продукты было бы ложью; называть их вопросами — честная версия и для академического читателя более интересная.',
    'work.i1.h': 'Биосигналы при контакте с ладонью',
    'work.i1.p': 'Сколько на самом деле можно восстановить из фотоплетизмографии в единственной точке контакта, прежде чем победит шум? Это вопрос обработки сигналов, и нужной математики у меня пока нет.',
    'work.i2.h': 'Выравнивание в малом',
    'work.i2.p': 'Алгоритм Нидлмана — Вунша квадратичен, и всякий практический инструмент обходит это стороной. Я хочу сначала сам реализовать точный алгоритм, медленно и плохо, и только потом получить право пользоваться быстрым.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'Материалы по Python и информатике для тех, у кого на родном языке их почти нет. Я учился по бесплатным источникам; это то, что я могу вернуть, пока не годен ни на что другое.',

    'term.h2': 'Консоль', 'term.note': 'Tab дополняет · ↑↓ вызывает историю',
    'term.lead': 'Всё на этой странице доступно и с клавиатуры. Интерпретатор — около двухсот строк JavaScript без зависимостей, и он умеет перенастраивать сайт: попробуйте theme light, lang ru или help.',
    'term.hint': 'наберите help', 'term.output': 'Вывод консоли',
    'term.inlabel': 'Команда консоли', 'term.placeholder': 'help',

    'contact.h2': 'Связаться', 'contact.note': 'Ответ в течение 24 часов',
    'contact.lead': 'Стипендиальные комиссии, преподаватели с работой для ассистента и все, кто строит что-то на границе кода и биологии, — это самый короткий путь ко мне.',
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

    'nav.trajectory': 'Yol', 'nav.record': 'Kayıt', 'nav.capability': 'Yetkinlik',
    'nav.work': 'İşler', 'nav.console': 'Konsol', 'nav.contact': 'İletişim',
    'nav.cv': 'CV', 'nav.language': 'Dil', 'nav.theme': 'Tema',
    'nav.config': 'Ayarlar', 'nav.menu': 'Menü',

    'hero.status': 'Başvuru — Informatik, Almanya, 2027 kış dönemi',
    'hero.h1a': 'Hesaplama, yöneltildiği yer:',
    'hero.h1b': 'canlı sistemler.',
    'hero.lead': 'Ölçeğinin en tepesinde bir fen diploması, ardından sistem programlamaya sert bir dönüş. Önce Almanya, çünkü oradaki üniversiteler matematiği hak ettiriyor. Sonra İsviçre, çünkü hesaplama ile biyolojinin gerçekten birlikte çalıştığı yer orası.',
    'hero.cta1': 'Konsolu aç', 'hero.cta2': 'Tam CV', 'hero.cta3': 'Depolar',
    'hero.caption': 'Kafes üzerinde kendinden kaçınan yürüyüş — protein katlanmasının oyuncak modeli ve aynı zamanda sıradan bir çizge gezintisi. İki okuma da kasıtlı.',
    'hero.artalt': 'Yerel olmayan temasları işaretlenmiş, kafes üzerinde kendinden kaçınan bir yürüyüş',

    'm.diploma': 'Diploma ortalaması', 'm.german': 'Alman ölçeği, tahmini',
    'm.de': 'Almanca, CEFR', 'm.certs': 'Sertifika', 'm.locales': 'Bu sayfadaki dil',

    'traj.h2': 'Dört aşama, tek yön', 'traj.note': 'Aşama 02 / 04',
    'traj.lead': 'Bilgisayar bilimi, fen diplomasından bir sapma değil; onun aracı. Dizi hizalama, yapı tahmini ve popülasyon genetiği, laboratuvar önlüğü giymiş algoritma problemleridir. Almanya algoritmayı öğretiyor, İsviçre laboratuvarı işletiyor.',
    'traj.s1.k': 'Tamamlandı', 'traj.s1.h': 'Fen, ölçeğin tepesinde',
    'traj.s1.p': 'Deneysel Bilimler diploması: matematik, fizik, kimya, biyoloji. 20,0/20,0 ortalama ve canlı sistemlere ilgi duymak için işleyen bir sebep.',
    'traj.s1.w': '2026',
    'traj.s2.k': 'Şu an', 'traj.s2.h': 'Informatik lisansı',
    'traj.s2.p': '2027 kış dönemi için Alman teknik üniversitelerine başvuru; yolun gerektirdiği yerde TestAS ve Studienkolleg üzerinden. Almanca B2, C1 yolunda.',
    'traj.s2.w': 'Almanya · 2027 kış',
    'traj.s3.k': 'Planlanan', 'traj.s3.h': 'Hesaplamalı biyoloji yüksek lisansı',
    'traj.s3.p': 'Bir İsviçre kurumunda biyoenformatik ve sistem biyolojisi. Hedef açıkça algoritmik taraf: dizi analizi, yapı ve ikisini de dürüst tutan istatistik.',
    'traj.s3.w': 'İsviçre',
    'traj.s4.k': 'Yön', 'traj.s4.h': 'Biyoteknoloji, hesaplama tarafından',
    'traj.s4.p': 'Basel–Zürih hattında ilaç araştırması ile hesaplamalı yöntemler zaten aynı binayı paylaşıyor. Faydalı olmak istediğim oda orası.',
    'traj.s4.w': 'Uzun vade',
    'traj.caption': 'Çubuklar süs değil: her aşama bir öncekinden pahalı ve planın tamamı şu anda 02. aşamanın üstünde duruyor.',
    'traj.artalt': 'Bir ray üzerinde dört aşama ve altında yükselen bir yük profili',

    'rec.h2': 'Kayıt', 'rec.cv': 'Tam CV', 'rec.native': 'ana dil',
    'rec.r1.h': 'Deneysel Bilimler diploması, en yüksek derece',
    'rec.r1.p': 'İran ölçeğinde ulaşılabilecek en yüksek ortalama. Alman sisteminde yaklaşık 1,0; anabin / uni-assist tarafından resmî değerlendirmeye tabi. Tahmin bana, dönüşüm onlara ait.',
    'rec.r2.h': 'Diller: belgelenmiş ve sürmekte',
    'rec.r2.p': 'Farsça ana dil. IELTS Academic’e göre İngilizce C1–C2. Almanca B2 ve Almanca verilen Informatik programlarının varsaydığı C1 için çalışılıyor.',
    'rec.r3.h': 'Tamamlanmış yedi sertifika',
    'rec.r3.p': 'Veri analitiği, Python, sürüm kontrolü, ağ ve güvenlik temelleri. Tamamı aşağıda listeli, çünkü isimsiz bir sayı kanıt değildir.',
    'rec.verify': 'Doğrulama bağlantıları bekleniyor', 'rec.verifysub': 'Bağlanana kadar bunlar birer iddiadır',
    'rec.r4.h': 'Açık depolar',
    'rec.r4.p': 'Bu site ve Almanca sınavına hazırlık deposu dahil her şey GitHub’da. Az ama gerçek ve incelenebilir; burada olmasının tek sebebi de bu.',

    'cap.h2': 'Gerçekten yapabildiklerim', 'cap.note': 'Kanıtı kadar iddia',
    'cap.c1': 'Diller', 'cap.c2': 'Veri', 'cap.c3': 'Sistemler',
    'cap.python': 'Birincil · 3 yıl', 'cap.bash': 'Günlük kullanım',
    'cap.sql': 'Join, toplama', 'cap.web': 'Bu site, elle',
    'cap.rust': 'Öğreniyorum · ownership',
    'cap.pandas': 'Temizleme, toplama', 'cap.plots': 'Keşifsel grafikler',
    'cap.stats': 'Sertifikalı ders', 'cap.biopy': 'Okundu, yayınlanmadı',
    'cap.linux': 'Birincil ortam', 'cap.git': 'Dallar, PR akışı',
    'cap.net': 'Sertifikalı temeller', 'cap.ps': 'Windows yönetimi',
    'cap.foot': 'Hiçbir yerde “uzman” yazmıyor. Her etiket bunun yerine dayandığı kanıtı söylüyor; çünkü teknik bir okuru kaybetmenin en hızlı yolu, tek tıkla çürütülebilecek bir iddiadır.',

    'work.h2': 'Yayımlanan', 'work.all': 'Tüm depolar',
    'work.problem': 'Problem', 'work.approach': 'Yaklaşım', 'work.result': 'Sonuç',
    'work.source': 'Kaynak', 'work.shipped': 'Tamam', 'work.local': 'Yerel',
    'work.pending': 'Yayın bekliyor', 'work.concept': 'Kavram', 'work.progress': 'Sürüyor',
    'work.p1.kicker': 'Yayında · açık kaynak', 'work.p1.h': 'Bu site',
    'work.p1.problem': 'Dört üniversite başvurusu, bir burs ve adı arayan herkes aynı bilgileri farklı biçimde istiyor; hepsi elle senkron tutuluyordu.',
    'work.p1.approach': 'Tek bir statik site; çerçeve yok, derleme adımı yok. Token tabanlı bir tasarım sistemi, aşağıdaki konsol için elle yazılmış bir yorumlayıcı, sağdan sola desteğiyle sekiz dil ve CV’yi doğrudan A4’e basan bir yazdırma stili.',
    'work.p1.result': '8,4 MB’tan sıkıştırılmış yaklaşık 70 KB’a, sıfır bağımlılık, her iki temada WCAG AA kontrastı ve her çizim bir modelin değil, depodaki bir betiğin ürünü.',
    'work.p1.alt': 'Hizalanmış iki dizi ve eşleşme şeridi',
    'work.p2.kicker': 'Python · CLI', 'work.p2.h': 'Terminal ağ araç seti',
    'work.p2.problem': 'Bir ağı teşhis etmek dört ayrı aracı çalıştırıp çıktılarını gözle eşleştirmek demekti.',
    'work.p2.approach': 'Ana makine keşfi, port taraması ve gecikme ölçümünü asyncio üzerinde eşzamanlı yürütüp tek bir rapor basan tek bir Python komut satırı aracı. Yalnızca standart kütüphane.',
    'work.p2.result': 'Eşzamanlılık, seri bir alt ağ taramasını paralel hale getiriyor. Hızlanma oranı burada verilmiyor, çünkü kontrollü koşullarda ölçülmedi: sayı, kıyaslama geldiğinde gelir, öncesinde değil.',
    'work.p2.alt': 'Bir analiz penceresi işaretlenmiş periyodik sinyal',
    'work.h2b': 'Açık sorular', 'work.noteb': 'Yapılmadı. Bilerek.',
    'work.leadb': 'Diploma tam da bunun için. Bunları ürün diye sunmak yalan olurdu; soru olarak listelemek dürüst olanı ve akademik bir okur için daha ilginç olanı.',
    'work.i1.h': 'Avuç temaslı biyosinyaller',
    'work.i1.p': 'Tek bir el temasında fotopletismografiden gürültü tabanı kazanmadan önce gerçekte ne kadarı geri kazanılabilir? Bu bir sinyal işleme sorusu ve matematiği bende henüz yok.',
    'work.i2.h': 'Küçük ölçekte hizalama',
    'work.i2.p': 'Needleman–Wunsch karesel ve her pratik araç bunu dolanıyor. Hızlısını kullanma iznini almadan önce kesin algoritmayı kendim, yavaş ve kötü biçimde yazmak istiyorum.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'Kendi dilinde neredeyse hiç kaynağı olmayanlar için Python ve bilgisayar bilimi materyali. Ben ücretsiz kaynaklardan öğrendim; başka bir şeye yetkin olmadan önce geri verebileceğim kısım bu.',

    'term.h2': 'Konsol', 'term.note': 'Tab tamamlar · ↑↓ geçmişi getirir',
    'term.lead': 'Bu sayfadaki her şeye yazarak da ulaşılır. Yorumlayıcı, bağımlılıksız yaklaşık iki yüz satır JavaScript ve siteyi yeniden yapılandırabiliyor: theme light, lang tr veya help deneyin.',
    'term.hint': 'help yazın', 'term.output': 'Konsol çıktısı',
    'term.inlabel': 'Konsol komutu', 'term.placeholder': 'help',

    'contact.h2': 'İletişime geçin', 'contact.note': '24 saat içinde yanıt',
    'contact.lead': 'Burs komiteleri, araştırma asistanlığı işi olan akademisyenler ve kod ile biyolojinin sınırında bir şey inşa eden herkes — bana ulaşmanın en hızlı yolu bu.',
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

    'nav.trajectory': 'المسار', 'nav.record': 'السجل', 'nav.capability': 'القدرات',
    'nav.work': 'الأعمال', 'nav.console': 'الطرفية', 'nav.contact': 'التواصل',
    'nav.cv': 'السيرة الذاتية', 'nav.language': 'اللغة', 'nav.theme': 'المظهر',
    'nav.config': 'الإعدادات', 'nav.menu': 'القائمة',

    'hero.status': 'تقديم — Informatik، ألمانيا، الفصل الشتوي 2027',
    'hero.h1a': 'حوسبة موجَّهة نحو',
    'hero.h1b': 'الأنظمة الحيّة.',
    'hero.lead': 'شهادة علوم في أعلى سلّمها، ثم انعطافة حادّة نحو برمجة الأنظمة. ألمانيا أولًا، لأن جامعاتها تجعلك تستحق الرياضيات. سويسرا بعدها، لأنها المكان الذي تعمل فيه الحوسبة والبيولوجيا معًا فعلًا.',
    'hero.cta1': 'افتح الطرفية', 'hero.cta2': 'السيرة الكاملة', 'hero.cta3': 'المستودعات',
    'hero.caption': 'مسار متجنِّب لذاته على شبكة — النموذج المبسّط لطيّ البروتين، وفي الوقت نفسه اجتياز عادي لمخطط. القراءتان مقصودتان.',
    'hero.artalt': 'مسار متجنِّب لذاته على شبكة مع تعليم التماسّات غير المحلية',

    'm.diploma': 'معدل الشهادة', 'm.german': 'السلّم الألماني، تقديريًا',
    'm.de': 'الألمانية، الإطار الأوروبي', 'm.certs': 'شهادات مهنية', 'm.locales': 'لغات هذه الصفحة',

    'traj.h2': 'أربع مراحل، اتجاه واحد', 'traj.note': 'المرحلة 02 من 04',
    'traj.lead': 'علوم الحاسوب ليست التفافًا حول شهادة العلوم، بل هي أداتها. محاذاة التسلسلات، والتنبؤ بالبنية، وعلم الوراثة السكانية كلها مسائل خوارزمية بمعطف مختبر. ألمانيا تُدرِّس الخوارزميات، وسويسرا تُشغّل المختبرات.',
    'traj.s1.k': 'مكتملة', 'traj.s1.h': 'العلوم، في قمة السلّم',
    'traj.s1.p': 'شهادة العلوم التجريبية: رياضيات وفيزياء وكيمياء وأحياء. معدل 20٫0 من 20٫0 وسبب عملي للاهتمام بالأنظمة الحيّة.',
    'traj.s1.w': '2026',
    'traj.s2.k': 'الحالية', 'traj.s2.h': 'بكالوريوس Informatik',
    'traj.s2.p': 'تقديم إلى الجامعات التقنية الألمانية للفصل الشتوي 2027، عبر TestAS وStudienkolleg حين يتطلب المسار ذلك. الألمانية عند B2 وفي طريقها إلى C1.',
    'traj.s2.w': 'ألمانيا · شتاء 2027',
    'traj.s3.k': 'مُخطَّطة', 'traj.s3.h': 'ماجستير في البيولوجيا الحاسوبية',
    'traj.s3.p': 'المعلوماتية الحيوية وبيولوجيا الأنظمة في مؤسسة سويسرية. الهدف صراحةً هو الجانب الخوارزمي: تحليل التسلسلات، والبنية، والإحصاء الذي يُبقي الاثنين صادقين.',
    'traj.s3.w': 'سويسرا',
    'traj.s4.k': 'الاتجاه', 'traj.s4.h': 'التقنية الحيوية من جهة الحوسبة',
    'traj.s4.p': 'في ممر بازل–زيورخ يتشارك البحث الدوائي والأساليب الحاسوبية المبنى نفسه أصلًا. تلك هي الغرفة التي أريد أن أكون نافعًا فيها.',
    'traj.s4.w': 'المدى البعيد',
    'traj.caption': 'الأعمدة ليست زينة: كل مرحلة أغلى من سابقتها، والخطة كلها تستند اليوم إلى المرحلة 02.',
    'traj.artalt': 'أربع مراحل على مسار، وتحتها منحنى حِمل متصاعد',

    'rec.h2': 'السجل', 'rec.cv': 'السيرة الكاملة', 'rec.native': 'لغة أم',
    'rec.r1.h': 'شهادة العلوم التجريبية بأعلى مرتبة',
    'rec.r1.p': 'أعلى معدل ممكن على السلّم الإيراني. نحو 1٫0 بالمقياس الألماني، بانتظار التقييم الرسمي من anabin / uni-assist — التقدير تقديري، والتحويل تحويلهم.',
    'rec.r2.h': 'اللغات: موثَّقة وقيد العمل',
    'rec.r2.p': 'الفارسية لغة أم. الإنجليزية عند C1–C2 وفق IELTS Academic. الألمانية عند B2، والعمل جارٍ نحو C1 الذي تفترضه برامج Informatik المُدرَّسة بالألمانية.',
    'rec.r3.h': 'سبع شهادات مكتملة',
    'rec.r3.p': 'تحليل البيانات، وبايثون، وإدارة الإصدارات، وأساسيات الشبكات والأمن. مذكورة كاملة أدناه، لأن رقمًا بلا أسماء ليس دليلًا.',
    'rec.verify': 'روابط التحقق قيد الإعداد', 'rec.verifysub': 'إلى أن تُربَط، تبقى هذه ادّعاءات',
    'rec.r4.h': 'مستودعات عامة',
    'rec.r4.p': 'كل شيء على GitHub، بما فيه هذا الموقع ومستودع التحضير لامتحان الألمانية. قليل، لكنه حقيقي وقابل للفحص، وهذا وحده سبب وجوده هنا.',

    'cap.h2': 'ما أستطيع فعله فعلًا', 'cap.note': 'ادّعاءات بحجم أدلّتها',
    'cap.c1': 'اللغات', 'cap.c2': 'البيانات', 'cap.c3': 'الأنظمة',
    'cap.python': 'أساسية · 3 سنوات', 'cap.bash': 'استخدام يومي',
    'cap.sql': 'ربط وتجميع', 'cap.web': 'هذا الموقع، يدويًا',
    'cap.rust': 'قيد التعلّم · الملكية',
    'cap.pandas': 'تنظيف وتجميع', 'cap.plots': 'رسوم استكشافية',
    'cap.stats': 'مقرر موثَّق', 'cap.biopy': 'قراءة، لا إنتاج',
    'cap.linux': 'البيئة الأساسية', 'cap.git': 'فروع وسير عمل PR',
    'cap.net': 'أساسيات موثَّقة', 'cap.ps': 'إدارة ويندوز',
    'cap.foot': 'لا ترد كلمة «خبير» في أي موضع. كل وصف يذكر دليله بدلًا من ذلك، لأن أسرع طريقة لفقدان قارئ تقني هي ادّعاء يمكن دحضه بنقرة واحدة.',

    'work.h2': 'منجَز', 'work.all': 'كل المستودعات',
    'work.problem': 'المشكلة', 'work.approach': 'المعالجة', 'work.result': 'النتيجة',
    'work.source': 'الشيفرة', 'work.shipped': 'منجَز', 'work.local': 'محلي',
    'work.pending': 'بانتظار النشر', 'work.concept': 'تصوّر', 'work.progress': 'قيد العمل',
    'work.p1.kicker': 'مباشر · مفتوح المصدر', 'work.p1.h': 'هذا الموقع',
    'work.p1.problem': 'أربعة طلبات جامعية، ومنحة، وكل من يبحث عن الاسم يحتاجون الحقائق نفسها بصيغ مختلفة، وكانت تُحدَّث يدويًا.',
    'work.p1.approach': 'موقع ثابت واحد، بلا إطار عمل وبلا خطوة بناء. نظام تصميم قائم على الرموز، ومفسّر مكتوب يدويًا للطرفية أدناه، وثماني لغات مع دعم الكتابة من اليمين إلى اليسار، وورقة أنماط طباعة تُخرج السيرة الذاتية مباشرة بمقاس A4.',
    'work.p1.result': 'من 8٫4 ميغابايت إلى نحو 70 كيلوبايت بعد الضغط، بلا أي اعتماديات، وتباين يفي بمعيار WCAG AA في المظهرين، وكل رسم يولّده سكربت في المستودع لا نموذج ذكاء اصطناعي.',
    'work.p1.alt': 'تسلسلان متحاذيان مع شريط التطابق بينهما',
    'work.p2.kicker': 'بايثون · سطر أوامر', 'work.p2.h': 'عدّة شبكات للطرفية',
    'work.p2.problem': 'تشخيص الشبكة كان يعني تشغيل أربع أدوات ومطابقة مخرجاتها بالعين.',
    'work.p2.approach': 'أداة بايثون واحدة تعمل من سطر الأوامر، تُجري اكتشاف المضيفين وفحص المنافذ وقياس زمن الاستجابة على التوازي عبر asyncio ثم تطبع تقريرًا واحدًا. المكتبة القياسية فقط.',
    'work.p2.result': 'التوازي يحوّل مسح الشبكة الفرعية من تسلسلي إلى متزامن. لم يُذكر مقدار التسريع هنا لأنه لم يُقَس في ظروف مضبوطة — الرقم يأتي مع القياس المرجعي، لا قبله.',
    'work.p2.alt': 'إشارة دورية مع نافذة تحليل واحدة معلَّمة',
    'work.h2b': 'أسئلة مفتوحة', 'work.noteb': 'لم تُبنَ. عن قصد.',
    'work.leadb': 'هذه هي غاية الدراسة. تقديمها كمنتجات كذب؛ وإدراجها كأسئلة هو النسخة الصادقة، وهي للقارئ الأكاديمي الأكثر إثارة للاهتمام.',
    'work.i1.h': 'إشارات حيوية من ملامسة الكف',
    'work.i1.p': 'كم يمكن استرجاعه فعلًا من تخطيط التحجّم الضوئي عند نقطة تماس واحدة قبل أن تغلب أرضية الضجيج؟ هذا سؤال في معالجة الإشارات، ولا أملك رياضياته بعد.',
    'work.i2.h': 'المحاذاة على نطاق صغير',
    'work.i2.p': 'خوارزمية نيدلمان–وونش تربيعية، وكل أداة عملية تلتفّ حولها. أريد أن أنفّذ الخوارزمية الدقيقة أولًا، ببطء ورداءة، قبل أن يُسمح لي باستخدام السريعة.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'مواد في بايثون وعلوم الحاسوب لمتعلمين تكاد لغتهم تخلو منها. تعلّمت من مصادر مجانية؛ وهذا ما أستطيع ردّه قبل أن أكون مؤهلًا لأي شيء آخر.',

    'term.h2': 'الطرفية', 'term.note': 'Tab يُكمل · ↑↓ يستعيد',
    'term.lead': 'كل ما في هذه الصفحة يمكن بلوغه بالكتابة أيضًا. المفسّر نحو مئتَي سطر من جافاسكربت بلا اعتماديات، ويستطيع إعادة ضبط الموقع — جرّب theme light أو lang ar أو help.',
    'term.hint': 'اكتب help', 'term.output': 'مخرجات الطرفية',
    'term.inlabel': 'أمر الطرفية', 'term.placeholder': 'help',

    'contact.h2': 'تواصل معي', 'contact.note': 'الرد خلال 24 ساعة',
    'contact.lead': 'لجان المنح، والأساتذة الذين لديهم عمل لمساعد بحث، وكل من يبني شيئًا عند حدود الشيفرة والبيولوجيا — هذا أسرع طريق إليّ.',
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

    'nav.trajectory': 'مسیر', 'nav.record': 'کارنامه', 'nav.capability': 'توانایی‌ها',
    'nav.work': 'کارها', 'nav.console': 'کنسول', 'nav.contact': 'تماس',
    'nav.cv': 'رزومه', 'nav.language': 'زبان', 'nav.theme': 'پوسته',
    'nav.config': 'تنظیمات', 'nav.menu': 'منو',

    'hero.status': 'در حال اقدام — Informatik، آلمان، نیم‌سال زمستانی ۲۰۲۷',
    'hero.h1a': 'محاسبات، نشانه‌رفته به سوی',
    'hero.h1b': 'سامانه‌های زنده.',
    'hero.lead': 'دیپلم علوم در بالاترین نقطهٔ مقیاسش، و بعد یک چرخش تند به سمت برنامه‌نویسی سیستم. اول آلمان، چون دانشگاه‌هایش ریاضیات را از آدم طلب می‌کنند. بعد سوئیس، چون آنجا جایی است که محاسبات و زیست‌شناسی واقعاً کنار هم کار می‌کنند.',
    'hero.cta1': 'باز کردن کنسول', 'hero.cta2': 'رزومهٔ کامل', 'hero.cta3': 'مخزن‌ها',
    'hero.caption': 'گشت خودپرهیز روی یک شبکه — ساده‌ترین مدل تاخوردگی پروتئین، و در عین حال یک پیمایش گراف معمولی. هر دو خوانش عمدی‌اند.',
    'hero.artalt': 'یک گشت خودپرهیز روی شبکه با تماس‌های غیرمحلی نشانه‌گذاری‌شده',

    'm.diploma': 'معدل دیپلم', 'm.german': 'مقیاس آلمانی، تخمینی',
    'm.de': 'آلمانی، CEFR', 'm.certs': 'گواهی‌نامه', 'm.locales': 'زبان در این صفحه',

    'traj.h2': 'چهار مرحله، یک جهت', 'traj.note': 'مرحلهٔ ۰۲ از ۰۴',
    'traj.lead': 'علوم کامپیوتر انحراف از دیپلم علوم نیست؛ ابزار آن است. هم‌ترازی توالی، پیش‌بینی ساختار و ژنتیک جمعیت همگی مسائل الگوریتمی‌اند که روپوش آزمایشگاه پوشیده‌اند. آلمان الگوریتم را درس می‌دهد، سوئیس آزمایشگاه را می‌گرداند.',
    'traj.s1.k': 'انجام‌شده', 'traj.s1.h': 'علوم، در بالای مقیاس',
    'traj.s1.p': 'دیپلم علوم تجربی: ریاضی، فیزیک، شیمی، زیست‌شناسی. معدل ۲۰٫۰ از ۲۰٫۰ و یک دلیل کارآمد برای علاقه به سامانه‌های زنده.',
    'traj.s1.w': '۲۰۲۶',
    'traj.s2.k': 'جاری', 'traj.s2.h': 'کارشناسی Informatik',
    'traj.s2.p': 'اقدام برای دانشگاه‌های فنی آلمان در نیم‌سال زمستانی ۲۰۲۷، از مسیر TestAS و Studienkolleg هرجا که لازم باشد. آلمانی در سطح B2 و در مسیر C1.',
    'traj.s2.w': 'آلمان · زمستان ۲۰۲۷',
    'traj.s3.k': 'برنامه‌ریزی‌شده', 'traj.s3.h': 'کارشناسی ارشد زیست‌شناسی محاسباتی',
    'traj.s3.p': 'بیوانفورماتیک و زیست‌شناسی سامانه‌ها در یک نهاد سوئیسی. هدف صراحتاً سمت الگوریتمی است: تحلیل توالی، ساختار، و آماری که هر دو را صادق نگه می‌دارد.',
    'traj.s3.w': 'سوئیس',
    'traj.s4.k': 'جهت', 'traj.s4.h': 'زیست‌فناوری، از سمت محاسبات',
    'traj.s4.p': 'در راهروی بازل–زوریخ، پژوهش دارویی و روش‌های محاسباتی همین حالا در یک ساختمان‌اند. آن اتاقی است که می‌خواهم در آن به کار بیایم.',
    'traj.s4.w': 'بلندمدت',
    'traj.caption': 'میله‌ها تزئین نیستند: هر مرحله از مرحلهٔ پیش گران‌تر است، و کل نقشه در حال حاضر روی مرحلهٔ ۰۲ سوار است.',
    'traj.artalt': 'چهار مرحله روی یک ریل، با نیم‌رخ باری صعودی در زیر آن',

    'rec.h2': 'کارنامه', 'rec.cv': 'رزومهٔ کامل', 'rec.native': 'زبان مادری',
    'rec.r1.h': 'دیپلم علوم تجربی با بالاترین درجه',
    'rec.r1.p': 'بالاترین معدل ممکن در مقیاس ایران. تقریباً ۱٫۰ به مقیاس آلمانی، منوط به ارزیابی رسمی anabin / uni-assist — تخمین از من است و تبدیل از آن‌ها.',
    'rec.r2.h': 'زبان‌ها: گواهی‌شده و در جریان',
    'rec.r2.p': 'فارسی زبان مادری. انگلیسی در سطح C1–C2 بر پایهٔ IELTS Academic. آلمانی در B2 و در حال کار روی همان C1 که رشته‌های Informatik آلمانی‌زبان مفروض می‌گیرند.',
    'rec.r3.h': 'هفت گواهی‌نامهٔ تکمیل‌شده',
    'rec.r3.p': 'تحلیل داده، پایتون، کنترل نسخه، شبکه و مبانی امنیت. فهرست کامل در پایین آمده، چون عددی بدون نام مدرک نیست.',
    'rec.verify': 'پیوندهای راستی‌آزمایی در راه است', 'rec.verifysub': 'تا وقتی پیوند نخورده‌اند، اینها ادعا هستند',
    'rec.r4.h': 'مخزن‌های عمومی',
    'rec.r4.p': 'همه‌چیز روی GitHub است، از جمله همین سایت و مخزن آمادگی آزمون آلمانی. کم است، اما واقعی و قابل بررسی — و دلیل بودنش اینجا دقیقاً همین است.',

    'cap.h2': 'آنچه واقعاً از پس آن برمی‌آیم', 'cap.note': 'ادعاها به اندازهٔ مدرکشان',
    'cap.c1': 'زبان‌ها', 'cap.c2': 'داده', 'cap.c3': 'سامانه‌ها',
    'cap.python': 'اصلی · ۳ سال', 'cap.bash': 'استفادهٔ روزانه',
    'cap.sql': 'اتصال، تجمیع', 'cap.web': 'همین سایت، دستی',
    'cap.rust': 'در حال یادگیری · مالکیت',
    'cap.pandas': 'پاک‌سازی، تجمیع', 'cap.plots': 'نمودارهای اکتشافی',
    'cap.stats': 'درس گواهی‌شده', 'cap.biopy': 'خوانده، نه منتشرشده',
    'cap.linux': 'محیط اصلی', 'cap.git': 'شاخه‌ها، گردش‌کار PR',
    'cap.net': 'مبانی گواهی‌شده', 'cap.ps': 'مدیریت ویندوز',
    'cap.foot': 'هیچ‌جا کلمهٔ «متخصص» نیامده. هر برچسب به‌جای آن مدرکش را نام می‌برد، چون سریع‌ترین راه از دست دادن خوانندهٔ فنی، ادعایی است که با یک کلیک رد می‌شود.',

    'work.h2': 'تحویل‌شده', 'work.all': 'همهٔ مخزن‌ها',
    'work.problem': 'مسئله', 'work.approach': 'رویکرد', 'work.result': 'نتیجه',
    'work.source': 'کد', 'work.shipped': 'تحویل‌شده', 'work.local': 'محلی',
    'work.pending': 'در انتظار انتشار', 'work.concept': 'ایده', 'work.progress': 'در جریان',
    'work.p1.kicker': 'آنلاین · متن‌باز', 'work.p1.h': 'همین سایت',
    'work.p1.problem': 'چهار درخواست دانشگاهی، یک بورسیه، و هر کسی که این نام را جست‌وجو می‌کند، همگی همان واقعیت‌ها را در قالبی متفاوت می‌خواهند — و همه دستی هماهنگ نگه داشته می‌شدند.',
    'work.p1.approach': 'یک سایت ایستا، بدون فریم‌ورک و بدون مرحلهٔ ساخت. یک سامانهٔ طراحی مبتنی بر توکن، یک مفسر دست‌نویس برای کنسول پایین، هشت زبان با پشتیبانی راست‌به‌چپ، و یک شیوه‌نامهٔ چاپ که رزومه را مستقیم روی A4 می‌برد.',
    'work.p1.result': 'از ۸٫۴ مگابایت به حدود ۷۰ کیلوبایت فشرده، بدون هیچ وابستگی، کنتراست WCAG AA در هر دو پوسته، و هر تصویر ساختهٔ اسکریپتی در همین مخزن است، نه یک مدل.',
    'work.p1.alt': 'دو توالی هم‌ترازشده به همراه نوار تطابقشان',
    'work.p2.kicker': 'پایتون · خط فرمان', 'work.p2.h': 'جعبه‌ابزار شبکه در ترمینال',
    'work.p2.problem': 'عیب‌یابی شبکه یعنی اجرای چهار ابزار جدا و تطبیق چشمی خروجی‌هایشان.',
    'work.p2.approach': 'یک ابزار خط فرمان پایتون که کشف میزبان، پویش پورت و سنجش تأخیر را هم‌زمان روی asyncio اجرا می‌کند و یک گزارش واحد چاپ می‌کند. فقط کتابخانهٔ استاندارد.',
    'work.p2.result': 'هم‌زمانی، پویش سریالی یک زیرشبکه را موازی می‌کند. ضریب شتاب اینجا ذکر نشده چون در شرایط کنترل‌شده اندازه‌گیری نشده است — عدد وقتی می‌آید که سنجه بیاید، نه پیش از آن.',
    'work.p2.alt': 'یک سیگنال تناوبی با یک پنجرهٔ تحلیل نشانه‌گذاری‌شده',
    'work.h2b': 'پرسش‌های باز', 'work.noteb': 'ساخته نشده. عمداً.',
    'work.leadb': 'تحصیل دقیقاً برای همین است. ارائهٔ این‌ها به‌عنوان محصول دروغ می‌بود؛ فهرست کردنشان به‌عنوان پرسش نسخهٔ صادقانه است و برای خوانندهٔ دانشگاهی جالب‌تر.',
    'work.i1.h': 'زیست‌سیگنال از تماس کف دست',
    'work.i1.p': 'واقعاً چقدر می‌توان از فوتوپلتیسموگرافی در یک نقطهٔ تماس بازیابی کرد، پیش از آنکه کف نویز پیروز شود؟ این پرسشی در پردازش سیگنال است و ریاضیاتش را هنوز ندارم.',
    'work.i2.h': 'هم‌ترازی در مقیاس کوچک',
    'work.i2.p': 'نیدلمن–وانش درجه‌دو است و هر ابزار عملی دورش می‌زند. می‌خواهم اول خودم الگوریتم دقیق را پیاده کنم، کند و بد، و بعد اجازهٔ استفاده از نسخهٔ سریع را داشته باشم.',
    'work.i3.h': 'Moython',
    'work.i3.p': 'محتوای پایتون و علوم کامپیوتر برای کسانی که به زبان خودشان تقریباً هیچ ندارند. من از منابع رایگان یاد گرفتم؛ این همان بخشی است که می‌توانم پس بدهم، پیش از آنکه برای کار دیگری صلاحیت داشته باشم.',

    'term.h2': 'کنسول', 'term.note': 'Tab تکمیل می‌کند · ↑↓ تاریخچه',
    'term.lead': 'هر چیزی در این صفحه با تایپ کردن هم در دسترس است. مفسر حدود دویست خط جاوااسکریپت بدون وابستگی است و می‌تواند سایت را پیکربندی کند — theme light یا lang fa یا help را امتحان کنید.',
    'term.hint': 'help را بزنید', 'term.output': 'خروجی کنسول',
    'term.inlabel': 'فرمان کنسول', 'term.placeholder': 'help',

    'contact.h2': 'تماس بگیرید', 'contact.note': 'پاسخ ظرف ۲۴ ساعت',
    'contact.lead': 'کمیته‌های بورسیه، استادانی که کار دستیار پژوهش دارند، و هر کسی که چیزی در مرز کد و زیست‌شناسی می‌سازد — این کوتاه‌ترین راه به من است.',
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
