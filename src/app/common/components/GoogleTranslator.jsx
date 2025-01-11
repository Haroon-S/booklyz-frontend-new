/* eslint-disable no-new */
import React, { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedLanguage } from '@/store/slices/languageSlice';

const googleTranslateElementInit = () => {
  const element = document.getElementById('google-translator-element');
  if (element) element.innerHTML = '';
  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'bg,en',
      autoDisplay: false,
    },
    'google-translator-element'
  );
};

function GoogleTranslator() {
  const translatorRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      const element = document.getElementById('google-translator-element');
      if (element) element.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (translatorRef.current) {
      const timeoutId = setTimeout(() => {
        const selectField = translatorRef.current.querySelector('.goog-te-combo');
        // Change "Select Language" to "Select"
        if (selectField) {
          const defaultOption = selectField.querySelector('option[value=""]');
          if (defaultOption) {
            defaultOption.textContent = 'Language';
          }

          // Add an event listener to reset the language options
          selectField.addEventListener('change', () => {
            const firstOption = selectField.querySelector('option[value=""]');
            const arabicOption = selectField.querySelector('option[value="bg"]');
            const englishOption = selectField.querySelector('option[value="en"]');

            if (firstOption) firstOption.textContent = 'Language';
            if (arabicOption) arabicOption.textContent = 'Bulgarian';
            if (englishOption) {
              window.location.reload();
            }
          });
        }

        dispatch(setSelectedLanguage(selectField?.value));
        selectField?.addEventListener('change', e => {
          dispatch(setSelectedLanguage(e?.target?.value));
        });
      }, [2500]);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return () => {
      const element = document.getElementById('google-translator-element');
      if (element) element.innerHTML = '';
    };
  }, [translatorRef.current]);

  return (
    <div className="flex items-center">
      <div ref={translatorRef} id="google-translator-element" />
    </div>
  );
}

export default memo(GoogleTranslator);
