/**
 * ROVE — ParallaxImage Visual Component
 * Reusable editorial image wrapper with fallback resilience,
 * subtle hover scale, and integrated atmospheric shaders.
 */

export class ParallaxImage {
  /**
   * Generates markup for an editorial image with error handling
   * @param {Object} config
   * @param {string} config.src Image URL
   * @param {string} config.alt Alt text
   * @param {string} [config.className=''] Extra CSS classes
   * @param {string} [config.height='100%'] Container height
   * @param {string} [config.badgeText=''] Optional corner badge
   * @param {'eager'|'lazy'} [config.loading='lazy'] Loading strategy
   * @returns {string} HTML markup string
   */
  static render({
    src,
    alt,
    className = '',
    height = '100%',
    badgeText = '',
    loading = 'lazy'
  }) {
    const badgeHtml = badgeText ? `<span class="garment-tag-pill">${badgeText}</span>` : '';

    // Safe inline fallback if network/external CDN is unavailable
    const fallbackSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'%3E%3Crect width='600' height='800' fill='%23121216'/%3E%3Ctext x='50%25' y='48%25' dominant-baseline='middle' text-anchor='middle' fill='%23D4AF7A' font-family='sans-serif' font-size='24' letter-spacing='0.2em'%3EROVE%3C/text%3E%3Ctext x='50%25' y='53%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='12' letter-spacing='0.15em'%3EEDITORIAL ASSET%3C/text%3E%3C/svg%3E`;

    return `
      <div class="parallax-image-frame ${className}" style="height: ${height}; position: relative; overflow: hidden; background: #111115;">
        <img 
          src="${src}" 
          alt="${alt}" 
          class="parallax-image-media"
          loading="${loading}"
          onerror="this.onerror=null; this.src='${fallbackSvg}';"
          style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-cinematic);"
        />
        ${badgeHtml}
      </div>
    `;
  }
}
