import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Logger } from './logger.service';
import enUS from '../../translations/en-US.json';
import viVN from '../../translations/vi-VN.json';
import { ApiError, ApiDescriptionError } from '@app/shared/models/api-response/api-response';

const log = new Logger('I18nService');
const languageKey = 'language';

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @param s The string to extract for translation.
 * @return The same string.
 */
export function extract(s: string) {
  return s;
}

@Injectable()
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('en-US', enUS);
    translateService.setTranslation('vi-VN', viVN);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageKey, event.lang);
    });
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    this.langChangeSubscription.unsubscribe();
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    language = language || localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang();
    let isSupportedLanguage = this.supportedLanguages.includes(language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language = this.supportedLanguages.find(supportedLanguage => supportedLanguage.startsWith(language)) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    log.debug(`Language set to ${language}`);
    this.translateService.use(language);
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  getTransError = (error: ApiError) => {
    let key = 'Commons.HttpError.' + (error && error.error ? error.error : '');
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return error && error.errorMessage
        ? error.errorMessage
        : this.translateService.instant('Commons.HttpError.Default');
    } else {
      return translated;
    }
  };

  getTransErrorDescription = (error: ApiDescriptionError) => {
    let key = 'Commons.HttpError.' + (error && error.error ? error.error : '');
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return error && error.error_description
        ? error.error_description
        : this.translateService.instant('Commons.HttpError.Default');
    } else {
      return translated;
    }
  };

  getTransByKey = (key: string) => {
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return this.translateService.instant('Commons.Texts.Unknown');
    } else {
      return translated;
    }
  };

  getTransEnum = (enumName: string) => {
    let key = 'Commons.Enums.' + enumName;
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return this.translateService.instant('Commons.Texts.Unknown');
    } else {
      return translated;
    }
  };

  getCurrentLanguageCode = (): string => {
    return this.language.split('-')[0].toLocaleLowerCase();
  };
}
