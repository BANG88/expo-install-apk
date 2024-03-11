import { Platform } from "react-native";

import ExpoInstallApkModule from "./ExpoInstallApkModule";

export function install(filePath: string, fileProviderAuthority: string): void {
  try {
    if (Platform.OS !== "android") {
      return;
    }
    if (!filePath) throw new Error("filePath is required");
    if (!fileProviderAuthority)
      throw new Error("fileProviderAuthority is required");
    ExpoInstallApkModule.install(filePath, fileProviderAuthority);
  } catch (error) {}
}
