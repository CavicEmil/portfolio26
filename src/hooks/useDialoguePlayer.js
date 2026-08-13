import { useState, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';

function typeInto(el, text, charsPerSecond = 45) {
  return new Promise((resolve) => {
    const proxy = { chars: 0 };
    gsap.to(proxy, {
      chars: text.length,
      duration: Math.max(text.length / charsPerSecond, 0.1),
      ease: 'none',
      onUpdate: () => {
        el.textContent = text.slice(0, Math.round(proxy.chars));
      },
      onComplete: resolve,
    });
  });
}

export function useDialoguePlayer(dialogue) {
  const [nodeId, setNodeId] = useState('intro');
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const spanRefs = useRef({});
  const playToken = useRef(0);
  const historyCounter = useRef(0);

  const play = useCallback(async (targetNodeId) => {
    const token = ++playToken.current; 
    setNodeId(targetNodeId);
    setIsTyping(true);
    
    const node = dialogue[targetNodeId];
    const historyId = historyCounter.current++;

    setHistory((prev) => [...prev, { historyId, segments: node.segments, revealCount: 0 }]);

    for (let i = 0; i < node.segments.length; i++) {
      if (playToken.current !== token) return; 

      flushSync(() => {
        setHistory((prev) =>
        prev.map((entry) => (entry.historyId === historyId ? { ...entry, revealCount: i + 1} : entry ))
      );
      });

      const seg = node.segments[i];
      if (seg.type === 'component') continue;

      const span = spanRefs.current[`${historyId}-${i}`];
      if (!span) continue;
      await typeInto(span, seg.value);
      if (playToken.current !== token) return;
    }

    setIsTyping(false);
  }, [dialogue]);

  return { nodeId, node: dialogue[nodeId], history, spanRefs, play, isTyping};
}