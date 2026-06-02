Local Community Event Portal

Quick start:
- Serve the folder (recommended) so fetch works. Using Python:

```powershell
python -m http.server 8000
```

- Open http://localhost:8000 in your browser (or use Live Server extension).

Files:
- index.html — main page (loads `main.js`)
- main.js — demonstrates tasks: console.log, alert on load, classes, closures, DOM, fetch, async/await, form handling
- mock-api.json — mock event data

Notes:
- For jQuery examples you could use `$('#registerBtn').click(function(){ ... })` and `.fadeIn()`/.fadeOut().
- To simulate POST server behavior the script uses `setTimeout()`; replace with a real endpoint for production.
- Use DevTools Console and Network tabs to debug fetch and form payloads.
