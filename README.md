# Translate Conversation

[Hier ist der Link, um CORS-Beschränkungen im Browser zu umgehen](https://alfilatov.com/posts/run-chrome-without-cors/). Dieses Repository dient als Demo für eine App, die von einem ÖPNV-Unternehmen in Bussen eingesetzt werden soll. Ziel ist es, Busfahrern, die keine Deutschkenntnisse haben, trotzdem die Möglichekeit zu geben, einen Dialog mit den Fahrgästen zu führen.

## Empfohlene IDE-Konfiguration

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (und deaktiviere Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Typenunterstützung für `.vue`-Importe in TS

Standardmäßig kann TypeScript keine Typinformationen für `.vue`-Importe verarbeiten. Daher verwenden wir `vue-tsc` anstelle des `tsc` CLI für die Typüberprüfung. In Editoren benötigen wir das [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin), um den TypeScript Language Service über die `.vue`-Typen zu informieren.

Falls das eigenständige TypeScript-Plugin für Sie nicht schnell genug ist, hat Volar auch einen [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) implementiert, der leistungsfähiger ist. Sie können ihn wie folgt aktivieren:

1. Deaktivieren Sie die integrierte TypeScript-Erweiterung
   1) Führen Sie `Extensions: Show Built-in Extensions` im Befehlspalette von VSCode aus.
   2) Finden Sie `TypeScript and JavaScript Language Features`, klicken Sie mit der rechten Maustaste und wählen Sie `Deaktivieren (Workspace)`.
2. Aktualisieren Sie das VSCode-Fenster, indem Sie `Developer: Reload Window` aus der Befehlspalette ausführen.

## Konfiguration anpassen

Siehe [Vite Configuration Reference](https://vitejs.dev/config/).

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