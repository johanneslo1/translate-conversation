# Translate Conversation

Dies ist der Sourcecode eines Projekts, das als außercurriculare Leistung während meines Bachelors in Wirtschaftsinformatik entstanden ist. 

In dem Projekt ging es darum, für ein Unternehmen aus dem Bereich des öffentlichen Nahverkehrs eine Applikation zu entwickeln, die es Busfahrern mit geringen oder keinen Deutschkenntnissen ermöglichen soll, mit den Fahrgästen in Dialog zu treten. Es handelt sich um einen rudimentären Prototypen. Er soll zeigen, wie ein Gespräch zwischen dem Busfahrer und einem Fahrgast in einer beliebigen Sprache aussehen kann. Dazu verwendet die Anwendung die OpenAI [TTS](https://platform.openai.com/docs/guides/text-to-speech) & [STT](https://platform.openai.com/docs/guides/speech-to-text) API. Die [DeepL API](https://www.deepl.com/de/pro-api) wird für die Übersetzung der Dialoge verwendet. 


Um das Projekt auszuführen, kann die Datei `dist/index.html` im Browser geöffnet werden. [Der Browser sollte keine CORS-Einschränkungen haben](https://alfilatov.com/posts/run-chrome-without-cors/), da die Anfragen an die Drittanbieter-APIs im Browser selbst erfolgen.  


## Projektsetup

```sh
npm install
```

### Kompilieren und Hot-Reload für die Entwicklung

```sh
npm run dev
```

### Typüberprüfung, Kompilieren und Minifizieren für die Produktion

```sh
npm run build
```

### Unit-Tests mit [Vitest](https://vitest.dev/) ausführen

```sh
npm run test:unit
```

### Linten mit [ESLint](https://eslint.org/)

```sh
npm run lint
```
