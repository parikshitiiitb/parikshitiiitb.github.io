(() => {
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderInlineMarkdown(value) {
    const escaped = escapeHtml(value);
    return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  const BRAND_SVGS = {
    github: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
    linkedin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    medium: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
    substack: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>`,
    hashnode: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 00-7.962 0l-6.37 6.37a5.63 5.63 0 000 7.962l6.37 6.37a5.63 5.63 0 007.962 0l6.37-6.37a5.63 5.63 0 000-7.962zM12 15.953a3.953 3.953 0 110-7.906 3.953 3.953 0 010 7.906z"/></svg>`,
    email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  };

  const BRAND_COLORS = {
    github: "#1F2328",
    linkedin: "#0A66C2",
    medium: "#000000",
    substack: "#FF6719",
    hashnode: "#2962FF",
  };

  function companyLogo(name) {
    const n = (name || "").toLowerCase();
    if (n.includes("oracle")) {
      return `<div class="org-logo"><svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="44" height="44" rx="10" fill="#C74634"/><ellipse cx="22" cy="22" rx="13" ry="8.5" stroke="white" stroke-width="2.5" fill="none"/></svg></div>`;
    }
    const initials = name.trim().slice(0, 2).toUpperCase();
    const bgMap = { VE: "#1E2D4A" };
    const bg = bgMap[initials] || "#4B5263";
    return `<div class="org-logo org-logo-initials" style="background:${bg}">${initials}</div>`;
  }

  function contactIcon(label) {
    const key = (label || "").toLowerCase();
    const colorMap = { email: "cli-email", linkedin: "cli-linkedin", github: "cli-github" };
    const cls = colorMap[key] || "";
    const svgKey = key === "email" ? "email" : key;
    const svg = BRAND_SVGS[svgKey]
      ? BRAND_SVGS[svgKey].replace('width="13" height="13"', 'width="18" height="18"')
      : `<span style="font-size:1rem">${escapeHtml(label.slice(0, 1))}</span>`;
    return `<div class="contact-link-icon ${cls}">${svg}</div>`;
  }

  function parseKV(text) {
    const lines = text.split("\n");
    const root = {};
    const blocks = [];
    let current = [];
    let inBlocks = false;
    let mlKey = null;
    let mlLines = [];

    const parseBlock = (blockLines) => {
      const obj = {};
      let bMlKey = null;
      let bMlLines = [];
      for (const raw of blockLines) {
        const line = raw.trimEnd();
        if (bMlKey !== null) {
          if (line.trimEnd().endsWith('"')) {
            bMlLines.push(line.trimEnd().slice(0, -1));
            obj[bMlKey] = bMlLines.join("\n").replace(/^"/, "");
            bMlKey = null; bMlLines = [];
          } else {
            bMlLines.push(line);
          }
          continue;
        }
        const trimmed = line.trim();
        if (!trimmed || !trimmed.includes(":")) continue;
        const idx = trimmed.indexOf(":");
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (val.startsWith('"') && !(val.length > 1 && val.endsWith('"'))) {
          bMlKey = key; bMlLines = [val.slice(1)];
        } else if (val.startsWith('"') && val.endsWith('"') && val.length > 1) {
          obj[key] = val.slice(1, -1);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };

    for (const raw of lines) {
      const line = raw.trimEnd();

      if (mlKey !== null) {
        if (line.trimEnd().endsWith('"')) {
          mlLines.push(line.trimEnd().slice(0, -1));
          root[mlKey] = mlLines.join("\n");
          mlKey = null; mlLines = [];
        } else {
          mlLines.push(line);
        }
        continue;
      }

      if (line.trim() === "---") {
        inBlocks = true;
        if (current.length) {
          blocks.push(parseBlock(current));
          current = [];
        }
        continue;
      }

      if (inBlocks) {
        current.push(line);
      } else if (line.includes(":")) {
        const idx = line.indexOf(":");
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        if (val.startsWith('"') && !(val.length > 1 && val.endsWith('"'))) {
          mlKey = key; mlLines = [val.slice(1)];
        } else if (val.startsWith('"') && val.endsWith('"') && val.length > 1) {
          root[key] = val.slice(1, -1);
        } else {
          root[key] = val;
        }
      }
    }

    if (current.length) {
      blocks.push(parseBlock(current));
    }

    return { root, blocks: blocks.filter((b) => Object.keys(b).length > 0) };
  }

  async function readContent(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return parseKV(await res.text());
  }

  function renderBioParagraphs(raw) {
    if (!raw) return "";
    return raw
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${renderInlineMarkdown(p)}</p>`)
      .join("");
  }

  function renderAbout(data) {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const d = data.root;
    hero.innerHTML = `
      <div class="hero-left">
        <div class="hero-tag">${escapeHtml(d.tag)}</div>
        <h1 class="hero-name">${escapeHtml(d.firstName)}<br><em>${escapeHtml(d.lastName)}</em></h1>
        <div class="hero-title">${escapeHtml(d.title)}</div>
        <div class="hero-bio">${renderBioParagraphs(d.bio)}</div>
        <div class="hero-actions">
          <a href="${escapeHtml(d.primaryHref)}" class="btn-primary">
            ${escapeHtml(d.primaryText)}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="${escapeHtml(d.secondary1Href)}" target="_blank" class="btn-ghost">${escapeHtml(d.secondary1Text)}</a>
          <a href="${escapeHtml(d.secondary2Href)}" target="_blank" class="btn-ghost">${escapeHtml(d.secondary2Text)}</a>
        </div>
      </div>
      <div class="hero-right">
  <div class="avatar-wrap">
    <div class="avatar-ring"></div>

    <div class="avatar-hex" id="avatar-hex">
      <div class="avatar-initials">${escapeHtml(d.initialsMain)}<span>${escapeHtml(d.initialsAccent)}</span></div>
    </div>

    <div class="avatar-badge">
      <div class="badge-dot"></div>
      ${escapeHtml(d.badgeText)}
    </div>

    <div class="hero-metrics">
      <div class="metric">
        <div class="metric-num">8+</div>
        <div class="metric-label">Years</div>
      </div>
      <div class="metric">
        <div class="metric-num">25+</div>
        <div class="metric-label">Projects</div>
      </div>
      <div class="metric">
        <div class="metric-num">Millions</div>
        <div class="metric-label">Users</div>
      </div>
      <div class="metric">
        <div class="metric-num">Enterprise</div>
        <div class="metric-label">Scale</div>
      </div>
    </div>

  </div>
</div>
    `;
  }

  async function applyAvatarPhoto() {
    const formats = ["jpg", "jpeg", "png", "webp"];
    for (const ext of formats) {
      const src = `./content/avatar.${ext}`;
      try {
        const res = await fetch(src, { method: "HEAD", cache: "no-store" });
        if (res.ok) {
          const hex = document.getElementById("avatar-hex");
          if (hex) {
            hex.innerHTML = `<img src="${src}" alt="Profile photo" />`;
            hex.classList.add("has-photo");
          }
          return;
        }
      } catch (_) { /* file absent, try next */ }
    }
  }

  function renderCards(targetSelector, sectionData, className, itemRenderer) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    target.innerHTML = sectionData.blocks.map((item) => itemRenderer(item, className)).join("");
  }

  function applyTitle(containerSelector, root) {
    const wrap = document.querySelector(containerSelector);
    if (!wrap) return;
    const label = wrap.querySelector(".section-label");
    const title = wrap.querySelector(".section-title");
    const sub = wrap.querySelector(".section-sub");
    if (label && root.sectionLabel) label.textContent = root.sectionLabel;
    if (title && root.sectionTitle) title.textContent = root.sectionTitle;
    if (sub && root.sectionSub) sub.textContent = root.sectionSub;
  }

  async function renderAll() {
    const [about, impact, experience, stack, projects, writing, oss, certs, contact, links, footer] =
      await Promise.all([
        readContent("./content/about.md"),
        readContent("./content/impact.md"),
        readContent("./content/experience.md"),
        readContent("./content/stack.md"),
        readContent("./content/projects.md"),
        readContent("./content/writing.md"),
        readContent("./content/oss.md"),
        readContent("./content/certs.md"),
        readContent("./content/contact.md"),
        readContent("./content/links.md"),
        readContent("./content/footer.md"),
      ]);

    renderAbout(about);
    applyAvatarPhoto();

    applyTitle("#impact .inner", impact.root);
    renderCards("#impact .impact-grid", impact, "impact-card", (item) => `
      <div class="impact-card">
        <div class="impact-num"><em>${escapeHtml(item.metric)}</em></div>
        <div class="impact-label">${escapeHtml(item.label)}</div>
        <div class="impact-desc">${escapeHtml(item.desc)}</div>
      </div>
    `);

    applyTitle("#experience", experience.root);
    renderCards("#experience .exp-list", experience, "exp-card", (item) => {
      const bullets = (item.bullets || "").split("||").map((x) => x.trim()).filter(Boolean);
      return `
        <div class="exp-card reveal">
          <div class="exp-left">
            ${companyLogo(item.company)}
            <div class="exp-period">${escapeHtml(item.period)}</div>
            <div class="exp-company">${escapeHtml(item.company)}</div>
            <div class="exp-loc">${escapeHtml(item.location)}</div>
          </div>
          <div class="exp-right">
            <div class="exp-role">${escapeHtml(item.role)}</div>
            <ul class="exp-bullets">${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
          </div>
        </div>
      `;
    });

    applyTitle("#stack .inner", stack.root);
    renderCards("#stack .stack-grid", stack, "stack-cat", (item) => {
      const pills = (item.items || "").split(",").map((x) => x.trim()).filter(Boolean);
      return `<div class="stack-cat"><div class="stack-cat-title">${escapeHtml(item.name)}</div><div class="stack-pills">${pills.map((p) => `<span class="pill">${escapeHtml(p)}</span>`).join("")}</div></div>`;
    });

    applyTitle("#repos", projects.root);
    renderCards("#repos .repos-grid", projects, "repo-card", (item) => {
      const tags = (item.tags || "").split(",").map((x) => x.trim()).filter(Boolean);
      return `
        <div class="repo-card reveal">
          <div class="repo-icon">${escapeHtml(item.icon)}</div>
          <div class="repo-name">${escapeHtml(item.name)}</div>
          <div class="repo-desc">${escapeHtml(item.desc)}</div>
          <div class="repo-tags">${tags.map((t) => `<span class="repo-tag">${escapeHtml(t)}</span>`).join("")}</div>
          <div class="repo-footer">
            <a href="${escapeHtml(item.url)}" target="_blank" class="repo-link">View on GitHub <span>→</span></a>
          </div>
        </div>
      `;
    });

    applyTitle("#writing .inner", writing.root);
    renderCards("#writing .writing-platforms", writing, "platform-card", (item) => `
      <div class="platform-card">
        <div class="platform-header">
          <div class="platform-icon" style="${escapeHtml(item.iconStyle)}">${escapeHtml(item.icon)}</div>
          <div>
            <div class="platform-name">${escapeHtml(item.name)}</div>
            <div class="platform-handle">${escapeHtml(item.handle)}</div>
          </div>
        </div>
        <div class="platform-desc">${escapeHtml(item.desc)}</div>
        <a href="${escapeHtml(item.url)}" target="_blank" class="platform-cta">${escapeHtml(item.cta)} <span>→</span></a>
      </div>
    `);

    applyTitle("#oss", oss.root);
    renderCards("#oss .oss-grid", oss, "oss-card", (item) => `
      <div class="oss-card reveal">
        <div class="oss-project">${escapeHtml(item.project)}</div>
        <div class="oss-desc">${escapeHtml(item.desc)}</div>
        <div class="oss-type">${escapeHtml(item.type)}</div>
      </div>
    `);

    applyTitle("#certs .inner", certs.root);
    renderCards("#certs .certs-list", certs, "cert-row", (item) => `
      <div class="cert-row">
        <div class="cert-icon">${escapeHtml(item.icon)}</div>
        <div class="cert-info">
          <div class="cert-name">${escapeHtml(item.name)}</div>
          <div class="cert-issuer">${escapeHtml(item.issuer)}</div>
        </div>
        <div class="cert-badge ${item.special === "true" ? "special" : ""}">${escapeHtml(item.badge)}</div>
      </div>
    `);

    applyTitle("#contact .contact-card", contact.root);
    renderCards("#contact .contact-links", contact, "contact-link", (item) => `
      <a href="${escapeHtml(item.href)}" ${item.href?.startsWith("http") ? 'target="_blank"' : ""} class="contact-link">
        ${contactIcon(item.label)}
        <div class="contact-link-text">
          <div class="contact-link-label">${escapeHtml(item.label)}</div>
          <div class="contact-link-value">${escapeHtml(item.value)}</div>
        </div>
        <span class="contact-link-arrow">→</span>
      </a>
    `);

    const email = links.root.email || "";
    const navCta = document.querySelector(".nav-cta");
    if (navCta) {
      navCta.textContent = links.root.navCtaText || "Hire me";
      navCta.href = `mailto:${email}`;
    }

    const footerEl = document.querySelector("footer");
    if (footerEl) {
      footerEl.innerHTML = `
        <div class="footer-copy">${escapeHtml(footer.root.copy || "")}</div>
        <div class="footer-socials">
          ${footer.blocks.map((item) => {
            const key = item.label.toLowerCase();
            const color = BRAND_COLORS[key] || "";
            const icon = BRAND_SVGS[key] || "";
            return `<a href="${escapeHtml(item.href)}" target="_blank" class="brand-${key}"${color ? ` style="color:${color}"` : ""}>${icon}${escapeHtml(item.label)}</a>`;
          }).join("")}
        </div>
      `;
    }
  }

  window.loadPortfolioContent = async function loadPortfolioContent() {
    try {
      await renderAll();
      return true;
    } catch (error) {
      console.warn("Content files unavailable, using inline fallback.", error);
      return false;
    }
  };
})();
