import { LitElement, html, css } from "lit";

export class LoginFormElement extends LitElement {
  static properties = {
    api: { type: String },
    redirect: { type: String }
  };

  constructor() {
    super();
    this.error = "";
    this.redirect = "/";
  }

  createRenderRoot() {
    return this;
  }

  static styles = css`
    .error:not(:empty) {
      color: red;
      padding: 0.5rem;
      border: 1px solid red;
      margin-top: 1rem;
    }
    button[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <slot></slot>

        <slot name="button">
          <button type="submit">Submit</button>
        </slot>

        <p class="error">${this.error}</p>
      </form>
    `;
  }

  getFormValues() {
    const inputs = this.querySelectorAll("input");
    const data = {};
    inputs.forEach((input) => {
      if (input.name) data[input.name] = input.value;
    });
    return data;
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = this.getFormValues();

    if (!formData.username || !formData.password) {
      this.error = "Please enter both username and password.";
      return;
    }

    fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) return res.json();
        throw new Error("Request failed");
      })
      .then(({ token }) => {
        this.dispatchEvent(
          new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token, redirect: this.redirect }]
          })
        );
      })
      .catch((err) => {
        this.error = err.toString();
      });
  }
}

customElements.define("login-form", LoginFormElement);
