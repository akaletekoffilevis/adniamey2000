#!/usr/bin/env bash
set -euo pipefail

git add -A
git commit -m "refactor: remove sermons, articles, blog content and restructure into frontend/backend

- Delete all sermon/article/blog pages (FR/EN/HA) and admin pages
- Remove backend routes, schema, seed data for sermons and articles
- Clean frontend JS (dynamic.js, script.js, api.js) of sermon/article logic
- Clean i18n files (en, ha, it) of sermon/article keys
- Clean navbar and footer in all HTML files
- Regenerate minified JS with terser
- Clean service-worker cache list
- Move codebase into frontend/ and backend/ directories"