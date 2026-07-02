import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette, colors, spacing, radii, typography, motion, zIndex, sizing } from './index';

/**
 * Visual reference for the token layer. Every swatch reads its value through the generated
 * `--iso-*` CSS custom property, so this page doubles as a live check that tokens.css resolves.
 */
const meta: Meta = {
  title: 'Tokens/Overview',
};

export default meta;

const label: React.CSSProperties = {
  fontFamily: 'var(--iso-font-family-mono)',
  fontSize: 'var(--iso-font-size-xs)',
  color: 'var(--iso-color-text-secondary)',
};

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))',
  gap: 'var(--iso-spacing-3)',
  marginBottom: 'var(--iso-spacing-8)',
};

function Swatch({ name }: { name: string }) {
  return (
    <div>
      <div
        style={{
          background: `var(--iso-color-${name})`,
          height: 'var(--iso-spacing-10)',
          borderRadius: 'var(--iso-radius-md)',
          border: 'var(--iso-border-width-1) solid var(--iso-color-border)',
        }}
      />
      <div style={label}>--iso-color-{name}</div>
    </div>
  );
}

export const Colors: StoryObj = {
  render: () => {
    const paletteNames = Object.entries(palette).flatMap(([name, entry]) =>
      typeof entry === 'string' ? [name] : Object.keys(entry).map((shade) => `${name}-${shade}`),
    );
    return (
      <div>
        <h2>Semantic</h2>
        <div style={grid}>
          {Object.keys(colors).map((name) => (
            <Swatch key={name} name={name} />
          ))}
        </div>
        <h2>Palette</h2>
        <div style={grid}>
          {paletteNames.map((name) => (
            <Swatch key={name} name={name} />
          ))}
        </div>
      </div>
    );
  },
};

export const Spacing: StoryObj = {
  render: () => (
    <div>
      {Object.keys(spacing).map((key) => (
        <div
          key={key}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--iso-spacing-4)' }}
        >
          <span style={{ ...label, width: 'var(--iso-spacing-24)' }}>--iso-spacing-{key}</span>
          <div
            style={{
              width: `var(--iso-spacing-${key})`,
              height: 'var(--iso-spacing-4)',
              background: 'var(--iso-color-accent-solid-bg)',
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Radii: StoryObj = {
  render: () => (
    <div style={grid}>
      {Object.keys(radii).map((key) => (
        <div key={key}>
          <div
            style={{
              height: 'var(--iso-size-avatar-xl)',
              width: 'var(--iso-size-avatar-xl)',
              borderRadius: `var(--iso-radius-${key})`,
              background: 'var(--iso-color-neutral-subtle-bg)',
              border: 'var(--iso-border-width-1) solid var(--iso-color-border-strong)',
            }}
          />
          <div style={label}>--iso-radius-{key}</div>
        </div>
      ))}
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div>
      {Object.keys(typography.fontSize).map((key) => (
        <p key={key} style={{ fontSize: `var(--iso-font-size-${key})`, margin: 0 }}>
          <span style={label}>--iso-font-size-{key}</span> — The quick brown fox jumps over the lazy
          dog
        </p>
      ))}
    </div>
  ),
};

export const MotionAndLayers: StoryObj = {
  name: 'Motion & Z-index',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-2)' }}>
      {Object.entries(motion.duration).map(([key, value]) => (
        <div key={key} style={label}>
          --iso-duration-{key}: {value}
        </div>
      ))}
      {Object.entries(motion.easing).map(([key, value]) => (
        <div key={key} style={label}>
          --iso-easing-{key}: {value}
        </div>
      ))}
      {Object.entries(zIndex).map(([key, value]) => (
        <div key={key} style={label}>
          --iso-z-{key}: {value}
        </div>
      ))}
      {Object.entries(sizing).map(([key, value]) => (
        <div key={key} style={label}>
          --iso-size-{key}: {value}
        </div>
      ))}
    </div>
  ),
};
