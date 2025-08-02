/**
 * 외부 스크립트를 안전하게 로드하고 관리하는 유틸리티
 * 메모리 누수 방지 및 중복 로드 방지 기능 포함
 */

interface ScriptLoadOptions {
  id: string;
  src: string;
  async?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  /**
   * 스크립트가 이미 로드되었는지 확인하는 커스텀 함수
   * 반환값이 true이면 스크립트 로드를 건너뛰고 즉시 resolve
   */
  isAlreadyLoaded?: () => boolean;
}

/**
 * 외부 스크립트를 동적으로 로드합니다.
 * 중복 로드를 방지하고 메모리 누수를 방지합니다.
 */
export const loadExternalScript = ({
  id,
  src,
  async = true,
  onLoad,
  onError,
  isAlreadyLoaded,
}: ScriptLoadOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 커스텀 로드 확인 함수가 있으면 우선 사용
    if (isAlreadyLoaded && isAlreadyLoaded()) {
      resolve();
      return;
    }

    // 이미 로드된 스크립트인지 확인
    const existingScript = document.getElementById(id);
    if (existingScript) {
      // 기존 스크립트가 있으면 로드 완료까지 대기
      if (existingScript.getAttribute('data-loaded') === 'true') {
        resolve();
      } else {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () =>
          reject(new Error(`Failed to load script: ${src}`))
        );
      }
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = async;

    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      onLoad?.();
      resolve();
    };

    script.onerror = () => {
      const error = new Error(`Failed to load script: ${src}`);
      // 실패한 스크립트 제거
      removeExternalScript(id);
      onError?.(error);
      reject(error);
    };

    document.head.appendChild(script);
  });
};

/**
 * 스크립트를 DOM에서 제거합니다.
 */
export const removeExternalScript = (id: string): void => {
  const script = document.getElementById(id);
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
};

/**
 * 스크립트가 로드되어 있는지 확인합니다.
 */
export const isScriptLoaded = (id: string): boolean => {
  const script = document.getElementById(id);
  return script?.getAttribute('data-loaded') === 'true';
};
