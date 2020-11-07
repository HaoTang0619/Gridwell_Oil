const editIcon = (classes = "") => {
  const svg_head = `<svg class="${classes}" focusable="false" viewBox="0 0 24 24" aria-hidden="true">`;
  const path = `<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>`;
  const svg_end = `</svg>`;
  return `${svg_head}${path}${svg_end}`;
};

const settingIcon = (classes = "") => {
  const svg_head = `<svg class="${classes}" focusable="false" viewBox="0 0 24 24" aria-hidden="true">`;
  const path = `<path transform="scale(1.2, 1.2)" d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"></path>`;
  const svg_end = `</svg>`;
  return `${svg_head}${path}${svg_end}`;
};

const loadingIcon = (classes = "") => {
  const div_head = `<div class="loading_group ${classes}" role="progressbar">`;
  const svg_head = `<svg viewBox="22 22 44 44">`;
  const circle = `<circle class="loading_circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>`;
  const svg_end = `</svg>`;
  const div_end = `</div>`;
  return `${div_head}${svg_head}${circle}${svg_end}${div_end}`;
};
