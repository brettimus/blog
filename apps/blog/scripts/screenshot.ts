#!/usr/bin/env bun
/**
 * Screenshot utility for visual inspection of Astro pages
 *
 * Usage:
 *   bun scripts/screenshot.ts [routes...]
 *   bun scripts/screenshot.ts /              # Homepage
 *   bun scripts/screenshot.ts / /blog        # Multiple routes
 *   bun scripts/screenshot.ts --all          # All main routes
 *
 * Options:
 *   --port=PORT     Dev server port (auto-detected if not specified)
 *   --all           Capture all main routes
 *   --mobile        Also capture mobile viewport
 *   --output=DIR    Output directory (default: /tmp/screenshots)
 */

import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { createConnection } from 'net';

const DEFAULT_OUTPUT = '/tmp/screenshots';
const PORT_RANGE = [8007, 8008, 8009, 4321, 4322, 4323, 3000, 3001, 5173, 5174];

// Main routes to capture with --all
const ALL_ROUTES = ['/', '/blog', '/about'];

async function findAstroPort() {
  // First pass: look for this specific blog (blog.boots.lol or Brett Beutell)
  for (const port of PORT_RANGE) {
    const isOpen = await checkPort(port);
    if (isOpen) {
      try {
        const response = await fetch(`http://localhost:${port}/`);
        const text = await response.text();
        if (text.includes('blog.boots.lol') || text.includes('Brett Beutell')) {
          return port;
        }
      } catch {
        // Not a web server, continue
      }
    }
  }

  // Second pass: fall back to any HTML server (less reliable)
  for (const port of PORT_RANGE) {
    const isOpen = await checkPort(port);
    if (isOpen) {
      try {
        const response = await fetch(`http://localhost:${port}/`);
        const text = await response.text();
        if (text.includes('<!DOCTYPE html>') || text.includes('<html')) {
          console.log(`Warning: Found HTML server on port ${port} but could not confirm it's the blog`);
          return port;
        }
      } catch {
        // Not a web server, continue
      }
    }
  }
  return null;
}

function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host: 'localhost' });
    socket.setTimeout(500);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
  });
}

interface Options {
  routes: string[];
  port: number | null;
  mobile: boolean;
  output: string;
}

async function parseArgs(): Promise<Options> {
  const args = process.argv.slice(2);
  const options: Options = {
    routes: [],
    port: null,
    mobile: false,
    output: DEFAULT_OUTPUT,
  };

  for (const arg of args) {
    if (arg === '--all') {
      options.routes.push(...ALL_ROUTES);
    } else if (arg === '--mobile') {
      options.mobile = true;
    } else if (arg.startsWith('--port=')) {
      options.port = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1];
    } else if (arg.startsWith('/') || arg === '') {
      options.routes.push(arg || '/');
    }
  }

  // Auto-detect port if not specified
  if (options.port === null) {
    console.log('Auto-detecting dev server port...');
    options.port = await findAstroPort();
    if (options.port === null) {
      throw new Error('Could not find running Astro dev server. Start it with `bun run dev`');
    }
    console.log(`Found dev server on port ${options.port}`);
  }

  // Default to homepage if no routes specified
  if (options.routes.length === 0) {
    options.routes.push('/');
  }

  // Dedupe routes
  options.routes = [...new Set(options.routes)];

  return options;
}

function routeToFilename(route: string): string {
  if (route === '/') return 'home';
  return route.slice(1).replace(/\//g, '-');
}

interface Result {
  route: string;
  viewport: string;
  path?: string;
  error?: string;
  success: boolean;
}

async function captureScreenshots(options: Options): Promise<{ outputDir: string; results: Result[] }> {
  const { routes, port, mobile, output } = options;
  const baseUrl = `http://localhost:${port}`;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputDir = join(output, timestamp);

  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const results: Result[] = [];

  try {
    // Desktop viewport
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const desktopPage = await desktopContext.newPage();

    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      const filename = `${routeToFilename(route)}-desktop.png`;
      const filepath = join(outputDir, filename);

      try {
        await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
        await desktopPage.screenshot({ path: filepath, fullPage: true });
        results.push({ route, viewport: 'desktop', path: filepath, success: true });
      } catch (err) {
        results.push({ route, viewport: 'desktop', error: (err as Error).message, success: false });
      }
    }

    await desktopContext.close();

    // Mobile viewport (if requested)
    if (mobile) {
      const mobileContext = await browser.newContext({
        viewport: { width: 375, height: 667 },
        isMobile: true,
      });
      const mobilePage = await mobileContext.newPage();

      for (const route of routes) {
        const url = `${baseUrl}${route}`;
        const filename = `${routeToFilename(route)}-mobile.png`;
        const filepath = join(outputDir, filename);

        try {
          await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
          await mobilePage.screenshot({ path: filepath, fullPage: true });
          results.push({ route, viewport: 'mobile', path: filepath, success: true });
        } catch (err) {
          results.push({ route, viewport: 'mobile', error: (err as Error).message, success: false });
        }
      }

      await mobileContext.close();
    }
  } finally {
    await browser.close();
  }

  return { outputDir, results };
}

async function main() {
  const options = await parseArgs();

  console.log(`Capturing screenshots...`);
  console.log(`  Routes: ${options.routes.join(', ')}`);
  console.log(`  Port: ${options.port}`);
  console.log(`  Mobile: ${options.mobile}`);
  console.log('');

  try {
    const { outputDir, results } = await captureScreenshots(options);

    console.log(`Screenshots saved to: ${outputDir}\n`);

    for (const result of results) {
      if (result.success) {
        console.log(`✓ ${result.route} (${result.viewport}): ${result.path}`);
      } else {
        console.log(`✗ ${result.route} (${result.viewport}): ${result.error}`);
      }
    }

    // Output summary for easy parsing
    console.log('\n--- SCREENSHOT PATHS ---');
    for (const result of results) {
      if (result.success) {
        console.log(result.path);
      }
    }
  } catch (err) {
    console.error('Error:', (err as Error).message);
    process.exit(1);
  }
}

main();
