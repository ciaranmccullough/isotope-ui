/**
 * Post-publish: push the version tag `changeset publish` created and mirror the release onto
 * GitHub, with notes taken from this version's section of CHANGELOG.md. Idempotent — no-ops if
 * nothing was published this run, and skips creating the release if it already exists. Publishing
 * itself stays manual (run via `pnpm release`); this only reflects it on GitHub. Requires an
 * authenticated `gh` CLI.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const tag = `${pkg.name}@${pkg.version}`;

function succeeds(command, args) {
  try {
    execFileSync(command, args, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// `changeset publish` tags only what it actually published; no tag ⇒ nothing to mirror this run.
if (!succeeds('git', ['rev-parse', '-q', '--verify', `refs/tags/${tag}`])) {
  console.log(`github-release: no local tag ${tag} (nothing published this run); skipping.`);
  process.exit(0);
}

// Push the tag (a no-op if it is already on the remote — changeset tags are lightweight, so
// `git push --follow-tags` would skip them).
execFileSync('git', ['push', 'origin', tag], { stdio: 'inherit' });

if (succeeds('gh', ['release', 'view', tag])) {
  console.log(`github-release: release ${tag} already exists; tag pushed, nothing else to do.`);
  process.exit(0);
}

// Release notes = this version's section of CHANGELOG.md (fallback to a bare title).
const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8').split('\n');
const start = changelog.findIndex((line) => line.trim() === `## ${pkg.version}`);
let notes = `Release ${tag}`;
if (start !== -1) {
  let end = changelog.length;
  for (let i = start + 1; i < changelog.length; i += 1) {
    if (changelog[i].startsWith('## ')) {
      end = i;
      break;
    }
  }
  notes =
    changelog
      .slice(start + 1, end)
      .join('\n')
      .trim() || notes;
}

execFileSync('gh', ['release', 'create', tag, '--title', tag, '--notes', notes, '--latest'], {
  stdio: 'inherit',
});
console.log(`github-release: created GitHub release ${tag}.`);
