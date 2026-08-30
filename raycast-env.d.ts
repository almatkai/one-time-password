/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** undefined - Display the generated password in the Raycast window for preview */
  "passwordVisibility": boolean,
  /** Primary Action - The primary action to perform on an item. */
  "primaryAction": "copy" | "paste"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `one-time-password` command */
  export type OneTimePassword = ExtensionPreferences & {}
  /** Preferences accessible in the `paste-recent-otp` command */
  export type PasteRecentOtp = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `one-time-password` command */
  export type OneTimePassword = {}
  /** Arguments passed to the `paste-recent-otp` command */
  export type PasteRecentOtp = {}
}

