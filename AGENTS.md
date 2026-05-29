# AGENTS.md

## Preferencias del proyecto

- El usuario quiere ver siempre los cambios en el navegador/explorador local mientras se trabaja en la landing.
- Para esta web estatica, usar preferentemente un servidor local desde la raiz del proyecto:

```bash
python3 -m http.server 8000
```

- URL local habitual:

```text
http://localhost:8000/
```

- Si el navegador no se abre automaticamente desde el entorno de Codex, indicar claramente que la apertura no se puede confirmar y dar la URL directa al usuario.
- No hacer `git push` automaticamente. El usuario prefiere subir los cambios por su cuenta.
