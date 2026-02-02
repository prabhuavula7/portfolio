import React, { useMemo, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import r from 'highlight.js/lib/languages/r';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('r', r);

const CodeTabs = ({ tabs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex] || tabs[0];

  const highlighted = useMemo(() => {
    if (!activeTab?.code) return '';
    const language = activeTab.language || 'plaintext';
    try {
      if (language === 'plaintext') {
        return hljs.highlightAuto(activeTab.code).value;
      }
      return hljs.highlight(activeTab.code, { language }).value;
    } catch (error) {
      return hljs.highlightAuto(activeTab.code).value;
    }
  }, [activeTab]);

  if (!activeTab) return null;

  return (
    <div className="code-tabs">
      <div className="code-tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={`${tab.label}-${index}`}
            type="button"
            className={`code-tab-button ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="code-tabs-body">
        <code
          className={`hljs language-${activeTab.language || 'plaintext'}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};

export default CodeTabs;
