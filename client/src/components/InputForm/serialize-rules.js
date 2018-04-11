import React from 'react';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code',
}
 
// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
}
 
const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        console.log(type);
        if (type === 'code') {
          return {
            object: 'block',
            type: 'block-code',
            nodes: next(el.childNodes),
          }
        }

        return {
          object: 'block',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p>{children}</p>
          case 'quote':
            return <blockquote>{children}</blockquote>
          case 'heading-one':
            return <h1>{children}</h1>;
          case 'heading-two':
            return <h2>{children}</h2>;
          case 'block-quote':
            return <blockquote>{children}</blockquote>;
          case 'list-item':
            return <li>{children}</li>
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'bulleted-list':
            return <ul>{children}</ul>
          case 'code-line':
            return <pre>{children}</pre>;
          case 'block-code':
            return <code>{children}</code>
          case 'code_block':
            return <code >{children}</code>
          case 'code_line':
            return <span>{children}</span> 
          default:
            return <p>{children}</p>
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'code':
            return <pre>{children}</pre>
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
        }
      }
    },
  },
]

export default rules;