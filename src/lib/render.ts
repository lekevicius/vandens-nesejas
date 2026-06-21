const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function renderInlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(markdownLinkPattern, '<a href="$2">$1</a>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>')
}

export function renderParagraphs(value: string): string {
  return value
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${renderInlineMarkdown(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('')
}

export function getMarkdownTitle(value: string): string {
  return value.match(/^#\s+(.+)$/m)?.[1] ?? ''
}

export function renderPoemMarkdown(value: string): string {
  const html: string[] = []
  let stanzaLines: string[] = []

  const flushStanza = () => {
    if (stanzaLines.length === 0) {
      return
    }

    html.push(`<p class="poem-stanza">${stanzaLines.map((line) => escapeHtml(line.trimEnd())).join('\n')}</p>`)
    stanzaLines = []
  }

  for (const line of value.split(/\r?\n/)) {
    if (line.trim() === '') {
      flushStanza()
      continue
    }

    if (line.startsWith('# ')) {
      flushStanza()
      html.push(`<h1>${renderInlineMarkdown(line.slice(2).trim())}</h1>`)
      continue
    }

    if (line.startsWith('#### ')) {
      flushStanza()
      html.push(`<h4>${renderInlineMarkdown(line.slice(5).trim())}</h4>`)
      continue
    }

    if (/^_[^_]+_$/.test(line.trim())) {
      flushStanza()
      html.push(`<p class="poem-translator">${renderInlineMarkdown(line.trim())}</p>`)
      continue
    }

    stanzaLines.push(line)
  }

  flushStanza()

  return html.join('')
}
