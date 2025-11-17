// src/hike-list.ts
import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

type Hike = {
  title: string;
  when: string;
  imgSrc: string;
  imgAlt?: string;
  href: string;
  difficulty: string;
  distance: string;
  elevation: string;
};

export class HikeListElement extends LitElement {
  @property() src?: string;          
  @state() private hikes: Hike[] = [];

  static styles = css`
    :host { display: block; }
    .list { display: grid; gap: 2rem; }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  private async hydrate(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const json = (await res.json()) as Hike[] | Hike;

      // Support either a single object or an array in the JSON
      this.hikes = Array.isArray(json) ? json : [json];
    } catch (err) {
      console.error("Failed to load hikes:", err);
      this.hikes = [];
    }
  }

  private renderHike(h: Hike) {
    return html`
      <featured-hike
        img-src=${h.imgSrc}
        img-alt=${h.imgAlt ?? ""}
        href=${h.href}
        difficulty=${h.difficulty}
        distance=${h.distance}
        elevation=${h.elevation}
      >
        ${h.title}
        <span slot="when">${h.when}</span>
      </featured-hike>
    `;
  }

  render() {
    if (!this.hikes.length) {
      return html`<slot></slot>`;
    }
  
    return html`
      <div class="list">
        ${this.hikes.map((h) => this.renderHike(h))}
      </div>
    `;
  }
  
}
