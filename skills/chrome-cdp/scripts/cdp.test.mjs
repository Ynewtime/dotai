import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getCandidatePaths, parseSnapCompact } from './cdp.mjs';

describe('getCandidatePaths', () => {
  it('includes macOS and Linux paths by default', () => {
    const paths = getCandidatePaths({
      platform: 'darwin',
      homeDir: '/Users/alice',
      procVersion: null,
      wslUsers: [],
    });
    assert.ok(paths.some(p => p.includes('Library/Application Support/Google/Chrome')));
    assert.ok(paths.some(p => p.includes('.config/google-chrome')));
    assert.ok(!paths.some(p => p.includes('/mnt/c/')));
  });

  it('adds WSL2 Windows paths when on WSL', () => {
    const paths = getCandidatePaths({
      platform: 'linux',
      homeDir: '/home/alice',
      procVersion: 'Linux version 5.15.153.1-microsoft-standard-WSL2',
      wslUsers: ['alice', 'bob'],
    });
    assert.ok(paths.some(p => p.includes('.config/google-chrome')));
    assert.ok(paths.some(p =>
      p.includes('/mnt/c/Users/alice/AppData/Local/Google/Chrome/User Data/DevToolsActivePort')
    ));
    assert.ok(paths.some(p =>
      p.includes('/mnt/c/Users/bob/AppData/Local/Google/Chrome/User Data/DevToolsActivePort')
    ));
  });

  it('skips WSL paths on plain Linux (no microsoft in /proc/version)', () => {
    const paths = getCandidatePaths({
      platform: 'linux',
      homeDir: '/home/alice',
      procVersion: 'Linux version 6.1.0-generic',
      wslUsers: [],
    });
    assert.ok(!paths.some(p => p.includes('/mnt/c/')));
  });

  it('skips WSL paths when procVersion is null (unreadable)', () => {
    const paths = getCandidatePaths({
      platform: 'linux',
      homeDir: '/home/alice',
      procVersion: null,
      wslUsers: [],
    });
    assert.ok(!paths.some(p => p.includes('/mnt/c/')));
  });

  it('filters out system/default Windows user directories', () => {
    const paths = getCandidatePaths({
      platform: 'linux',
      homeDir: '/home/alice',
      procVersion: 'microsoft-standard-WSL2',
      wslUsers: ['alice', 'All Users', 'Default', 'Default User', 'Public'],
    });
    const wslPaths = paths.filter(p => p.includes('/mnt/c/'));
    assert.equal(wslPaths.length, 1);
    assert.ok(wslPaths[0].includes('/mnt/c/Users/alice/'));
  });
});

describe('parseSnapCompact', () => {
  it('returns false when no args', () => {
    assert.equal(parseSnapCompact([]), false);
  });

  it('returns false when args have no --compact flag', () => {
    assert.equal(parseSnapCompact(['something']), false);
  });

  it('returns true when --compact is present', () => {
    assert.equal(parseSnapCompact(['--compact']), true);
  });

  it('returns true when --compact is among other args', () => {
    assert.equal(parseSnapCompact(['--compact', 'other']), true);
  });
});
