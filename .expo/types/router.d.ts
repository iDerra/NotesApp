/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/screenList`; params?: Router.UnknownInputParams; } | { pathname: `/screens/screenMain`; params?: Router.UnknownInputParams; } | { pathname: `/styles/general_styles`; params?: Router.UnknownInputParams; } | { pathname: `/styles/list_styles`; params?: Router.UnknownInputParams; } | { pathname: `/styles/main_styles`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/screenList`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/screenMain`; params?: Router.UnknownOutputParams; } | { pathname: `/styles/general_styles`; params?: Router.UnknownOutputParams; } | { pathname: `/styles/list_styles`; params?: Router.UnknownOutputParams; } | { pathname: `/styles/main_styles`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens/screenList${`?${string}` | `#${string}` | ''}` | `/screens/screenMain${`?${string}` | `#${string}` | ''}` | `/styles/general_styles${`?${string}` | `#${string}` | ''}` | `/styles/list_styles${`?${string}` | `#${string}` | ''}` | `/styles/main_styles${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/screenList`; params?: Router.UnknownInputParams; } | { pathname: `/screens/screenMain`; params?: Router.UnknownInputParams; } | { pathname: `/styles/general_styles`; params?: Router.UnknownInputParams; } | { pathname: `/styles/list_styles`; params?: Router.UnknownInputParams; } | { pathname: `/styles/main_styles`; params?: Router.UnknownInputParams; };
    }
  }
}
