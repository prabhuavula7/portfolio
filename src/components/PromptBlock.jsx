import React, { useState } from 'react';

const PromptBlock = ({ label = 'View Prompt', prompt = '' }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="prompt-block">
      <button
        type="button"
        className="prompt-block-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="prompt-block-label">{label}</span>
        <svg
          className={`prompt-block-chevron${open ? ' is-open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="prompt-block-body">
          <button
            type="button"
            className="prompt-block-copy"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <pre className="prompt-block-pre">
            <code>{prompt.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default PromptBlock;
