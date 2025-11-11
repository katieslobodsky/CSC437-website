// src/featured-hike.ts
import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class FeaturedHikeElement extends LitElement {
  // attributes → properties
  @property({ attribute: "img-src" })
  imgSrc?: string;

  @property({ attribute: "img-alt" })
  imgAlt?: string;

  @property()
  href?: string;

  @property()
  difficulty?: string;

  @property()
  distance?: string;

  @property()
  elevation?: string;

  override render() {
    return html`
      <article class="featured-hike">
        <img
          class="hike-img"
          src=${this.imgSrc ?? ""}
          alt=${this.imgAlt ?? ""}
        />

        <div class="hike-info">
          <!-- default slot = title text -->
          <h2 class="hike-title">
            <slot></slot>
          </h2>

          <!-- named slot = when -->
          <p class="hike-when">
            <slot name="when"></slot>
          </p>

          <ul class="hike-stats">
            <li>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 19h18L13 6l-3 5-2-2-5 10z" fill="currentColor" />
              </svg>
              <span>${this.difficulty}</span>
            </li>

            <li>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 7c3 0 3 10 6 10s3-10 6-10 3 10 6 10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>${this.distance}</span>
            </li>

            <li>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 17l6-6 4 4 6-8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>${this.elevation}</span>
            </li>
          </ul>

          <a class="btn" href=${this.href ?? "#"}>See Hikes</a>
        </div>
      </article>
    `;
  }

  static styles = css`
    /* copied from your existing CSS, scoped inside the component */
    .featured-hike {
      display: grid;
      grid-template-columns: minmax(520px, 48vw) 1fr;
      align-items: start;
      column-gap: 2rem;
      row-gap: 1rem;
      padding: 0;
    }

    .hike-img {
      width: 100%;
      aspect-ratio: 18 / 10;
      object-fit: cover;
    }

    .hike-info {
      padding-top: 0;
    }

    .hike-title {
      margin: 0 0 0.5rem 0;
      font-family: var(--font-2);
      font-size: 3rem;
      line-height: 0.95;
      letter-spacing: 0.01em;
      color: var(--ink);
      text-transform: uppercase;
    }

    .hike-when {
      margin: 0.25rem 0 1rem;
      display: inline-block;
      padding: 0.4rem 0.7rem;
      border: 3px solid rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      font-family: var(--font-3);
      font-weight: 600;
      color: var(--ink);
    }

    .hike-stats {
      list-style: none;
      padding: 0;
      margin: 0.75rem 0 1.25rem;
      display: grid;
      row-gap: 0.5rem;
      color: var(--ink);
    }

    .hike-stats li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      color: var(--ink);
    }


    .btn {
      display: inline-block;
      background-color: var(--ink);
      color: var(--accent);
      padding: 0.75rem 1.75rem;
      border-radius: 9999px;
      text-decoration: none;
      font-family: var(--font-2);
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
  
    .btn:hover {
      filter: brightness(1.3);
      transform: translateY(-2px);
      text-decoration: none;

    }
  `;
}
