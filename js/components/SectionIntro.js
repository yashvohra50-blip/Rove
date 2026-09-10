/**
 * ROVE — SectionIntro Visual Component
 * Reusable editorial header format: Eyebrow + Headline + Subtext
 */

export class SectionIntro {
  /**
   * Generates markup for an editorial section header
   * @param {Object} config
   * @param {string} config.eyebrow Uppercase tracking label
   * @param {string} config.headline Main section title
   * @param {string} [config.subtext=''] Editorial subtext description
   * @param {'center'|'left'} [config.align='center'] Text alignment
   * @param {string} [config.className=''] Extra CSS class
   * @returns {string} HTML markup string
   */
  static render({
    eyebrow,
    headline,
    subtext = '',
    align = 'center',
    className = ''
  }) {
    const isCenter = align === 'center';
    const alignStyle = isCenter ? 'text-align: center; margin: 0 auto;' : 'text-align: left;';
    const subtextMax = isCenter ? 'max-width: 54ch; margin-left: auto; margin-right: auto;' : 'max-width: 54ch;';

    return `
      <div class="section-intro-block reveal-on-scroll ${className}" style="${alignStyle} margin-bottom: clamp(3rem, 5vw, 4.5rem); display: flex; flex-direction: column; gap: 0.85rem;">
        <span class="caps-label-accent">${eyebrow}</span>
        <h2 class="section-headline">${headline}</h2>
        ${subtext ? `<p style="${subtextMax}">${subtext}</p>` : ''}
      </div>
    `;
  }
}
